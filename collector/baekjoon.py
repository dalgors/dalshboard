from bs4 import BeautifulSoup as bs
import re, time, requests

class CookieExpired(Exception):
    pass


class BaekjoonSession:
    session: requests.Session

    def __init__(self, cookies = {}):
        self.session = requests.Session()
        self.session.cookies.update(cookies)

    def ensureLogin(self, groupId):
        if "가입 신청" in self.session.get(f"https://www.acmicpc.net/group/{groupId}").text:
            print('로그인이 되어있지 않습니다. 쿠키 정보를 확인해주세요.')
            raise CookieExpired

        print('[Collector] Succesfully checked login state')

    def __parseSubmissionFromTableRowElement(self, submissionTag):
        tagStr = str(submissionTag)

        # 제출 번호, 유저 이름, 문제 번호, 문제 이름
        submission = {
            'id': int(re.search("solution-(\d+)", tagStr)[1]),
            'username': re.search("/user/(\w+)", tagStr)[1],
            'problemId': int(re.search("/problem/(\d+)", tagStr)[1]),
            'problemName': re.search('title="(.+?)"', tagStr)[1], # '?' at '.+?' means non-greedy (https://stackoverflow.com/questions/766372/python-non-greedy-regexes)
        }

        # 티어 정보를 사용할 수 있다면 티어 정보도 추가
        # 1=Bronze V, 2=Bronze IV, 3=Bronze III, 4=Bronze II, 5=Bronze I
        # 6=Silver V, 7=Silver IV ...
        tier = re.search('/tier/(\d+)\.svg', tagStr)
        if tier is not None:
            submission['tier'] = int(tier[1])

        # 결과 정보 파싱 및 저장
        resultTag =  submissionTag.contents[3].contents[0].contents[0]
        if 'class' not in resultTag.attrs:
            resultTag = resultTag.contents[0]

        submission.update({
            'resultCode': '-'.join(resultTag.attrs['class'][0].split("-")[1:]).upper(),
            'resultMessage': " ".join(resultTag.contents[0].split(u'\xa0'))
        })

        # 메모리, 시간, 언어, 코드 길이 정보
        memory, time, language, length = map(lambda el: el.text, submissionTag.contents[4:8])

        submission.update({
            'memory': int(memory) if memory else None,
            'time': int(time) if time else None,
            'language': language,
            'length': int(length),
            'when': submissionTag.contents[8].contents[0].attrs['title']
        })

        return submission

    def fetchSubmissions(self, groupId, top = None): 
        url = f"https://www.acmicpc.net/status?group_id={groupId}"  
        if top != None:
            url += f"&top={top}"
        
        html = self.session.get(url)
        soup = bs(html.text, 'html.parser')
        submissionsTags = soup.find("tbody").find_all("tr")

        # 채점 중, 채점 준비중 등 채점이 완료되지 않은 채점 발견 시 다음 번에 크롤링하도록 함
        # (이번 크롤링에서는 제외)
        # 가장 아래의 제출부터 체크하고, 채점이 완료되지 않은 제출 발견 시 바로 break
        submissions = []
        for submission in reversed([*map(self.__parseSubmissionFromTableRowElement, submissionsTags)]):
            if submission['resultCode'] in ['WAIT', 'REJUDGE-WAIT', 'COMPILE', 'JUDGING']:
                break

            submissions.insert(0, submission)

        return submissions

    def fetchSubmissionsUntil(self, groupId, submissionId, pagenationLimit = 5, throttlePerRequestAsMilliseconds = None):
        submissions = []
        top = None
        page = 1
        print(f'[Collector] Fetch until submissionId={submissionId}')

        # Set pagination limit (unlimited if None)
        while pagenationLimit is None or page <= pagenationLimit:
            print(f'[Collector] Try to fetch page={page}, top={top}')
            for submission in self.fetchSubmissions(groupId, top):
                if submission['id'] <= submissionId:
                    return submissions
                
                submissions.append(submission)

            # throttle request if enabled
            if throttlePerRequestAsMilliseconds is not None:
                print(f'[Collector] Throttle {throttlePerRequestAsMilliseconds} ms ...')
                time.sleep(throttlePerRequestAsMilliseconds / 1000)
            
            # do not include 'top' submission
            top = submissions[-1]['id'] - 1
            page += 1
