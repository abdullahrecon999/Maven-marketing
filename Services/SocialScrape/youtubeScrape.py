import instaloader
import pandas as pd

filename = "social media influencers-YOUTUBE - --DEC 2022.csv"
cols_to_read = ["Youtube channel", "youtuber name","Country" , "Followers", "Category", "Views (Avg.)", "Likes (Avg.)", "Comments (Avg.)"]
df = pd.read_csv(filename, usecols=cols_to_read)
# data_subset = df.head(10)
# print(data_subset)

# L = instaloader.Instaloader()

# users = []

# for index, row in df.head(1).iterrows():
#     title = row["name"]
#     eng = row["Eng. (Auth.)"]
#     country = row["country"]
#     category = [row["Category_1"], row["Category_2"]]
#     profile = instaloader.Profile.from_username(L.context, name)
#     profile_pic = profile.profile_pic_url
#     bio = profile.biography
#     followees = profile.followees
#     followers = profile.followers
#     handle = profile.username
#     platform = "Instagram"
#     no_posts = profile.mediacount
#     reels = []
#     for post in profile.get_posts():
#         if not post.is_video:
#             reels.append(post.url)
#         if len(reels) >= 5:
#             break
#     users.append({ "title": name, "engagement_avg": eng, "categories": category, "profilePic": profile_pic, "descriptionn": bio, "followees_avg": followees, "followers_avg": followers, "social_media_handle": handle, "platform": platform, "no_posts": no_posts, "reels": reels })

# print(users)



import re
import json
import requests
from bs4 import BeautifulSoup

users = []
for index, row in df.head(1).iterrows():

    URL = "https://www.youtube.com/"+row["Youtube channel"]+"/about"
    soup = BeautifulSoup(requests.get(URL).content, "html.parser")

    try:
        data = re.search(r"var ytInitialData = ({.*});", str(soup)).group(1)
        json_data = json.loads(data.split(";</script>")[0])
        # print(json_data)
        # print(json_data["metadata"]["channelMetadataRenderer"]["avatar"]["thumbnails"])
        title = row["youtuber name"]
        views_avg = row["Views (Avg.)"]
        likes_avg = row["Likes (Avg.)"]
        comments_avg = row["Comments (Avg.)"]
        country = row["Country"]
        category = row["Category"]
        banner = json_data["header"]["c4TabbedHeaderRenderer"]["banner"]["thumbnails"][5]["url"]
        profile_pic = json_data["metadata"]["channelMetadataRenderer"]["avatar"]["thumbnails"][0]["url"]
        bio = json_data["metadata"]["channelMetadataRenderer"]["description"]
        handle = row["Youtube channel"]
        platform = "Youtube"
        subscribers = json_data["header"]["c4TabbedHeaderRenderer"]["subscriberCountText"]["simpleText"]
        
        URL = "https://www.youtube.com/"+row["Youtube channel"]+"/videos"
        soup = BeautifulSoup(requests.get(URL).content, "html.parser")
        dataVid = re.search(r"var ytInitialData = ({.*});", str(soup)).group(1)
        dataVideos = json.loads(dataVid.split(";</script>")[0])

        # print(dataVideos)

        videos = []
        for post in dataVideos["contents"]["twoColumnBrowseResultsRenderer"]["tabs"][1]["tabRenderer"]["content"]["richGridRenderer"]["contents"]:
            videoId = post["richItemRenderer"]["content"]["videoRenderer"]["videoId"]
            videos.append("https://www.youtube.com/watch?v="+videoId)
            if len(videos) >= 5:
                break
        print(videos)
        users.append({ "title": title, "views_avg": views_avg, "likes_avg": likes_avg, "comments_avg": comments_avg, "categories": category, "profilePic": profile_pic, "descriptionn": bio, "social_media_handle": handle, "platform": platform, "subscribers": subscribers, "videos": videos })

    except Exception as e:
        users.append({"error": e})
        pass

print(users)

# for index, row in df.head(20).iterrows():

#     URL = "https://www.youtube.com/"+row["Youtube channel"]+"/about"
#     soup = BeautifulSoup(requests.get(URL).content, "html.parser")

#     try:

#         # We locate the JSON data using a regular-expression pattern
#         data = re.search(r"var ytInitialData = ({.*});", str(soup)).group(1)

#         # print(data.split(";</script>"))
#         json_data = json.loads(data.split(";</script>")[0])
#         # print(json_data)
#         # print(json_data["metadata"]["channelMetadataRenderer"]["avatar"]["thumbnails"])
#         title = json_data["metadata"]["channelMetadataRenderer"]["title"]
#         profilePic = json_data["metadata"]["channelMetadataRenderer"]["avatar"]["thumbnails"][0]["url"]
#         description = json_data["metadata"]["channelMetadataRenderer"]["description"]
#         banner = json_data["header"]["c4TabbedHeaderRenderer"]["banner"]["thumbnails"][5]["url"]

#         print("=============================================")
#         print(row["Youtube channel"])
#         print(title)
#         print(profilePic)
#         print(description)
#         print(banner)
#         print("=============================================")

#     except Exception as e:
#         pass