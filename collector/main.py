import requests,os,json,sys
from baekjoon import *

try:
    groupId = os.getenv("GROUP_ID")
    cookie = { 
        "bojautologin": os.getenv("BOJ_AUTO_LOGIN"),
        "OnlineJudge": os.getenv("ONLINE_JUDGE")
    }

    recentSubmissions = json.load(open("submissions.json",mode="r",encoding="UTF-8"))
    recentId = recentSubmissions[0]["id"]
    session = requests.Session()
    session.cookies.update(cookie)

    ensureLogin(groupId,session)
    with open("submissions.json",mode="r+",encoding="UTF-8") as jsonfile:
        jsonfile.seek(0)
        jsonfile.write(json.dumps(fetchSubmissionsUntil(groupId,session,recentId)+recentSubmissions,indent=4,ensure_ascii=False))
        jsonfile.truncate()

    print("성공적으로 크롤링을 완료하였습니다.")
except CookieExpired as e:
    print("프로그램이 예기치 못한 오류로 인해 종료되었습니다")
    sys.exit(1)
