/*
File: replaceAt.js
Author: Tapio Jokinen
Description: If the minutes of the time string are not divisible by 15, replace minute values. 
*/


// Fucntion to replace character at a particular index.
String.prototype.replaceAt = function (index, replacement) {
  if (index >= this.length) {
    return this.valueOf();
  }

  return this.substring(0, index) + replacement + this.substring(index + 1);
};

const fixTime = (timeString) => {
  let fixedTime;
  let minutes = parseInt(timeString[3] + timeString[4]);

  if (minutes % 15 === 0) {
    // Everything is fine, return original string.
    return timeString;
  } else if (minutes > 0 && minutes < 15) {
    timeString = timeString.replaceAt(3, "0");
    fixedTime = timeString.replaceAt(4, "0");
  } else if (minutes > 15 && minutes < 30) {
    timeString = timeString.replaceAt(3, "1");
    fixedTime = timeString.replaceAt(4, "5");
  } else if (minutes > 30 && minutes < 45) {
    timeString = timeString.replaceAt(3, "3");
    fixedTime = timeString.replaceAt(4, "0");
  } else if (minutes > 45) {
    timeString = timeString.replaceAt(3, "4");
    fixedTime = timeString.replaceAt(4, "5");
  }

  return fixedTime;
};
