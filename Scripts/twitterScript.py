import selenium
from selenium.webdriver.chrome.options import Options
import time
from selenium import webdriver
from selenium.webdriver.common.by import By

options = Options()
options.headless = True

url = "enter the url here"
driver = webdriver.Chrome(options=options)
driver.get('https://twitter.com/BillGates')
time.sleep(5)
element = driver.find_element(By.XPATH, './/div[@data-testid="UserName"]').text
following = driver.find_element(By.XPATH, "//span[contains(text(),'Following')]/ancestor::span/preceding-sibling::span").text
followers = driver.find_element(By.XPATH, "//span[contains(text(),'Followers')]/ancestor::span/preceding-sibling::span")
elements = driver.find_elements(By.XPATH, ".//div[@dir='auto']")


