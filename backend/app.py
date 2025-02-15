import os
from flask import Flask, render_template

template_dir = os.path.abspath("frontend/JobManagement")

app = Flask(__name__, template_folder=template_dir)

print("Looking for templates in:", app.template_folder) 

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
