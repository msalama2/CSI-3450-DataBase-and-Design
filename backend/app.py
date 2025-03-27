import os
from flask import Flask, render_template, jsonify, request
from datetime import datetime, timedelta
import traceback
import jwt
from methods.user_login import *
from methods.courses import *

template_dir = os.path.abspath("frontend")

app = Flask(__name__, template_folder=template_dir)

@app.route('/')
def home():
   
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    return login_user(request)

@app.route('/search_course', methods=['GET'])  # Add the route
def search_course_by_id():
    return search_course(request)

if __name__ == '__main__':
    app.run(debug=True)
