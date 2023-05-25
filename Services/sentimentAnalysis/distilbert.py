from flask import Flask, jsonify, request
from transformers import AutoTokenizer, AutoModelForSequenceClassification

app = Flask(__name__)

tokenizer = AutoTokenizer.from_pretrained("okho0653/distilbert-base-uncased-finetuned-sst-2-english-zero-shot-sentiment-model")
model = AutoModelForSequenceClassification.from_pretrained("okho0653/distilbert-base-uncased-finetuned-sst-2-english-zero-shot-sentiment-model")
candidate_labels = ["positive", "negative"]

@app.route('/sentiment-analysis', methods=['POST'])
def sentiment_analysis():
    data = request.get_json()
    input_text = data['input_text']

    encoding = tokenizer(input_text, return_tensors='pt')
    logits = model(**encoding)[0]
    scores = logits.softmax(dim=1)

    positive_score = scores[0][1].item()
    negative_score = scores[0][0].item()

    response = {
        'input_text': input_text,
        'positive_score': positive_score,
        'negative_score': negative_score
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run()
