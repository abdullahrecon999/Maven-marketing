from flask import Flask, request, jsonify
import json
import requests
import os
import sys
import time
import instaloader
import pandas as pd
from bs4 import BeautifulSoup
import re
import humanfriendly

app = Flask(__name__)

@app.route('/test', methods = ["GET"])
def test():
    return "ok"

@app.route('/insta_data', methods = ["POST"])
def allInstaData():

    filename = "social media influencers-INSTAGRAM - -DEC 2022.csv"
    cols_to_read = ["name", "Eng. (Auth.)", "country", "Category_1", "Category_2"]
    df = pd.read_csv(filename, usecols=cols_to_read)
    L = instaloader.Instaloader()
    # L.login("mavenmarketing20", "HAX@hax360")
    users = []

    for index, row in df.iloc[41:51].iterrows():
        print(row["name"])
        title = row["name"]
        eng = humanfriendly.parse_size(row["Eng. (Auth.)"])
        country = row["country"] if not pd.isna(row["country"]) else ""
        category = [row["Category_1"] if not pd.isna(row["Category_2"]) else "" , row["Category_2"] if not pd.isna(row["Category_2"]) else ""]
        profile = instaloader.Profile.from_username(L.context, title)
        profile_pic = profile.profile_pic_url
        bio = profile.biography
        followees = profile.followees
        followers = profile.followers
        handle = profile.username
        platform = "Instagram"
        no_posts = profile.mediacount
        links = profile.external_url
        reels = []
        for post in profile.get_posts():
            if not post.is_video:
                reels.append("https://www.instagram.com/p/"+post.shortcode)
            if len(reels) >= 5:
                break
        users.append({ "title": title, "engagement_avg": eng, "categories": category, "profilePic": profile_pic, "description": bio, "followees_avg": followees, "followers_avg": followers, "social_media_handle": handle, "platform": platform, "no_posts": no_posts, "posts": reels, "country": country, "contact_links": links })

    print(users)
    return json.dumps(users)

@app.route('/insta_user', methods = ["POST"])
def instaUser():
    L = instaloader.Instaloader()
    try:
        title = request.json['username']
        profile = instaloader.Profile.from_username(L.context, title)
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
                reels.append("https://www.instagram.com/p/"+post.shortcode)
            if len(reels) >= 5:
                break
        user = { "title": title, "profilePic": profile_pic, "description": bio, "followees_avg": followees, "followers_avg": followers, "social_media_handle": handle, "platform": platform, "no_posts": no_posts, "reels": reels }
        return user
    except:
        return "Error"


@app.route('/youtube_data', methods = ["POST"])
def allYoutubeData():
    filename = "social media influencers-YOUTUBE - --DEC 2022.csv"
    cols_to_read = ["Youtube channel", "youtuber name","Country" , "Followers", "Category", "Views (Avg.)", "Likes (Avg.)", "Comments (Avg.)"]
    df = pd.read_csv(filename, usecols=cols_to_read)

    users = []
    for index, row in df.head(990).iterrows():

        URL = "https://www.youtube.com/"+row["Youtube channel"]+"/about"
        headers = {
            "Accept-Language": "en-US,en;q=0.5"
        }
        soup = BeautifulSoup(requests.get(URL, headers=headers).content, "html.parser")

        try:
            data = re.search(r"var ytInitialData = ({.*});", str(soup)).group(1)
            json_data = json.loads(data.split(";</script>")[0])

            title = row["youtuber name"]
            views_avg = humanfriendly.parse_size(row["Views (Avg.)"])
            likes_avg = humanfriendly.parse_size(row["Likes (Avg.)"])
            comments_avg = humanfriendly.parse_size(row["Comments (Avg.)"])
            country = row["Country"] if not pd.isna(row["Country"]) else ""
            category = [row["Category"]] if not pd.isna(row["Category"]) else []
            banner = json_data["header"]["c4TabbedHeaderRenderer"]["banner"]["thumbnails"][5]["url"]
            profile_pic = json_data["metadata"]["channelMetadataRenderer"]["avatar"]["thumbnails"][0]["url"]
            bio = json_data["metadata"]["channelMetadataRenderer"]["description"]
            handle = row["Youtube channel"]
            platform = "Youtube"
            subscribers = humanfriendly.parse_size((json_data["header"]["c4TabbedHeaderRenderer"]["subscriberCountText"]["simpleText"]).split(" ")[0])
            
            URL = "https://www.youtube.com/"+row["Youtube channel"]+"/videos"
            soup = BeautifulSoup(requests.get(URL).content, "html.parser")
            dataVid = re.search(r"var ytInitialData = ({.*});", str(soup)).group(1)
            dataVideos = json.loads(dataVid.split(";</script>")[0])

            videos = []
            for post in dataVideos["contents"]["twoColumnBrowseResultsRenderer"]["tabs"][1]["tabRenderer"]["content"]["richGridRenderer"]["contents"]:
                videoId = post["richItemRenderer"]["content"]["videoRenderer"]["videoId"]
                videos.append("https://www.youtube.com/watch?v="+videoId)
                if len(videos) >= 5:
                    break
            #print(videos)
            users.append({ "title": title, "views_avg": views_avg, "likes_avg": likes_avg, "comments_avg": comments_avg, "categories": category, "profilePic": profile_pic, "description": bio, "social_media_handle": handle, "platform": platform, "subscribers": subscribers, "posts": videos, "banner": banner, "country": country })
            print(title)
        except Exception as e:
            #users.append({"error": e})
            pass
    print(users)
    return json.dumps(users)

