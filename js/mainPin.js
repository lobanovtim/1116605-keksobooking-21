"use strict";

(function () {

  const WIDTH_MAIN_PIN = 62;
  const HEIGHT_MAIN_PIN = 84;
  const MIN_Y = 130 - HEIGHT_MAIN_PIN;
  const MAX_Y = 630 - HEIGHT_MAIN_PIN;
  const MIN_X = 0 - WIDTH_MAIN_PIN / 2;
  const MAX_X = 1200 - WIDTH_MAIN_PIN / 2;
  const pinAddress = document.querySelector(`#address`);

  const BORDER = {
    TOP: MIN_Y,
    BOTTOM: MAX_Y,
    LEFT: MIN_X,
    RIGHT: MAX_X
  };

  window.map.mapPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    pinAddress.setAttribute(`value`, `${startCoords.x}` + `, ` + `${startCoords.y}`);

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      let mapPinPosition = {
        x: window.map.mapPin.offsetLeft - shift.x,
        y: window.map.mapPin.offsetTop - shift.y
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mapPinPosition.x >= BORDER.LEFT && mapPinPosition.x <= BORDER.RIGHT) {
        window.map.mapPin.style.left = `${mapPinPosition.x}px`;
      }

      if (mapPinPosition.y >= BORDER.TOP && mapPinPosition.y <= BORDER.BOTTOM) {
        window.map.mapPin.style.top = `${mapPinPosition.y}px`;
      }

      if (mapPinPosition.y > MAX_Y) {
        mapPinPosition.y = MAX_Y;
      }
      if (mapPinPosition.y < MIN_Y) {
        mapPinPosition.y = MIN_Y;
      }
      if (mapPinPosition.x < MIN_X) {
        mapPinPosition.x = MIN_X;
      }
      if (mapPinPosition.x > MAX_X) {
        mapPinPosition.x = MAX_X;
      }

      pinAddress.setAttribute(`value`, `${mapPinPosition.x}` + `, ` + `${mapPinPosition.y}`);

    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

})();
