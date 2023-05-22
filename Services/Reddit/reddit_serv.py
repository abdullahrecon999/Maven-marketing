from flask import Flask, request, render_template, jsonify
import praw
from praw.exceptions import APIException
from praw.models import InlineGif, InlineImage, InlineVideo
import requests
import os

app = Flask(__name__)

CLIENT_ID = 'lzYeI_b9Cnpd24JL5P1aNQ'
CLIENT_SECRET = 'aGoS6q0RYvRJtgyV3uUdW4IOYUWuQg'

@app.route("/", methods=["GET", "POST"])
def upload_video():
    if request.method == "POST":
        # Get the path of the video file and the subreddit name from the form
        video_file = request.files["video_path"]
        subreddit_name = request.form["subreddit_name"]
        
        video_path = 'uploads/' + video_file.filename
        video_file.save(video_path)
        print(video_file)

        # Get the subreddit instance
        access_token = request.form.get('access_token')
        refresh_token = request.form.get('refresh_token')

        reddit = praw.Reddit(
            client_id=CLIENT_ID,
            client_secret=CLIENT_SECRET,
            access_token=access_token,
            refresh_token=refresh_token,
            user_agent='my_bot/0.0.1'
        )
        subreddit = reddit.subreddit(subreddit_name)
        
        # Upload the video to the subreddit
        subreddit.submit_video(title="My video", video_path=video_path)
        
        return "Video uploaded to /r/{}".format(subreddit_name)
    else:
        return render_template("upload.html")

@app.route('/createSubreddit', methods=['POST'])
def create_subreddit():
    try:
        access_token = request.form.get('access_token')
        refresh_token = request.form.get('refresh_token')

        reddit = praw.Reddit(
            client_id=CLIENT_ID,
            client_secret=CLIENT_SECRET,
            access_token=access_token,
            refresh_token=refresh_token,
            user_agent='my_bot/0.0.1'
        )

        subreddit_name = request.form.get('subreddit_name')
        subreddit_title = request.form.get('subreddit_title')
        subreddit_description = request.form.get('subreddit_description')

        subreddit = reddit.subreddit.create(
            name=subreddit_name,
            title=subreddit_title,
            description=subreddit_description,
        )

        # Upload banner and icon images
        # banner_path = request.form.get('banner_image')
        # icon_path = request.form.get('icon_image')

        # if banner_path:
        #     subreddit.stylesheet.upload('banner', banner_path)
        # if icon_path:
        #     subreddit.stylesheet.upload('icon', icon_path)

        return jsonify({
            'success': True,
            'message': f'Successfully created subreddit: {subreddit_title}'
        })
    except praw.exceptions.APIException as e:
        # Handle Reddit API exceptions
        return jsonify({
            'success': False,
            'message': f'Reddit API Error: {str(e)}'
        })
    except Exception as e:
        # Handle other exceptions
        return jsonify({
            'success': False,
            'message': f'Error: {str(e)}'
        })


@app.route('/createPost', methods=['POST'])
def create_post():
    access_token = request.form.get('access_token')
    refresh_token = request.form.get('refresh_token')

    reddit = praw.Reddit(
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        access_token=access_token,
        refresh_token=refresh_token,
        user_agent='my_bot/0.0.1'
    )

    subreddit_names = request.form.get('subreddits')
    post_title = request.form.get('title')
    post_text = request.form.get('text')

    try:
        success_count = 0
        for subreddit_name in subreddit_names.split(','):
            print("Sbbreddit: ", subreddit_name)
            subreddit = reddit.subreddit(subreddit_name)
            submission = subreddit.submit(title=post_title, selftext=post_text)
            if submission:
                success_count += 1

        return jsonify({
            'success': True,
            'message': f'Successfully created post in {success_count} subreddits'
        })

    except APIException as e:
        return jsonify({
            'success': False,
            'message': f'Error creating post: {e}'
        })

@app.route('/createPostv2', methods=['POST'])
def create_post_v2():
    access_token = request.form.get('access_token')
    refresh_token = request.form.get('refresh_token')

    reddit = praw.Reddit(
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        access_token=access_token,
        refresh_token=refresh_token,
        user_agent='my_bot/0.0.1'
    )

    subreddit_names = request.form.get('subreddits')  # Assuming multiple subreddits are selected
    post_title = request.form.get('title')
    post_text = request.form.get('text')
    media = request.form.get('media')
    media_url = request.form.get('mediaUrl')
    media_type = request.form.get('mediaType')

    try:
        success_count = 0
        submission_ids=[]
        for subreddit_name in subreddit_names.split(','):
            subreddit = reddit.subreddit(subreddit_name)
            submission = None
            print("media: ", media)
            print("media_url: ", media_url)
            print("media_type: ", media_type)

            if media_type.__contains__('image') and media != '':
                print("Got an image by Path")
                if post_text != '':
                    print("Image Path: ", media)
                    image = InlineImage(path=media, caption="Test")
                    selftext = f"{post_text} {image}"
                    media = {"image": image}
                    submission = subreddit.submit(post_title, inline_media=media, selftext=selftext)
                else:
                    submission = subreddit.submit_image(title=post_title, image_path=media)
            elif media_type.__contains__('video') and media != '':
                print("Got a video by Path")
                if post_text != '':
                    print("Video Path: ", media)
                    video = InlineVideo(path=media, caption="Test")
                    selftext = post_text + " {video1}"
                    media1 = {"video1": video}
                    submission = subreddit.submit(post_title, inline_media=media1, selftext=selftext)
                else:
                    submission = subreddit.submit_video(title=post_title, video_path=media)
            elif media_type.__contains__('gif'):
                print("Got a gif by URL")
                if post_text != '':
                    file_path = "uploads/file.gif"
                    response = requests.get(media_url)
                    with open(file_path, "wb") as file:
                        file.write(response.content)

                    gif = InlineGif(path=file_path, caption="Test")
                    selftext = post_text + " {gif1}"
                    media1 = {"gif1": gif}
                    submission = subreddit.submit(post_title, inline_media=media1, selftext=selftext)
                    os.remove(file_path)
                else:
                    submission = subreddit.submit(title=post_title, url=media_url)
            elif media_type.__contains__('image') and media == '':
                print("Got an image by URL")
                if post_text != '':
                    file_path = "uploads/" + media_type.split('/')[1]
                    response = requests.get(media_url)
                    with open(file_path, "wb") as file:
                        file.write(response.content)
                    
                    img = InlineImage(path=file_path, caption="Test")
                    selftext = post_text + " {image1}"
                    media1 = {"image1": img}
                    submission = subreddit.submit(post_title, inline_media=media1, selftext=selftext)
                else:
                    submission = subreddit.submit(post_title, url=media_url)
            else:
                submission = subreddit.submit(title=post_title, selftext=post_text)
            
            if submission:
                success_count += 1
                submission_ids.append(submission.id)

        return jsonify({
            'success': True,
            'message': f'Successfully created post in {success_count} subreddits',
            'submission_ids': submission_ids
        })

    except APIException as e:
        return jsonify({
            'success': False,
            'message': f'Error creating post: {e}'
        })

if __name__ == "__main__":
    app.run(port=7000, debug=True)
