from flask import Flask, request, jsonify
import requests
import threading
from textAnalysis import Extractor

from script import script
app = Flask(__name__)
string = "asd"

def call(url):    
    
    data = script(url)
    
    if (data == 0):
        print(data)
        return data
        #requests.post("https://fbfb19c3-7109-4063-a0f1-636df130674c.mock.pstmn.io", json={"activateStatus": "1"})

    if (data == 1):
        print(data)
        return data
        #requests.post("https://fbfb19c3-7109-4063-a0f1-636df130674c.mock.pstmn.io", json={"activateStatus": "0"})

@app.route('/', methods = ["POST"])
def method_name():
    data = request.json
    #thread = threading.Thread(target=call, args=(data["url"],))
    #thread.start()
    returnData = script(data["url"])
    if(returnData == 0):
        print("Real")
        return "Real"
    if(returnData == 1):
        print("Bot")
        return "Bot"
    if(returnData == -1):
        print("Error")
        return "Error"

@app.route('/keywords', methods = ["POST"])
def method_name2():
    data = request.json
    keyWords = Extractor(data["description"])
    print("Keywords: ",keyWords)
    return "ok"

app.run()