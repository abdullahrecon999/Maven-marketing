import instaloader
import pandas as pd

filename = "social media influencers-INSTAGRAM - -DEC 2022.csv"
cols_to_read = ["name", "Eng. (Auth.)", "country", "Category_1", "Category_2"]
df = pd.read_csv(filename, usecols=cols_to_read)
# data_subset = df.head(10)
# print(data_subset)

L = instaloader.Instaloader()

users = []

for index, row in df.head(1).iterrows():
    title = row["name"]
    eng = row["Eng. (Auth.)"]
    country = row["country"]
    category = [row["Category_1"], row["Category_2"]]
    profile = instaloader.Profile.from_username(L.context, name)
    profile_pic = profile.profile_pic_url
    bio = profile.biography
    followees = profile.followees
    followers = profile.followers
    handle = profile.username
    platform = "Instagram"
    no_posts = profile.mediacount
    reels = []
    for post in profile.get_posts():
        if not post.is_video:
            reels.append(post.url)
        if len(reels) >= 5:
            break
    users.append({ "title": name, "engagement_avg": eng, "categories": category, "profilePic": profile_pic, "descriptionn": bio, "followees_avg": followees, "followers_avg": followers, "social_media_handle": handle, "platform": platform, "no_posts": no_posts, "reels": reels })

print(users)

# for i in name_column:
#     print(i)
    # profile = instaloader.Profile.from_username(L.context, i)
    # print(profile.profile_pic_url)
    # print(profile.biography)
    # print(profile.external_url)
    # print(profile.followers)
    # print(profile.followees)
    


# test = instaloader.Instaloader()
# L = instaloader.Instaloader()

# profile = instaloader.Profile.from_username(L.context, 'cristiano')
# print(profile.biography)

# # get profile image link
# print(profile.profile_pic_url)


# for i in ['timeless.pk', 'mavenmarketing20', 'ahmed_alnufais1']:
#     test.download_profile(i, profile_pic_only=True)

# import re
# import json
# import requests
# from bs4 import BeautifulSoup

# URL = "https://www.youtube.com/c/Rozziofficial/about"
# soup = BeautifulSoup(requests.get(URL).content, "html.parser")

# # We locate the JSON data using a regular-expression pattern
# data = re.search(r"var ytInitialData = ({.*});", str(soup)).group(1)

# print(data)
# Uncomment to view all the data
# jsonData = json.dumps(data).split(";window['ytUrl']")[0]
# print(json.dumps(data).split(";window['ytUrl']")[0])

# print(jsonData)

# This converts the JSON data to a python dictionary (dict)
# json_data = json.loads(jsonData)

# # This is the info from the webpage on the right-side under "stats", it contains the data you want
# stats = json_data["contents"]["twoColumnBrowseResultsRenderer"]["tabs"][5]["tabRenderer"]["content"]["sectionListRenderer"]["contents"][0]["itemSectionRenderer"]["contents"][0]["channelAboutFullMetadataRenderer"]

# print("Channel Views:", stats["viewCountText"]["simpleText"])
# print("Joined:", stats["joinedDateText"]["runs"][1]["text"])