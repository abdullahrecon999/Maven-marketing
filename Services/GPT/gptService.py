import theb
from flask import Flask
import json
from flask import request, jsonify

app = Flask(__name__)

def generate_response(prompt):
    response=""
    for token in theb.Completion.create(prompt):
        # print(token, end='', flush=True)
        response += token
    print(response)
    return response

@app.route('/generate', methods=['POST'])
def generate():
    prompt = request.json['prompt']
    response = generate_response(prompt)
    return jsonify({'response': response})


if __name__ == '__main__':
    app.run(debug=True, port=6000)

# for token in theb.Completion.create('I want you to act as a sales man. I will provide you with a list of products and services that need to be purchased, and you will act as the sales person. My first request is "I need help finding a new sales person for used watches.'):
#     print(token, end='', flush=True)
# print("---------------------Done---------------------")