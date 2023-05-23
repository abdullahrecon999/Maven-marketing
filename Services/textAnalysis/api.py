from flask import Flask, request, jsonify
import requests
import threading
from textAnalysis import Extractor

app = Flask(__name__)

def call(data):
    keyWords = Extractor(data)
    print(keyWords)
    # requests.post("/url heere", json={"keyWord":keyWords })
    

@app.route('/', methods = ["POST"])
def method_name():
    data = request.json
    thread = threading.Thread(target=call, args=(data["description"],))
    thread.start()
    return "ok", 200

@app.route("/getkeywords",methods = ["POST"])
def getKeyWords():
    data = request.json
    keyWords = Extractor(data['description'])
    return {
        "keyWords": keyWords
    }
app.run('0.0.0.0', port=3939)