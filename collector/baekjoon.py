from bs4 import BeautifulSoup as bs
import re

class CookieExpired(Exception):
    pass


def ensureLogin(groupId,session):
    if "가입 신청" in session.get(f"https://www.acmicpc.net/group/{groupId}").text:
        print('로그인이 되어있지 않습니다. 쿠키 정보를 확인해주세요.')
        raise CookieExpired

    print('[Collector] Succesfully checked login state')


def tagToDict(submissionTag):
    tagStr = str(submissionTag)

    # 제출 번호, 유저 이름, 문제 번호, 문제 이름
    submission = {
        'id': int(re.findall("solution-[0-9]+", tagStr)[0].split("-")[1]),
        'username': re.findall("user/\w+", tagStr)[0].split("/")[1],
        'problemId': int(re.findall("problem/[0-9]+", tagStr)[0].split("/")[1]),
        'problemName': re.findall('title=".+"', tagStr)[0].split("=")[1].split('"')[1],
    }

    # 결과 정보 파싱 및 저장
    resultTag =  submissionTag.contents[3].contents[0].contents[0]
    if 'class' not in resultTag.attrs:
        resultTag = resultTag.contents[0]

    submission.update({
        'resultCode': resultTag.attrs['class'][0].split("-")[1].upper(),
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

def fetchSubmissions(groupId,session,top = None): 
    url = f"https://www.acmicpc.net/status?group_id={groupId}"  
    if top != None:
        url += f"&top={top}"
    
    html = session.get(url)
    soup = bs(html.text, 'html.parser')
    submissionsTags = soup.find("tbody").find_all("tr")
    submissions = [tagToDict(i) for i in submissionsTags]
    return submissions

def fetchSubmissionsUntil(groupId,session,submissionId):
    submissions = []
    top = None
    page = 1
    print(f'[Collector] Fetch until submissionId={submissionId}')

    # Set pagination limit = 5
    while page <= 5:
        print(f'[Collector] Try to fetch page={page}, top={top}')
        for submission in fetchSubmissions(groupId,session,top):
            if submission['id'] <= submissionId:
                return submissions
            
            submissions.append(submission)
        
        top = submissions[-1]['id']
        page += 1
