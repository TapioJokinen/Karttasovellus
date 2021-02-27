const cars = async(map) => {

    // HTML elements.
    const btnShowHideCars = document.getElementById("button-show-hide-cars");
    const btnSearchCars = document.getElementById("button-search-cars");
    const dataCars = document.getElementById("data-cars");
    const errorText = document.getElementById("error-datepicker-cars-text")

    // Data variables.
    let locationData = {};
    let trafficData = {};
    let drawnMapObjects = [];

    // Whether to show or hide.
    let clickStatus = true;

    btnShowHideCars.addEventListener("click", () => {
        if (clickStatus) {
            (async () => {

                // Fetch location and traffic data.
                let locationDataResponse = await fetch("/data/liikennelaskimet");
                let trafficDataResponse = await fetch("/data/car");
    
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
                drawnMapObjects = drawAreasOnMap(map, filterLocations(locationData, trafficData), "car");

                // Write latest values to web page.
                latestValues(trafficData, "data-cars");

                // Change button text on click.
                btnShowHideCars.innerText = "Hide cars";

                clickStatus = false;
            })();
        } else {

            // Clear all data from map and screen.
            clearDrawnObjects(drawnMapObjects);
            dataCars.innerHTML = "";
            errorText.textContent = "";

            // Change button text on click.
            btnShowHideCars.innerText = "Show cars";

            clickStatus = true;
        }
    });

    btnSearchCars.addEventListener("click", () => {

        // Clear old data and error texts.
        dataCars.innerHTML = "";
        errorText.textContent = "";

        let dateStart = document.getElementById("date-start-cars").value;
        let dateEnd = document.getElementById("date-end-cars").value;
        let timeStart = document.getElementById("time-start-cars").value;
        let timeEnd = document.getElementById("time-end-cars").value;

        // Fix time values to be divisible by 15.
        timeStart = fixTime(timeStart);
        timeEnd = fixTime(timeEnd);

        // Add seconds to time string.
        let startDateString = `${dateStart} ${timeStart}:00`;
        let endDateString = `${dateEnd} ${timeEnd}:00`;

        // Full date variables.
        let start = new Date(startDateString);
        let end = new Date(endDateString);

        // Check for errors then proceed.
        if (start > end) {
            errorText.textContent = "Start date must be smaller than the end date!";
        } else {
            (async () => {

                // Fetch location and traffic data.
                let locationDataResponse = await fetch("/data/liikennelaskimet");
                let trafficDataResponse = await fetch("/data/car");
    
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
                drawnMapObjects = drawAreasOnMap(map, filterLocations(locationData, trafficData), "car");

                // Total traffic between the start and end date.
                let totalTraffic = totalTraffic(trafficData, start, end);

                Object.keys(totalTraffic).forEach((key) => {
                    let s = `${key}: ${totalTraffic[key]}`;
                    let ul = document.getElementById("data-cars");
                    let li = document.createElement("li");
                    li.appendChild(document.createTextNode(s));
                    ul.appendChild(li);
                  });
            })();
        }

    });

}