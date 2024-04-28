import requests as req
from bs4 import BeautifulSoup as bs
import pandas as pd
head = {'User-Agent' :'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'}
res = req.get("https://www.melon.com/chart/index.htm", headers=head)
# print(res.text)
# print(res.status_code)    //406
soup = bs(res.text, "lxml")
# print(soup)
#데이터 선택
ranking=soup.select("tbody .rank")
title=soup.select(".rank01 > span > a")
artist=soup.select(".rank02 > span > a:nth-child(1)")
rankingList = [r.text.strip() for r in ranking]
titleList = [t.text.strip() for t in title]
artistList = [a.text.strip() for a in artist]
# print(ranking)
# print(title)
print(artistList)