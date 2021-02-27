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

    // To disable multiple clicks.
    let clickable = true;

    btnShowHideCars.addEventListener("click", () => {
        if (clickable) {
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

                clickable = false;
            })();
        } else {

            // Clear all data from map and screen.
            clearDrawnObjects(drawnMapObjects);

            dataCars.innerHTML = "";
            errorText.textContent = "";

            // Change button text on click.
            btnShowHideCars.innerText = "Show cars";

            clickable = true;
        }
    });

}