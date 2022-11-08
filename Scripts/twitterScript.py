
from selenium.webdriver.chrome.options import Options
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
import json
from datetime import datetime

options = Options()
options.headless = True


url = "enter the url here"
driver = webdriver.Chrome(options=options)
driver.get('https://twitter.com/BillGates')
time.sleep(5)
element = driver.find_element(By.XPATH, './/div[@data-testid="UserName"]').text
following = driver.find_element(By.XPATH, "//span[contains(text(),'Following')]/ancestor::span/preceding-sibling::span").text
followers = driver.find_element(By.XPATH, "//span[contains(text(),'Followers')]/ancestor::span/preceding-sibling::span").text
elements = driver.find_elements(By.XPATH, ".//div[@dir='auto']")
usrName = element.split("\n")
joinedRecentaly = elements[15].text.split("Joined")
joinedRecentalyArr = joinedRecentaly[1].split("  ")
print(joinedRecentalyArr)
mnum = datetime.strptime(joinedRecentalyArr[0], '%s').month
print(mnum)

data = {
    "name": usrName[0],
    "userName": usrName[1],
    "nameLength": len(usrName[0]),
    "userNameLength": len(usrName[1]),
    "following": following,
    "isFollowing": 0 if following == "0" else 1,
    "follwers": followers,
    "hasFollowers": 0 if followers == "0" else 1
    
    
}



