import os, json, sys
from baekjoon import *

"""
submissions.json 파일을 최신화합니다.

:param session: 백준에 요청을 보낼 수 있도록 BaekjoonSession 객체를 주어야 합니다.
"""
def updateSubmissions(session: BaekjoonSession):
    # 최근 제출들을 가져옵니다.
    recentSubmissions = json.load(open("submissions.json", mode="r", encoding="UTF-8"))
    recentId = recentSubmissions[0]["id"]

    freshSubmissions = session.fetchSubmissionsUntil(recentId)

    if len(freshSubmissions) == 0:
        print("submissions.json 파일 상태가 최신입니다.")
        return

    with open("submissions.json",mode="r+",encoding="UTF-8") as jsonfile:
        jsonfile.seek(0)
        jsonfile.write(json.dumps(freshSubmissions + recentSubmissions,indent='\t',ensure_ascii=False))
        jsonfile.truncate()

    print(f"성공적으로 크롤링을 완료하였습니다. {len(freshSubmissions)}건 추가됨")


try:
    # 환경변수에서 설정 정보들을 가져옵니다.
    # GROUP_ID: 백준 그룹 ID
    # BOJ_AUTO_LOGIN: 로그인 관련 쿠키 값
    # ONLINE_JUDGE: 로그인 관련 쿠키 값
    groupId = os.getenv("GROUP_ID")
    cookies = { 
        "bojautologin": os.getenv("BOJ_AUTO_LOGIN"),
        "OnlineJudge": os.getenv("ONLINE_JUDGE")
    }
    session = BaekjoonSession(cookies)

    # 로그인 상태를 확인
    # 로그인이 안되어 있을 시 CookieExpired 에러를 발생시켜 프로그램 중단
    session.ensureLogin(groupId)
    
    # submissions.json 최신화
    updateSubmissions()

except CookieExpired:
    sys.exit(1) # 로그인 실패로 인한 종료는 정상 종료가 아님

except RequestLimitExceed:
    sys.exit(0) # 이번 실행에서 요청 횟수를 초과하더라도 다음 번에 더 요청하면 됨