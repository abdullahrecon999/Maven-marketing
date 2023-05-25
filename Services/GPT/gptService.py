import you
from flask import Flask
import json
from flask import request, jsonify
import aiassist
import deepai

app = Flask(__name__)

def generate_response(prompt):
    response=""
    # for token in you.Completion.create(prompt="Generate 200 words ad descrption for hiking gear. Following are the keywords: kids, fun, all-in-one. add relevant hashtags at the end", detailed=True, include_links=True):
    #     # print(token, end='', flush=True)
    #     response += token
    #     print(response)
    # response = you.Completion.create(prompt=prompt, detailed=True, include_links=True)
    # req = aiassist.Completion.create(prompt=prompt)
    for chunk in deepai.Completion.create(prompt=prompt):
        response += chunk
    # print(req["text"])
    # return req["text"]
    return response

@app.route('/generate', methods=['POST'])
def generate():
    prompt = request.json['prompt']
    response = generate_response(prompt)
    return jsonify({'response': response})


if __name__ == '__main__':
    app.run(debug=True, port=9000)

# for token in theb.Completion.create('I want you to act as a sales man. I will provide you with a list of products and services that need to be purchased, and you will act as the sales person. My first request is "I need help finding a new sales person for used watches.'):
#     print(token, end='', flush=True)
# print("---------------------Done---------------------")