import numpy as np
from sklearn.naive_bayes import GaussianNB
from numpy import genfromtxt
import pandas as pd
import os
from sklearn.naive_bayes import GaussianNB
from sklearn.model_selection import train_test_split
from sklearn import metrics
from sklearn.metrics import classification_report
cwd = os.getcwd()
path = '{cwd}train.csv'

CsvData = pd.read_csv(r'C:\Users\Administrator\Downloads\Services\Services\twitter\train.csv')

dataY = CsvData[["fake"]]
dataX = CsvData.drop("fake", axis=1)
dataX = dataX.drop("profile pic", axis=1)
print (dataX.head())
Xtrain,Xtest, Ytrain, Ytest = train_test_split(dataX, dataY, test_size = 0.3, random_state = 4)

nbModel = GaussianNB()
nbModel.fit(Xtrain, Ytrain)

def predict(data):
    try:
        predCustom = nbModel.predict([data])
    except:
        return 0
    #return predCustom[0]
    return 1
