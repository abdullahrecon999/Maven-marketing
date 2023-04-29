from TikTokApi import TikTokApi
api = TikTokApi(proxy="176.113.73.104:3128")
video_id = "7219771440688581931" # replace with your video ID
video_url = api.get_video_url(video_id)
video = api.get_video_by_url(video_url)
comments = api.get_comment(video["itemInfo"]["itemStruct"]["id"], count=10) # get 10 comments
for comment in comments:
    print(comment["text"]) # print the comment text