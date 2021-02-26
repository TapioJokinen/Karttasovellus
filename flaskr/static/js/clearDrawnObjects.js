/*
File: clearDrawnObjects.js
Author: Tapio Jokinen
Description: Clears objects drawn on map. 
*/

const clearDrawnObjects = (drawnObjects) => {
  drawnObjects.forEach((object) => {
    object.setMap(null);
  });
};
