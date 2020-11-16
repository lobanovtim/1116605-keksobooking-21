"use strict";

(function () {

  const mapPin = document.querySelector(`.map__pin--main`);
  const map = document.querySelector(`.map`);

  // Функция активации
  const activatePage = function () {
    window.form.activateForm();
    window.pin.renderPins(window.data.cardList);
  };

  // Объявляет и добавляет обработчики
  const buttonMouseDownHandler = function (evt) {
    if (evt.button === 0) {
      activatePage();
      mapPin.removeEventListener(`mousedown`, buttonMouseDownHandler);
      mapPin.removeEventListener(`keydown`, buttonKeyDownHandler);
    }
  };

  const buttonKeyDownHandler = function (evt) {
    if (evt.key === `Enter`) {
      activatePage();
      mapPin.removeEventListener(`mousedown`, buttonMouseDownHandler);
      mapPin.removeEventListener(`keydown`, buttonKeyDownHandler);
    }
  };

  mapPin.addEventListener(`keydown`, buttonKeyDownHandler);
  mapPin.addEventListener(`mousedown`, buttonMouseDownHandler);

  window.map = {
    mapPin,
    map
  };
})();
