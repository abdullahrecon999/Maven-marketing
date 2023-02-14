from flask import Flask, request, jsonify
import requests
import threading
from textAnalysis import Extractor
from scrapeProfile import scrap_profile
import pickle

app = Flask(__name__)
model = pickle.load(open('Mlmodel.pkl','rb'))

@app.route('/test', methods = ["GET"])
def test():
    return "ok"

@app.route('/verifyprofile', methods = ["POST"])
def profileVerify():
    data = request.json
    #thread = threading.Thread(target=call, args=(data["url"],))
    #thread.start()
    inputData = data["username"]
    returnData = scrap_profile(inputData)
    prediction = model.predict([returnData])

    if(prediction == 0):
        print("Real")
        return "Real"
    if(prediction == 1):
        print("Bot")
        return "Bot"
    if(prediction == -1):
        print("Error")
        return "Error"

@app.route('/keywords', methods = ["POST"])
def keywords_extract():
    data = request.json
    print(data["description"])
    keyWords = Extractor(data["description"])
    print("Keywords: ",keyWords)
    return keyWords

app.run('0.0.0.0', port=1234)