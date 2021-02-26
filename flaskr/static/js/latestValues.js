/*
File: latestValues.js
Author: Tapio Jokinen
Description: Adds <li> elements to a list that shows latest values of trafficData.
*/

const latestValues = (trafficData, ul_id) => {
  let keys = Object.keys(trafficData[trafficData.length - 1]);
  let dataStrings = [];

  for (let i = 0; i < keys.length; i++) {
    let s = `${keys[i]} : ${trafficData[trafficData.length - 1][keys[i]]}`;
    dataStrings.push(s);
  }

  let ul = document.getElementById(ul_id);
  let li = document.createElement("li");

  li.setAttribute("id", "data_latest");
  li.appendChild(document.createTextNode("Latest values:"));
  ul.appendChild(li);


  for (let i = 0; i < dataStrings.length; i++) {
    let li = document.createElement("li");
    let txt = dataStrings[i];

    if (txt.includes("aika")) {
      txt = txt.replace("aika", "time");
    }

    li.appendChild(document.createTextNode(txt));
    ul.appendChild(li);
  }
};
