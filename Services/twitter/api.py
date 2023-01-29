from flask import Flask, request, jsonify
import requests
import threading

from script import script
app = Flask(__name__)
string = "asd"

def call(url):
    
    
    data = script(url)
    
    if (data == 0):
  
    
        requests.post("https://fbfb19c3-7109-4063-a0f1-636df130674c.mock.pstmn.io", json={"activateStatus": "1"})
    if (data == 1):


        requests.post("https://fbfb19c3-7109-4063-a0f1-636df130674c.mock.pstmn.io", json={"activateStatus": "0"})

@app.route('/', methods = ["POST"])
def method_name():
    data = request.json
    thread = threading.Thread(target=call, args=(data["url"],))
    thread.start()
    return "ok", 200

app.run()