@app.route('/youtube_user', methods = ["POST"])
def youtubeUser():
    try:
        title = request.json['username']
        URL = "https://www.youtube.com/"+title+"/about"
        soup = BeautifulSoup(requests.get(URL).content, "html.parser")

        data = re.search(r"var ytInitialData = ({.*});", str(soup)).group(1)
        json_data = json.loads(data.split(";</script>")[0])
        # print(json_data)
        # print(json_data["metadata"]["channelMetadataRenderer"]["avatar"]["thumbnails"])
        views_avg = 0
        likes_avg = 0
        comments_avg = 0
        country = ""
        category = ""
        banner = json_data["header"]["c4TabbedHeaderRenderer"]["banner"]["thumbnails"][5]["url"]
        profile_pic = json_data["metadata"]["channelMetadataRenderer"]["avatar"]["thumbnails"][0]["url"]
        bio = json_data["metadata"]["channelMetadataRenderer"]["description"]
        handle = title
        platform = "Youtube"
        subscribers = json_data["header"]["c4TabbedHeaderRenderer"]["subscriberCountText"]["simpleText"]
        
        URL = "https://www.youtube.com/"+title+"/videos"
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
        user = { "title": title, "views_avg": views_avg, "likes_avg": likes_avg, "comments_avg": comments_avg, "categories": category, "profilePic": profile_pic, "description": bio, "social_media_handle": handle, "platform": platform, "subscribers": subscribers, "reels": videos }
        return user
    except:
        return "Error"


@app.route('/tiktok_data', methods = ["POST"])
def allTiktokData():
    filename = "social media influencers-TIKTOK - ---DEC 2022.csv"
    cols_to_read = ["Tiktoker name","views(avg)","comments(avg.)","shares(avg.)"]
    df = pd.read_csv(filename, usecols=cols_to_read)

    users = []
    for index, row in df.head(599).iterrows():

        URL = "https://www.tiktok.com/@"+ row["Tiktoker name"]
        soup = BeautifulSoup(requests.get(URL).content, "html.parser")

        try:
            data = re.search(r'<script id="SIGI_STATE" type="application/json">([\s\S]*?)<\/script>', str(soup)).group(1)
            data = json.loads(data)

            title = data["SEOState"]["metaParams"]["title"]
            url = data["SEOState"]["canonical"]
            profilePic = data["UserModule"]["users"][row["Tiktoker name"]]["avatarLarger"]
            followers = (data["UserModule"]["stats"][row["Tiktoker name"]]["followerCount"])
            followees = (data["UserModule"]["stats"][row["Tiktoker name"]]["followingCount"])
            no_posts = data["UserModule"]["stats"][row["Tiktoker name"]]["videoCount"]
            likes = (data["UserModule"]["stats"][row["Tiktoker name"]]["heartCount"])
            bio = data["UserModule"]["users"][row["Tiktoker name"]]["signature"]
            platform = "Tiktok"
            try:
                link = data["UserModule"]["users"][row["Tiktoker name"]]["bioLink"]["link"]
            except Exception as e:
                link = ""
            
            # 5 posts
            posts = []
            for i in data["ItemList"]["user-post"]["list"]:
                posts.append(i)
                if len(posts) >= 5:
                    break

            users.append({ "title": title, "url": url, "profilePic": profilePic, "followers_avg": followers, "followees_avg": followees, "no_posts": no_posts, "likes": likes, "description": bio, "posts": posts, "link": link, "platform": platform })
            print(users[-1])
        except Exception as e:
            #users.append({"error": e})
            pass
    print(users)
    return json.dumps(users)

app.run('0.0.0.0', port=3333)