import os, json, sys
from baekjoon import *

"""
submissions.json 파일을 최신화합니다.

:param session: 백준에 요청을 보낼 수 있도록 BaekjoonSession 객체를 주어야 합니다.
"""
def updateSubmissions(session: BaekjoonSession):
    with open("submissions.json", mode="r+", encoding="UTF-8") as submissionsJson:
        # 최근 제출들을 가져옵니다.
        submissions = json.load(submissionsJson)

        top = submissions[0]["id"]
        recentSubmissions = session.fetchSubmissionsUntil(top)

        # submissions.json 파일의 상태가 최신이면 아무것도 하지 않음
        if len(recentSubmissions) == 0:
            print("submissions.json 파일 상태가 최신입니다.")
        
        # 써야 할 데이터가 있으면 쓰기
        else:
            submissionsJson.seek(0)
            submissionsJson.write(json.dumps(recentSubmissions + submissions, indent='\t', ensure_ascii=False))
            submissionsJson.truncate()
            print(f"성공적으로 크롤링을 완료하였습니다. {len(recentSubmissions)}건 추가됨")




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
    session = BaekjoonSession(groupId, cookies)

    # 로그인 상태를 확인
    # 로그인이 안되어 있을 시 CookieExpired 에러를 발생시켜 프로그램 중단
    session.ensureLogin()
    
    # submissions.json 최신화
    updateSubmissions(session)

except CookieExpired:
    sys.exit(1) # 로그인 실패로 인한 종료는 정상 종료가 아님
