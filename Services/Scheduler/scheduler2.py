from flask import Flask, jsonify, request
from pymongo import MongoClient
import sched
import time

app = Flask(__name__)
client = MongoClient('mongodb+srv://root:root@cluster0.trpwg.mongodb.net/?retryWrites=true&w=majority')
db = client['mavenMarketing']

def schedule_task(task, time):
    # Use Python's built-in "sched" module to schedule the task to be executed at a specific time
    scheduler = sched.scheduler(time.time, time.sleep)
    scheduler.enterabs(time, 1, execute_task, (task,))
    scheduler.run()

def execute_task(task):
    # This function will be called by the scheduler when it's time to execute the task
    print(f"Executing task: {task}")

def get_tasks():
    # Retrieve tasks from the MongoDB database and return them as JSON data
    tasks = db.schedules.find()
    print("-----------------------------------------")
    print(tasks)
    print("-----------------------------------------")
    return jsonify(list([tasks['sendTime']]))

def add_task():
    # Add a new task to the MongoDB database
    task = request.get_json()
    #db.tasks.insert_one(task)
    # Schedule the task to be executed at the specified time
    schedule_task(task, task['sendTime'])
    return jsonify(task)

print(get_tasks())

if __name__ == '__main__':
    app.run(debug=True, port=7000)
