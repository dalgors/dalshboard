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

    # 로그인 상태를 확인
    # 로그인이 안되어 있을 시 CookieExpired 에러를 발생시켜 프로그램 중단
    ensureLogin(groupId,session)

    freshSubmissions = fetchSubmissionsUntil(groupId,session,recentId)

    if len(freshSubmissions) == 0:
        print("submissions.json 파일 상태가 최신입니다.")
        print("프로그램을 종료합니다.")
        sys.exit(0)

    with open("submissions.json",mode="r+",encoding="UTF-8") as jsonfile:
        jsonfile.seek(0)
        jsonfile.write(json.dumps(freshSubmissions + recentSubmissions,indent='\t',ensure_ascii=False))
        jsonfile.truncate()

    print(f"성공적으로 크롤링을 완료하였습니다. {len(freshSubmissions)}건 추가됨")
except CookieExpired as e:
    print("프로그램이 예기치 못한 오류로 인해 종료되었습니다")
    sys.exit(1)
