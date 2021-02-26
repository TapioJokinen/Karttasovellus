/*
File: drawAreas.js
Author: Tapio Jokinen
Description: Draw circles and markers on the map based on the location data.
Function returns an array of drawn objects.
 */

const drawAreasOnMap = (map, locationData, type) => {
    let drawnObjects = [];
    let color = "#FFFFFF";

    switch (type) {
      case "car":
        color = "#74ad5a";
        break;
      case "bicycle":
        color = "#476e9e";
        break;
      case "pedestrian":
        color = "#7d5d3b";
      default:
        break;
    }

    for (const place in locationData) {
        const circle = new google.maps.Circle({
          strokeColor: color,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: color,
          fillOpacity: 0.50,
          map,
          center: {
            lat: locationData[place]["lat"],
            lng: locationData[place]["lng"],
          },
          radius: 100,
        });

        const marker = new google.maps.Marker({
          position: {
            lat: locationData[place]["lat"],
            lng: locationData[place]["lng"],
          },
          map,
          title: locationData[place]["name"],
        });

        drawnObjects.push(circle);
        drawnObjects.push(marker);
    }

    return drawnObjects;
}