import os
from flask import Flask, render_template, jsonify, request
from datetime import datetime, timedelta
import traceback
import jwt
from methods.user_login import login_user

template_dir = os.path.abspath("frontend/JobManagement")

app = Flask(__name__, template_folder=template_dir)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    return login_user(request)

if __name__ == '__main__':
    app.run(debug=True)
