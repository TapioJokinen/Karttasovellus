from flaskr import app
from flaskr.liikennelaskimet import liikennelaskimet
from flaskr.traffic_data import traffic_data
from flask import render_template, send_from_directory

data_folder = "static/data/"

@app.route("/")
def main_page():
    return render_template("index.html")

@app.route("/data/liikennelaskimet.json")
def send_liikennelaskimet():
    try:
        liikennelaskimet()
        return send_from_directory(data_folder, "liikennelaskimet.json")
    except FileNotFoundError:
        print("liikennelaskimet.json was not found.")

@app.route("/data/<path:vehicle>")
def send_vehicle(vehicle):
    try:
        if traffic_data(vehicle):
            return send_from_directory(data_folder, "traffic_data_{}s.json".format(vehicle))
        else:
            return "Wrong vehicle type."
    except FileNotFoundError:
        print("traffic_data_{}s.json was not found.".format(vehicle))
