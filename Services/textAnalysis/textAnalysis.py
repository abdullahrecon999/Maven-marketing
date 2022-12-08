import yake
import nltk

nltk.download('averaged_perceptron_tagger')
nltk.download('maxent_ne_chunker')
nltk.download('words')

def Extractor(data):
     
     text = data
     language = "en"
     max_ngram_size = 1
     deduplication_threshold = 0.9
     numOfKeywords = 10
     custom_kw_extractor = yake.KeywordExtractor(lan=language, n=max_ngram_size, dedupLim=deduplication_threshold, top=numOfKeywords, features=None)
     words = list()
     keywords = custom_kw_extractor.extract_keywords(text)
     for kw in keywords:
          
          ans = nltk.pos_tag([kw[0]])
          
          if(ans[0][1] == "NN"):
               words.append(ans[0][0])
               
     return words