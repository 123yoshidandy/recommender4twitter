import os
import json

from flask import Flask, render_template
import tweepy


app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/timeline")
def get_timeline():
    response = []

    api = tweepy.Client(
        bearer_token=os.environ['BEARER_TOKEN'],
        consumer_key=os.environ['CONSUMER_KEY'],
        consumer_secret=os.environ['CONSUMER_SECRET'],
        access_token=os.environ['ACCESS_TOKEN'],
        access_token_secret=os.environ['ACCESS_TOKEN_SECRET'],
        wait_on_rate_limit=True
    )

    timeline = api.get_home_timeline(
        expansions=['author_id'],
        user_fields=['id', 'name', 'username', 'profile_image_url'],
        tweet_fields=['created_at', 'public_metrics']
    )
    users = timeline.includes['users']

    for tweet in timeline.data:
        pm = tweet.public_metrics
        value = pm['retweet_count'] + pm['reply_count'] + pm['like_count'] + pm['quote_count']
        if value > 0:
            for user in users:
                if user.id == tweet.author_id:
                    response.append({
                        'user': {
                            'id': user.id,
                            'username': user.username,
                            'name': user.name,
                            'profile_image_url': user.profile_image_url,
                        },
                        'tweet': {
                            'id': tweet.id,
                            'text': tweet.text,
                            'created_at': tweet.created_at.strftime('%m/%d %H:%M'),
                        }
                    })
                    break

    return json.dumps(response, indent=2)


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
    app.run(port=8000)
    # print(get_timeline())
