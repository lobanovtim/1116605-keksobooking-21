"use strict";

(function () {

  const TYPE_HOUSE_COAST = {
    'bungalow': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  const adForm = document.querySelector(`.ad-form`);
  const mapFilters = document.querySelector(`.map__filters`);

  const titleForm = document.querySelector(`#title`);
  const priceForm = document.querySelector(`#price`);
  const addressForm = document.querySelector(`#address`);
  const typeOfHouseForm = document.querySelector(`#type`);
  const timeInForm = document.querySelector(`#timein`);
  const timeOutForm = document.querySelector(`#timeout`);
  const formRoomNumber = adForm.querySelector(`#room_number`);
  const formGuestNumber = adForm.querySelector(`#capacity`);

  const activateForm = function () {
    window.map.map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    mapFilters.classList.remove(`ad-form--disabled`);

    for (let i = 0; i < adForm.length; i++) {
      adForm[i].removeAttribute(`disabled`);
    }
    for (let i = 0; i < mapFilters.length; i++) {
      mapFilters[i].removeAttribute(`disabled`);
    }
  };

  // Отключает форму
  for (let i = 0; i < adForm.length; i++) {
    adForm[i].setAttribute(`disabled`, `disabled`);
  }

  // Отключает фильтры
  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].setAttribute(`disabled`, `disabled`);
  }

  // Узнает координаты главной метки
  const WIDTH_MAIN_PIN = 62;
  const HEIGHT_MAIN_PIN = 62;
  const LEFT_MAP_PIN = window.map.mapPin.offsetLeft + WIDTH_MAIN_PIN / 2;
  const TOP_MAP_PIN = window.map.mapPin.offsetTop + HEIGHT_MAIN_PIN / 2;

  // Записывает данные координат в форму объявления
  adForm.querySelector(`#address`).setAttribute(`value`, LEFT_MAP_PIN + `, ` + TOP_MAP_PIN);

  // Валидация заголовка
  const validateTitle = function () {
    if (titleForm.value.length < titleForm.minLength) {
      titleForm.setCustomValidity(`Заголовок должен состоять минимум из ${titleForm.minLength} символов`);
    } else if (titleForm.value.length > titleForm.maxLength) {
      titleForm.setCustomValidity(`Заголовок не должен превышать ${titleForm.maxLength} символов`);
    } else {
      titleForm.setCustomValidity(``);
    }

    titleForm.reportValidity();
  };

  titleForm.addEventListener(`change`, validateTitle);

  // Зависимость количества гостей от количества комнат
  const validateRoomCapacity = function (evt) {
    let rooms = parseInt(formRoomNumber.value, 10);
    let guests = parseInt(formGuestNumber.value, 10);

    formRoomNumber.setCustomValidity(``);
    formGuestNumber.setCustomValidity(``);
    if (guests === 0 && rooms !== 100) {
      evt.target.setCustomValidity(`Нужно 100 комнат`);
    } else if (guests !== 0 && rooms === 100) {
      evt.target.setCustomValidity(`Не для гостей`);
    } else if (guests > rooms) {
      evt.target.setCustomValidity(`Нужно больше комнат`);
    }

    formRoomNumber.reportValidity();
    formGuestNumber.reportValidity();
  };

  formGuestNumber.addEventListener(`change`, validateRoomCapacity);
  formRoomNumber.addEventListener(`change`, validateRoomCapacity);

  // Ограничивает поле "адрес" для редактирования
  addressForm.setAttribute(`readonly`, `readonly`);

  // Присваивает значение суммы в зависимоти от выбранного типа жилья
  priceForm.setAttribute(`min`, TYPE_HOUSE_COAST[typeOfHouseForm.options[typeOfHouseForm.selectedIndex].value]);
  priceForm.setAttribute(`placeholder`, TYPE_HOUSE_COAST[typeOfHouseForm.options[typeOfHouseForm.selectedIndex].value]);

  typeOfHouseForm.addEventListener(`change`, function (evt) {
    priceForm.setAttribute(`min`, TYPE_HOUSE_COAST[typeOfHouseForm.options[evt.currentTarget.selectedIndex].value]);
    priceForm.setAttribute(`placeholder`, TYPE_HOUSE_COAST[typeOfHouseForm.options[evt.currentTarget.selectedIndex].value]);
  });

  // Синхронизирует время заезда/выезда
  const validationTime = function (evt) {
    if (evt.currentTarget.name === `timeout`) {
      timeInForm.options.selectedIndex = timeOutForm.options.selectedIndex;
    } else {
      timeOutForm.options.selectedIndex = timeInForm.options.selectedIndex;
    }
  };

  timeInForm.addEventListener(`change`, validationTime);
  timeOutForm.addEventListener(`change`, validationTime);

  window.form = {
    activateForm
  };
})();
