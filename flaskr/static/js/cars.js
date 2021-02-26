const cars = async(map) => {
    const btnShowCars = document.getElementById("button-show-cars");
    const btnHideCars = document.getElementById("button-hide-cars");
    const btnSearchCars = document.getElementById("button-search-cars");
    let locationData = {};
    let trafficData = {};
    let drawnMapObjects = [];
    let clickable = true;

    btnShowCars.addEventListener("click", () => {
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

                clickable = false;
            })();
        }
    });
}