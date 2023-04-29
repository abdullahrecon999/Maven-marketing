from TikTokApi import TikTokApi
api = TikTokApi()
video_id = "7219771440688581931" # replace with your video ID
video = api.get_video_by_id(video_id)
comments = api.get_comment(video["itemInfo"]["itemStruct"]["id"], count=10) # get 10 comments
for comment in comments:
    print(comment["text"]) # print the comment text