"""
File: traffic_data.py
Author: Tapio Jokinen

Description:
Downloads counters-15min.csv file which contains data of traffic volumes for cars, bicycles and pedestrians.
Creates a new file which contains traffic volume data of certain type of a vehicle. The vehicle type
is defined as function parameter.
"""

import pandas as pd
import json

def traffic_data(vehicle_type):

    # Check if vehicle type is right.
    if (vehicle_type != "car") and (vehicle_type != "bicycle") and (vehicle_type != "pedestrian"):
        print("Wrong vehicle type")
        return False
        
    # Read file into pandas dataframe. Also replace empty values with zeros.
    try:
        df = pd.read_csv("https://dev.turku.fi/datasets/ecocounter/2020/counters-15min.csv", sep=",")
        df.fillna(0, inplace=True)
    except (pd.errors.EmptyDataError, pd.errors.ParserError):
        print("Error while reading file into dataframe.")

    # Delete unnecessary columns from the dataframe
    for column in df.columns:
        if vehicle_type == "car":
            if not column.endswith(("aika", "AP", "AK")):
                del df[column]
        elif vehicle_type == "bicycle":
            if not column.endswith(("aika", "PP", "PK")):
                del df[column]
        elif vehicle_type == "pedestrian":
            if not column.endswith(("aika", "JP", "JK")):
                del df[column]

    file_name = "flaskr/static/data/traffic_data_{}s.json".format(vehicle_type)

    # Convert object to a json file.
    df.to_json(file_name, orient="records")

    # Make json file more readable for human eyes.
    with open(file_name) as f:
        data = json.load(f)

    jsonString = json.dumps(data, indent=2)

    k = open(file_name, "w")
    k.write(jsonString)
    k.close()

    return True
