from bs4 import BeautifulSoup as bs
import re

class CookieExpired(Exception):
    pass


def ensureLogin(groupId,session):
    if "가입 신청" in session.get(f"https://www.acmicpc.net/group/{groupId}").text:
        print('로그인이 되어있지 않습니다. 쿠키 정보를 확인해주세요.')
        raise CookieExpired


def tagToDict(submissionTag):
    tagStr = str(submissionTag)
    submissionDict = {}
    submissionDict["id"] = int(re.findall("solution-[0-9]+",tagStr)[0].split("-")[1])
    submissionDict["username"] = re.findall("user/\w+",tagStr)[0].split("/")[1]
    submissionDict["problemId"] = int(re.findall("problem/[0-9]+",tagStr)[0].split("/")[1])
    submissionDict["problemName"] = re.findall('title=".+"',tagStr)[0].split("=")[1].split('"')[1]
    resultTag =  submissionTag.contents[3].contents[0].contents[0]
    if 'class' not in resultTag.attrs:
        resultTag = resultTag.contents[0]
    submissionDict["resultCode"] = resultTag.attrs['class'][0].split("-")[1].upper()  
    submissionDict["resultMessage"] = " ".join(resultTag.contents[0].split(u'\xa0'))
    
    if submissionDict["resultCode"] != "AC":
        submissionDict["memory"] = None
        submissionDict["time"] = None 
        submissionDict["language"] = submissionTag.contents[6].text
    else:
        submissionDict["memory"] = int(submissionTag.contents[4].text)
        submissionDict["time"] = int(submissionTag.contents[5].text)
        submissionDict["language"] = submissionTag.contents[6].text
    submissionDict["length"] = submissionTag.contents[7].text
    submissionDict["when"] = submissionTag.contents[8].contents[0].attrs['title'][:-3]

    return submissionDict

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
    submissions = fetchSubmissions(groupId,session) 
    partOfSubmissions = submissions 
    while True:
        for i,submission in enumerate(partOfSubmissions):
            if submission['id'] == submissionId:
                return submissions + partOfSubmissions[:i]    
        partOfSubmissions = fetchSubmissions(groupId,session,submissions[-1]['id'])
        submissions += partOfSubmissions
