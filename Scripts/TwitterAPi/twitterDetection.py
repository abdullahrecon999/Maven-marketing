

options = Options()
options.headless = True

# def isJoinedRecently(joinedRecentaly):
#     monthDict= {
#     "January":1,
#     "Feburary":2,
#     "March": 3,
#     "April": 4,
#     "May":5,
#     "June":6,
#     "July":7,
#     "August":8,
#     "September":9,
#     "October":10,
#     "November":11,
#     "December": 12
#     }
#     joinedRecentalyArr = joinedRecentaly[1][1:].split(" ")
#     joinedRecentalyArr[0] = monthDict[joinedRecentalyArr[0]]
#     JDate = "{month}/{year}".format(month = joinedRecentalyArr[0], year = joinedRecentalyArr[1])
#     joinedDate = datetime.strptime(JDate, '%m/%Y')
#     currentDate = datetime.today()
#     delta = currentDate - joinedDate
    
#     return 0 if delta.days > 30 else 1
    
def script (url):
  options = Options()
  options.headless = True
  driver = webdriver.Chrome(options=options)
  
    # driver.get(url)
    # time.sleep(5)
    # element = driver.find_element(By.XPATH, './/div[@data-testid="UserName"]').text
    # following = driver.find_element(By.XPATH, "//span[contains(text(),'Following')]/ancestor::span/preceding-sibling::span").text
    # followers = driver.find_element(By.XPATH, "//span[contains(text(),'Followers')]/ancestor::span/preceding-sibling::span").text
    # elements = driver.find_elements(By.XPATH, ".//div[@dir='auto']")
    # usrName = element.split("\n")
    
    # joinedRecentaly = elements[15].text.split("Joined")
    
    
    
    
    # data = {
    # "name": usrName[0],
    # "userName": usrName[1],
    # "nameLength": len(usrName[0]),
    # "userNameLength": len(usrName[1]),
    # "following": following,
    # "isFollowing": 0 if following == "0" else 1,
    # "follwers": followers,
    # "hasFollowers": 0 if followers == "0" else 1,
    # "joinedRecently": isJoinedRecently(joinedRecentaly)
    
    
    #   }
    # return data
    
    

script("https://twitter.com/nomanajmal5")






