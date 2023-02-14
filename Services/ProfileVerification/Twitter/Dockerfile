FROM python:3.10-slim

RUN pip install --upgrade pip
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY api.py api.py
COPY scrapeProfile.py scrapeProfile.py
COPY textAnalysis.py textAnalysis.py
COPY scraping_utilities.py scraping_utilities.py
COPY Twitter_profile.py Twitter_profile.py
COPY Mlmodel.pkl Mlmodel.pkl

CMD ["python3", "api.py"]