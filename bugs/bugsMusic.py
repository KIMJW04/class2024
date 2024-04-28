import requests as req
from bs4 import BeautifulSoup as bs
import pandas as pd
import datetime  # datetime 모듈 추가

head = {'user-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15"}

res = req.get("https://music.bugs.co.kr/chart", headers=head)

soup = bs(res.text, "lxml")

# 데이터 선택
ranking = soup.select(".ranking > strong")
title = soup.select(".title > a")
artist = soup.select(".artist > a:nth-child(1)")

# 데이터 저장
rankingList = [r.text.strip() for r in ranking]
titleList = [t.text.strip() for t in title]
artistList = [a.text.strip() for a in artist]

# 데이터 프레임 생성
chart_df = pd.DataFrame({
    'Ranking': rankingList,
    'Title': titleList,
    'Artist': artistList
})

# 현재 날짜를 YYYYMMDD 형식으로 가져오기
current_date = datetime.date.today().strftime("%Y%m%d")

# JSON 파일로 저장 (파일 이름에 날짜 추가)
file_name = f"bugsChart100_{current_date}.json"
chart_df.to_json(file_name, force_ascii=False, orient="records")
