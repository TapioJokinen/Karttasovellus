/*
File: bicycles.js
Author: Tapio Jokinen
Description: Handles all events related to bicycle traffic.
*/

const bicycles = async(map) => {

    // HTML elements.
    const btnShowHideBicycles = document.getElementById("button-show-hide-bicycles");
    const btnSearchBicycles = document.getElementById("button-search-bicycles");
    const dataBicycles = document.getElementById("data-bicycles");
    const errorText = document.getElementById("error-datepicker-bicycles-text")

    // Data variables.
    let locationData = {};
    let trafficData = {};
    let drawnMapObjects = [];

    // Whether to show or hide.
    let clickStatus = true;

    btnShowHideBicycles.addEventListener("click", () => {
        console.log("clicked")
        if (clickStatus) {
            (async () => {

                // Fetch location and traffic data.
                let locationDataResponse = await fetch("/data/liikennelaskimet");
                let trafficDataResponse = await fetch("/data/bicycle");
    
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
                drawnMapObjects = drawAreasOnMap(map, filterLocations(locationData, trafficData), "bicycle");

                // Write latest values to web page.
                latestValues(trafficData, "data-bicycles");

                // Change button text on click.
                btnShowHideBicycles.innerText = "Hide bicycles";

                clickStatus = false;
            })();
        } else {

            // Clear all data from map and screen.
            clearDrawnObjects(drawnMapObjects);
            dataBicycles.innerHTML = "";
            errorText.textContent = "";

            // Change button text on click.
            btnShowHideBicycles.innerText = "Show bicycles";

            clickStatus = true;
        }
    });

    btnSearchBicycles.addEventListener("click", () => {

        // Clear old data and error texts.
        dataBicycles.innerHTML = "";
        errorText.textContent = "";

        let dateStart = document.getElementById("date-start-bicycles").value;
        let dateEnd = document.getElementById("date-end-bicycles").value;
        let timeStart = document.getElementById("time-start-bicycles").value;
        let timeEnd = document.getElementById("time-end-bicycles").value;

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
                let trafficDataResponse = await fetch("/data/bicycle");
    
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
                drawnMapObjects = drawAreasOnMap(map, filterLocations(locationData, trafficData), "bicycle");

                // Total traffic between the start and end date.
                let traffic = totalTraffic(trafficData, start, end);

                // Write data to web page.
                Object.keys(traffic).forEach((key) => {
                    let s = `${key}: ${traffic[key]}`;
                    let ul = document.getElementById("data-bicycles");
                    let li = document.createElement("li");
                    li.appendChild(document.createTextNode(s));
                    ul.appendChild(li);
                  });
            })();
        }

    });

}