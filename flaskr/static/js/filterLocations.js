// File: filterLocations.js
// Author: Tapio Jokinen
/*
Description:  This function is used to filter unused locations so they are 
              not drawn on the map. If a location can be found in both 
              locationData and trafficData, save the object containing the
              location to an array and finally return the array which contains 
              all the necessary locations.
*/

const filterLocations = (locationData, trafficData) => {

  // Get keys (locations) from the first object in trafficData.
  let keys = Object.keys(trafficData[0]);

  // Locations that are not going to be filtered out.
  let savedLocations = [];

  // First key is "aika" so start iterating on index 1.
  locationData.forEach((locationDataPlace) => {
    for (let i = 1; i < keys.length; i++) {

      // Remove vehicle type and movement direction letters like "AK" and "AP".
      let temp = keys[i].split(" ");
      temp.pop();
      let trafficDataPlace = temp.join(" ");

      if (trafficDataPlace === locationDataPlace["name"]) {
        savedLocations.push(locationDataPlace);
        break;
      }
    }
  });

  // Filter locations.
  let filteredLocations = locationData.filter((location) => savedLocations.includes(location));

  return filteredLocations;
};
