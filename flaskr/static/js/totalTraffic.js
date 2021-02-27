/*File: totalTraffic.js
Author: Tapio Jokinen

Description:  Calculates the total traffic between dateStart and dateEnd. Returns a dictionary
where key/value pair is { "place": "total traffic value"}
*/

const totalTraffic = (trafficData, dateStart, dateEnd) => {

  // Get the names of the places.
  let places = Object.keys(trafficData[0]);

  // Contains values of total traffic for each place.
  let countList = new Array(places.length - 1).fill(0);

  for (let i = 0; i < trafficData.length; i++) {
    let time = new Date(trafficData[i]["aika"]);

    // Find the start date.
    if (dateStart.getTime() === time.getTime()) {
      for (let j = i; j < trafficData.length; j++) {
        time = new Date(trafficData[j]["aika"]);

        // Index 0 is "aika" so start loop at index 1.
        for (let k = 1; k < places.length; k++) {
          countList[k - 1] = countList[k - 1] + parseInt(trafficData[j][places[k]]);
        }

        // If end date is reached, break.
        if (time.getTime() === dateEnd.getTime()) {
          break;
        }
      }
    }
  }

  places.shift(); // Remove first element "aika".

  // Create key/value pairs
  let dict = {};

  places.forEach((key, i) => {
    dict[key] = countList[i];
  });

  return dict;
};
