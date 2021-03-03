/*
File: cars.js
Author: Tapio Jokinen
Description: Handles all events related to pedestrian traffic.
*/

const pedestrians = async(map) => {

    // HTML elements.
    const btnShowHidePedestrians = document.getElementById("button-show-hide-pedestrians");
    const btnSearchPedestrians = document.getElementById("button-search-pedestrians");
    const dataPedestrians = document.getElementById("data-pedestrians");
    const errorText = document.getElementById("error-datepicker-pedestrians-text")

    // Data variables.
    let locationData = {};
    let trafficData = {};
    let drawnMapObjects = [];

    // Whether to show or hide.
    let clickStatus = true;

    btnShowHidePedestrians.addEventListener("click", () => {
        if (clickStatus) {
            (async () => {

                // Fetch location and traffic data.
                let locationDataResponse = await fetch("/data/liikennelaskimet");
                let trafficDataResponse = await fetch("/data/pedestrian");
    
                // If response ok(200) convert response to json.
                if (locationDataResponse.ok && trafficDataResponse.ok) {
                    locationData = await locationDataResponse.json();
                    trafficData = await trafficDataResponse.json();
                } else {
                    throw new Error(`HTTP error!
                        \nlocationDataResponse: ${locationDataResponse.status}
                        \ntrafficDataResponse: ${trafficDataResponse.status}` );
                }
                
                // Draw areas on map
                drawnMapObjects = drawAreasOnMap(map, filterLocations(locationData, trafficData), "pedestrian");

                // Write latest values to web page.
                latestValues(trafficData, "data-pedestrians");

                // Change button text on click.
                btnShowHidePedestrians.innerText = "Hide pedestrians";

                clickStatus = false;
            })();
        } else {

            // Clear all data from map and screen.
            clearDrawnObjects(drawnMapObjects);
            dataPedestrians.innerHTML = "";
            errorText.textContent = "";

            // Change button text on click.
            btnShowHidePedestrians.innerText = "Pedestrians";

            clickStatus = true;
        }
    });

    btnSearchPedestrians.addEventListener("click", () => {

        // Clear old data and error texts.
        dataPedestrians.innerHTML = "";
        errorText.textContent = "";

        let dateStart = document.getElementById("date-start-pedestrians").value;
        let dateEnd = document.getElementById("date-end-pedestrians").value;
        let timeStart = document.getElementById("time-start-pedestrians").value;
        let timeEnd = document.getElementById("time-end-pedestrians").value;

        // Fix time values to be divisible by 15.
        timeStart = fixTime(timeStart);
        timeEnd = fixTime(timeEnd);

        // Add seconds to time string.
        let startDateString = `${dateStart} ${timeStart}:00`;
        let endDateString = `${dateEnd} ${timeEnd}:00`;

        // Full date variables.
        let start = new Date(startDateString);
        let end = new Date(endDateString);

        // Check for user input errors.
        if (start > end) {
            errorText.textContent = "Start date must be smaller than the end date!";
        } else {
            (async () => {

                // Fetch location and traffic data.
                let locationDataResponse = await fetch("/data/liikennelaskimet");
                let trafficDataResponse = await fetch("/data/pedestrian");
    
                // If response ok(200) convert response to json.
                if (locationDataResponse.ok && trafficDataResponse.ok) {
                    locationData = await locationDataResponse.json();
                    trafficData = await trafficDataResponse.json();
                } else {
                    throw new Error(`HTTP error!
                        \nlocationDataResponse: ${locationDataResponse.status}
                        \ntrafficDataResponse: ${trafficDataResponse.status}` );
                }
                
                // Draw areas on map
                clearDrawnObjects(drawnMapObjects);
                drawnMapObjects = drawAreasOnMap(map, filterLocations(locationData, trafficData), "pedestrian");

                // Total traffic between the start and end date.
                let traffic = totalTraffic(trafficData, start, end);

                // Write data to web page.
                Object.keys(traffic).forEach((key) => {
                    let s = `${key}: ${traffic[key]}`;
                    let ul = document.getElementById("data-pedestrians");
                    let li = document.createElement("li");
                    li.appendChild(document.createTextNode(s));
                    ul.appendChild(li);
                  });

                btnShowHidePedestrians.innerText = "Hide pedestrians";
                clickStatus = false;
            })();
        }
    });
}