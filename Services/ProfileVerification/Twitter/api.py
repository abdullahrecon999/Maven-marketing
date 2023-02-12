from flask import Flask, request, jsonify
import requests
import threading
from textAnalysis import Extractor

from scrapeProfile import script
app = Flask(__name__)

@app.route('/', methods = ["POST"])
def profileVerify():
    data = request.json
    #thread = threading.Thread(target=call, args=(data["url"],))
    #thread.start()
    inputData = data["username"]
    returnData = script(inputData)
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