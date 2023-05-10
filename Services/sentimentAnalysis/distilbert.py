from transformers import AutoTokenizer, AutoModelForSequenceClassification

tokenizer = AutoTokenizer.from_pretrained("okho0653/distilbert-base-uncased-finetuned-sst-2-english-zero-shot-sentiment-model")

model = AutoModelForSequenceClassification.from_pretrained("okho0653/distilbert-base-uncased-finetuned-sst-2-english-zero-shot-sentiment-model")

input_text = "I Love you"

candidate_labels = ["positive", "negative"]

def sentiment_analysis(input_text):
    encoding = tokenizer(input_text, return_tensors='pt')
    logits = model(**encoding)[0]
    scores = logits.softmax(dim=1)
    return scores

positive_score = sentiment_analysis(input_text)[0][1]
negative_score = sentiment_analysis(input_text)[0][0]
print("Positive score: ", positive_score)
print("Negative score: ", negative_score)