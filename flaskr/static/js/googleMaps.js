// File: googleMaps.js
// Author: Tapio Jokinen
// Description: Initializes map and functions used for it.


let map;

let defaultCenter = { lat: 60.44600, lng: 22.2646300};
let defaultZoom = 13;

const initMap = async () => {
  console.log("haista")
    map = new google.maps.Map(document.getElementById("map"), {
        center: defaultCenter,
        zoom: defaultZoom,
      });
}


initMap()