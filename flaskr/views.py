from flaskr import app
from flask import render_template

@app.route("/")
def main_page():
    return render_template("index.html")