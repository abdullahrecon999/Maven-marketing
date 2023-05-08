from flask import Flask, request
import praw

app = Flask(__name__)

@app.route('/create_subreddit', methods=['POST'])
def create_subreddit():
    # Get the access token from the request headers
    print(request.headers)
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return {'error': 'Authorization header missing.'}, 401
    try:
        auth_type, access_token = auth_header.split(' ')
        if auth_type.lower() != 'bearer':
            raise ValueError()
    except (ValueError, AttributeError):
        return {'error': 'Invalid Authorization header.'}, 401
    client_id = "lzYeI_b9Cnpd24JL5P1aNQ"
    # # Authenticate with the Reddit API using the access token
    reddit = praw.Reddit(access_token=access_token,
                         client_id=client_id,
                         client_secret="aGoS6q0RYvRJtgyV3uUdW4IOYUWuQg",
                         user_agent='my_bot/0.0.1')

    # Get subreddit parameters from the request
    name = "test subreddit"
    title = "Test reddit"

    # Create the subreddit
    subreddit = reddit.subreddit(name).submit(title=title,
                                              selftext='',
                                              send_replies=False,
                                              )

    # Return a success response
    return {'message': 'Subreddit created successfully!'}

if __name__ == '__main__':
    app.run(debug=True, port=7000)