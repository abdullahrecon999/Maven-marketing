from flask import Flask, request, jsonify
import requests
import threading
import twitterDetection

app = Flask(__name__)
string = "asd"

def call(url):
    
    
    data = twitterDetection.script(url)
    # url is of the mock server in postman
    
    requests.post("https://fbfb19c3-7109-4063-a0f1-636df130674c.mock.pstmn.io", json={"activateStatus": "1"})
    

@app.route('/', methods = ["POST"])
def method_name():
    data = request.json
    thread = threading.Thread(target=call, args=(data["url"],))
    thread.start()
    return "hello"

app.run()