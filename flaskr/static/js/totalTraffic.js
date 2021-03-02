/*
File: totalTraffic.js
Author: Tapio Jokinen

Description:  Calculates the total traffic between dateStart and dateEnd. Returns a dictionary
where key/value pair is { "place": "total traffic volume"}
*/

const totalTraffic = (trafficData, dateStart, dateEnd) => {

  // Get the names of the places.
  let places = Object.keys(trafficData[0]);

  // Contains volumes of traffic for each place.
  let countList = new Array(places.length - 1).fill(0);

  for (let i = 0; i < trafficData.length; i++) {
    let time = new Date(trafficData[i]["aika"]);

    // Find the start date.
    if (dateStart.getTime() === time.getTime()) {
     
      for (let j = i; j < trafficData.length; j++) {
        time = new Date(trafficData[j]["aika"]);

        // Index 0 is "aika" so start loop at index 1.
        for (let k = 1; k < places.length; k++) {

          // In case on NaN value return 0.
          let volume = parseInt(trafficData[j][places[k]]) || 0;

          countList[k - 1] = countList[k - 1] + volume;
        }

        // If end date is reached, break.
        if (time.getTime() === dateEnd.getTime()) {
          console.log("End time reached.")
          break;
        }
      }
    }
  }

  // Remove first element "aika".
  places.shift(); 

  // Create key/value pairs
  let dict = {};

  places.forEach((key, i) => {
    dict[key] = countList[i];
  });

  return dict;
};
