from Twitter_profile import get_profile_details
import json

def scrap_profile(username):
    twitter_username = username
    filename = "twitter_api_data2"
    data = get_profile_details(twitter_username=twitter_username, filename=filename)

    # convert the data to JSON
    data = json.loads(data)

    predData = [
        (0 if "default" in data["profile_image_url"] else 1),
        (sum(c.isdigit() for c in data["screen_name"]) / len(data["screen_name"])),
        (len(data["name"].split(" "))),
        (sum(c.isdigit() for c in data["name"]) / len(data["name"])),
        (1 if (data["name"] == data["screen_name"]) else 0),
        (len(data["description"])),
        (0 if (data["url"] == "null") else 1),
        (1 if (data["protected"]) else 0),
        (data["statuses_count"]),
        (data["followers_count"]),
        (data["friends_count"])
    ]

    print(predData)
    
    return predData
    # print(predict([1,0,4,0,0,120,1,0,4163,61900000,536]))
    # print(predict([0, 0.1, 1, 0, 0, 0, 1, 0, 100, 80, 330]))
