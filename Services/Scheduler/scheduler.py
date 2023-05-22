from datetime import datetime
from pymongo import MongoClient
from bson import ObjectId
from bson.codec_options import TypeRegistry, TypeEncoder, TypeDecoder
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.schedulers.background import BlockingScheduler
from apscheduler.events import EVENT_JOB_REMOVED
from apscheduler.jobstores.mongodb import MongoDBJobStore
from pymongo.errors import OperationFailure
from flask import Flask
from concurrent.futures import ThreadPoolExecutor
import requests
import pytz

app = Flask(__name__)
client = MongoClient('mongodb+srv://root:root@cluster0.trpwg.mongodb.net/?retryWrites=true&w=majority')
db = client['mavenMarketing']

jobstores = {
    'default': MongoDBJobStore(client=client, database='mavenMarketing', collection='jobs')
}

executor = ThreadPoolExecutor(20)
job_defaults = {
    'coalesce': False,
    'max_instances': 3
}
scheduler = BackgroundScheduler(jobstores=jobstores, executor=executor, daemon=True, job_defaults=job_defaults)
#scheduler = BlockingScheduler(jobstores=jobstores, executor=executor)
scheduler.start()

# Remove all jobs
# scheduler.remove_all_jobs()

def my_task(task_id):
    task = db.schedules.find_one({'_id': ObjectId(task_id)})
    if task:
        # do something with the task
        print(f"Task {task_id} executed at {datetime.now()}")
        # remove task from database after execution
        # db.schedules.delete_one({'_id': ObjectId(task_id)})
        url = "http://localhost:3000/automate/reddit/v2/sendScheduledPost"
        data = {
            "userid": str(task['userid']),
            "subreddit": task['subreddit'],
            "postid": task['postid'],
        }
        headers = {
            "Content-type": "application/json; charset=UTF-8"
        }

        response = requests.post(url, json=data, headers=headers)

        print(response.status_code)

# Load existing tasks from database on script start
for task in db.schedules.find():
    task_id = str(task['_id'])
    task_date = task['sendTime']
    task_date = task_date.replace(tzinfo=pytz.utc)  # Set the timezone of task_date to UTC
    task_date = task_date.astimezone(pytz.timezone('Asia/Karachi'))  # Convert to 'Asia/Karachi' timezone
    print("-----------------------------------------")
    print("TASK ", task_id, "DATE ", task_date)
    print("-----------------------------------------")
    scheduler.add_job(
        misfire_grace_time=60,
        func=my_task, 
        args=[task_id], 
        id=task_id, 
        run_date=task_date,
        trigger="date"
    )

def on_change(change):
    if change['operationType'] == 'insert':
        print("-----------------------------------------")
        print("New task added to database")
        print("-----------------------------------------")
        task = change['fullDocument']
        task_id = str(task['_id'])
        task_date = task['sendTime']
        task_date = task_date.replace(tzinfo=pytz.utc)  # Set the timezone of task_date to UTC
        task_date = task_date.astimezone(pytz.timezone('Asia/Karachi'))  # Convert to 'Asia/Karachi' timezone
        scheduler.add_job(
            misfire_grace_time=60,
            func=my_task, 
            args=[task_id], 
            id=task_id, 
            run_date=task_date,
            trigger="date"
        )
    elif change['operationType'] == 'delete':
        print("-----------------------------------------")
        print("Task removed from database")
        print("-----------------------------------------")
        task_id = str(change['documentKey']['_id'])
        scheduler.remove_job(task_id)
    elif change['operationType'] == 'update':
        print("-----------------------------------------")
        print("Task updated in database")
        print("-----------------------------------------")
        task = change['fullDocument']
        task_id = str(task['_id'])
        task_date = task['sendTime']
        task_date = task_date.replace(tzinfo=pytz.utc)  # Set the timezone of task_date to UTC
        task_date = task_date.astimezone(pytz.timezone('Asia/Karachi'))  # Convert to 'Asia/Karachi' timezone
        try:
            scheduler.remove_job(task_id)
        except:
            pass
        scheduler.add_job(
            misfire_grace_time=60,
            func=my_task, 
            args=[task_id], 
            id=task_id, 
            run_date=task_date,
            trigger="date"
        )

def on_job_removed(event):
    job_id = str(event.job_id)
    db.jobs.delete_one({'_id': ObjectId(job_id)})

scheduler.add_listener(on_job_removed, EVENT_JOB_REMOVED)

try:
    tasks = db.schedules.watch(full_document='updateLookup')
except OperationFailure as e:
    print(f"Unable to create change stream: {e}")
else:
    while tasks.alive: # loop over the change stream cursor
        change = tasks.try_next() # get the next change document
        if change is not None: # if there is a change document
            on_change(change) # call the callback function

if __name__ == '__main__':
    app.run(debug=True, port=7000)