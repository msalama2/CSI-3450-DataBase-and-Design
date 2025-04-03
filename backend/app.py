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
    return jsonify({"message": "Backend is running!"})

@app.route('/login', methods=['POST'])
def login():
    return login_user(request)

@app.route('/search_course', methods=['POST'])  
def search_course_by_id():
    return search_course(request)

@app.route('/fetch_user_by_id', methods=['POST'])
def get_user():
    return fetch_user_by_id(request)

@app.route('/register_for_class', methods=['POST'])
def class_register():
    return register_for_course(request)

@app.route('/drop_class', methods=['POST'])
def class_drop():
    return drop_class(request)

@app.route('/get_course_summary', methods=['GET'])
def get_summary():
    return get_course_summary(request)

"""
@app.route('/add_bookmark', methods=['POST'])
def add_bookmark():
    return fetch_user_by_id(request)

@app.route('/remove_bookmark', methods=['POST'])
def remove_bookmark():
    return fetch_user_by_id(request)
    
@app.route('/retrieve_by_subject', methods=['POST'])
def get_user():
    return fetch_user_by_id(request)
"""

if __name__ == '__main__':
    app.run(debug=True, port=5001)
