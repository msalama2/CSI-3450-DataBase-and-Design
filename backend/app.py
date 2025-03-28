import os
from flask import Flask, render_template, jsonify, request
from datetime import datetime, timedelta
import traceback
import jwt
from methods.user import *
from methods.courses import *
from flask_cors import CORS

template_dir = os.path.abspath("frontend")

app = Flask(__name__, template_folder=template_dir)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    return login_user(request)

@app.route('/search_course', methods=['GET'])  
def search_course_by_id():
    return search_course(request)

@app.route('/fetch_user_by_id', methods=['POST'])
def get_user():
    return fetch_user_by_id(request)

if __name__ == '__main__':
    app.run(debug=True)
