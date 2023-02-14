import yake
import nltk
import os
from dotenv import load_dotenv

load_dotenv()

nltk.download('averaged_perceptron_tagger')
nltk.download('maxent_ne_chunker')
nltk.download('words')

def Extractor(data):
     
    text = data
    language = "en"
    max_ngram_size = int(os.getenv("MAX_NGRAM_SIZE"))
    deduplication_threshold = float(os.getenv("DEDUPLICATION_THRESHOLD"))
    numOfKeywords = int(os.getenv("NUM_OF_KEYWORDS"))
    custom_kw_extractor = yake.KeywordExtractor(lan=language, n=max_ngram_size, dedupLim=deduplication_threshold, top=numOfKeywords, features=None)
    words = list()
    keywords = custom_kw_extractor.extract_keywords(text)
    for kw in keywords:
        ans = nltk.pos_tag([kw[0]])
        if(ans[0][1] == "NN"):
            words.append(ans[0][0])
            
    return words