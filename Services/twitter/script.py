from selenium.webdriver.chrome.options import Options
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
import json
from datetime import datetime
import re
from datetime import date
from NaiveBayes import predict
def convertNumbers(x):
  x = "4,134"
  if "M" in x or "K" in x:
    x = x.split(",")
    x = "".join(x)
    tens = dict(K=10e3, M=10e6, b=10e9)
    factor, exp = x[0:-1], x[-1].lower()
    ans = int(float(factor) * tens[exp])
    print (ans)
    return ans
  else:
    x = x.split(",")
    x = "".join(x)
    return int(x)
def calculateDigits(str):
  digits = 0
  for ch in str:
    if ch.isnumeric():
      digits +=1
  
  return digits

def Find(string):
  
    # findall() has been used 
    # with valid conditions for urls in string
    regex = r"(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’]))"
    url = re.findall(regex,string)      
    if len(url) != 0:
      return 1
    else:
      return 0
     

def script (url):
  
  options = Options()
  options.headless = True
  driver = webdriver.Chrome(options=options)
  driver.get(url)
  time.sleep(5)
  #driver wait
  driver.implicitly_wait(10)
  isPrivate = 0
  externalUrl = 0
  verfied = driver.find_elements(By.XPATH, './/div[@aria-label="Provides details about verified accounts."]')
  if(len(verfied) != 0):
    print ("not a bot")
    return 0
  
  
  element = driver.find_elements(By.XPATH,'.//div[@data-testid="empty_state_header_text"]')
  if(len(element) != 0):
    if ("suspended" in element[0].text):
      return 1
    elif ("protected" in element[0].text):
      print("protected")
      isPrivate = 1
  Usernames = driver.find_element(By.XPATH, './/div[@data-testid="UserName"]').text.split("\n")
  discriptionelement = driver.find_elements(By.XPATH, './/div[@data-testid="UserDescription"]')
  # add from here to here
  discription = 0
  if len(discriptionelement) != 0:
    description = discriptionelement[0].text
    print (description)
    discription = len(description)
    externalUrl = Find(description)
    if externalUrl != 1:
      elements = driver.find_elements(By.XPATH, './/a[@data-testid="UserUrl"]')
      if len(elements) != 0:
        externalUrl = 1
      else:
        externalUrl = 0

  else:
    description = 0
# to here i changes this


  fullNameWords = len(Usernames[0].split(" "))
  numDivName = calculateDigits(Usernames[0])/ len(Usernames[0])
  numDivUserName = calculateDigits(Usernames[1])/ (len(Usernames[1])-1)
  following = driver.find_element(By.XPATH, "//span[contains(text(),'Following')]/ancestor::span/preceding-sibling::span").text
  followers = driver.find_element(By.XPATH, "//span[contains(text(),'Followers')]/ancestor::span/preceding-sibling::span").text
  tweets = driver.find_element(By.XPATH, "//div[contains(text(),'Tweets')]").text.split(" ")
  tweets = convertNumbers(tweets[0])
  followers = convertNumbers(followers)
  following = convertNumbers(following)
  fullNamelen = len(Usernames[0].split(" "))
  NameEUName = 0 if Usernames[0] != Usernames[1][1:] else 1
  data = [
    numDivUserName,
    fullNamelen,
    numDivName,
    NameEUName,
    discription,
    externalUrl,
    isPrivate,
    tweets,
    followers,
    following
    
  ]
  a =  predict(data)
  print("the user is predicted")
  print(a)
  return (a)