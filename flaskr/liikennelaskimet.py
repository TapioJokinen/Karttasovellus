# File: dwnld_liikennelaskimet_data.py
# Author: Tapio Jokinen
# Description: Downloads liikennelaskimet.geojson file which contains data of traffic calculator locations. 
# Creates a new simplified json file without unnecessary data.

import requests
import json

def liikennelaskimet():

    # Try to get liikennelaskimet.geojson file
    try:
        response = requests.get("https://dev.turku.fi/datasets/ecocounter/liikennelaskimet.geojson", verify=False) # Certification verification disabled.
        response.raise_for_status()
    except requests.HTTPError as err:
        print(err)

    # Convert the response to json
    liikennelaskimet = response.json()

    # A list that contains needed features of the json file.
    features = []

    for data in liikennelaskimet["features"]:
        name = data["properties"]["Nimi"]
        longitude = data["geometry"]["coordinates"][0]
        latitude = data["geometry"]["coordinates"][1]

        place = {"name": name, "lat": latitude, "lng": longitude}

        features.append(place)

    # Convert the list to a string.
    jsonString = json.dumps(features, indent=2)

    # Create new json file from the string.
    k = open("./static/data/liikennelaskimet.json", "w")
    k.write(jsonString)
    k.close()
