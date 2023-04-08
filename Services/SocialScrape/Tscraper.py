import re
import json
import requests
from bs4 import BeautifulSoup
import pandas as pd

filename = "social media influencers-TIKTOK - ---DEC 2022.csv"
cols_to_read = ["Tiktoker name","views(avg)","comments(avg.)","shares(avg.)"]
df = pd.read_csv(filename, usecols=cols_to_read)

users = []
for index, row in df.head(1).iterrows():

    URL = "https://www.tiktok.com/@"+ row["Tiktoker name"]
    soup = BeautifulSoup(requests.get(URL).content, "html.parser")

    # We locate the JSON data using a regular-expression pattern
    data = re.search(r'<script id="SIGI_STATE" type="application/json">([\s\S]*?)<\/script>', str(soup)).group(1)
    data = json.loads(data)

    title = data["SEOState"]["metaParams"]["title"]
    url = data["SEOState"]["canonical"]
    profilePic = data["UserModule"]["users"][row["Tiktoker name"]]["avatarLarger"]
    followers = data["UserModule"]["stats"][row["Tiktoker name"]]["followerCount"]
    followees = data["UserModule"]["stats"][row["Tiktoker name"]]["followingCount"]
    no_posts = data["UserModule"]["stats"][row["Tiktoker name"]]["videoCount"]
    likes = data["UserModule"]["stats"][row["Tiktoker name"]]["heartCount"]
    bio = data["UserModule"]["users"][row["Tiktoker name"]]["signature"]
    link = data["UserModule"]["users"][row["Tiktoker name"]]["bioLink"]["link"]
    
    # 5 posts
    posts = []
    for i in data["ItemList"]["user-post"]["list"]:
        posts.append(i)
        if len(posts) >= 5:
            break

    users.append({ "title": title, "url": url, "profilePic": profilePic, "followers": followers, "followees": followees, "no_posts": no_posts, "likes": likes, "bio": bio, "posts": posts })

print(users)