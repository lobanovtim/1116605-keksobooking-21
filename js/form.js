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
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const main = document.querySelector(`main`);
  const resetBtn = document.querySelector(`.ad-form__reset`);

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

    console.log(new FormData(adForm));
  };

  const deactivateForm = function () {
    window.map.map.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);
    mapFilters.classList.add(`ad-form--disabled`);

    for (let i = 0; i < adForm.length; i++) {
      adForm[i].setAttribute(`disabled`);
    }
    for (let i = 0; i < mapFilters.length; i++) {
      mapFilters[i].setAttribute(`disabled`);
    }
  };

  // Включает форму/фильтры
  const activateFormsItem = function () {
    for (let i = 0; i < adForm.length; i++) {
      adForm[i].setAttribute(`disabled`, `disabled`);
    }

    for (let i = 0; i < mapFilters.length; i++) {
      mapFilters[i].setAttribute(`disabled`, `disabled`);
    }
  }

  activateFormsItem();

  const deactivateFormsItem = function () {
    for (let i = 0; i < adForm.length; i++) {
      adForm[i].removeAttribute(`disabled`, `disabled`);
    }

    for (let i = 0; i < mapFilters.length; i++) {
      mapFilters[i].removeAttribute(`disabled`, `disabled`);
    }
  }


  // Валидация заголовка
  // const validateTitle = function () {
  //   if (titleForm.value.length < titleForm.minLength) {
  //     titleForm.setCustomValidity(`Заголовок должен состоять минимум из ${titleForm.minLength} символов`);
  //   } else if (titleForm.value.length > titleForm.maxLength) {
  //     titleForm.setCustomValidity(`Заголовок не должен превышать ${titleForm.maxLength} символов`);
  //   } else {
  //     titleForm.setCustomValidity(``);
  //   }

  //   titleForm.reportValidity();
  // };

  // titleForm.addEventListener(`change`, validateTitle);

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

  const hideSuccessMessage = (evt) => {
    evt.preventDefault();
    const message = main.querySelector(`.success`);
    main.removeChild(message);
    document.removeEventListener(`click`, hideSuccessMessage);
    document.removeEventListener(`keydown`, hideSuccessMessageByEsc);
  };

  const hideSuccessMessageByEsc = (evt) => {
    if (evt.key === `Escape`) {
      hideSuccessMessage(evt);
    }
  };

  const hideErrorMessage = (evt) => {
    evt.preventDefault();
    const message = main.querySelector(`.error`);
    main.removeChild(message);
    document.removeEventListener(`click`, hideErrorMessage);
    document.removeEventListener(`keydown`, hideErrorMessageByEsc);
  };

  const hideErrorMessageByEsc = (evt) => {
    if (evt.key === `Escape`) {
      hideErrorMessage(evt);
    }
  };

  const setSuccessMessage = () => {
    const successMessage = successTemplate.cloneNode(true);
    main.appendChild(successMessage);
    document.addEventListener(`click`, hideSuccessMessage);
    document.addEventListener(`keydown`, hideSuccessMessageByEsc);
    // Сбросить форму
    // Вернуть mainPin
  };

  resetBtn.addEventListener(`click`, () => {
    adForm.reset();
    mapFilters.reset();
    // Сбросить форму
    // Вернуть mainPin
  });

  const setErrorMessage = () => {
    const errorMessage = errorTemplate.cloneNode(true);
    main.appendChild(errorMessage);
    document.addEventListener(`click`, hideErrorMessage);
    document.addEventListener(`keydown`, hideErrorMessageByEsc);
    const btnErr = document.querySelector(`.error__button`);
    btnErr.addEventListener(`click`, hideErrorMessage);
  };

  adForm.addEventListener(`submit`, (evt) => {
    // debugger
    const formData = new FormData(adForm);
    console.log(formData)
    window.network.sendData(formData, () => {
      window.pin.removePins();
      window.card.removeCard();
      adForm.reset();
      resetPrice();
      window.pin.resetPinMain();
      setSuccessMessage();
    }, setErrorMessage);
    evt.preventDefault();
  });

  window.form = {
    activateForm,
    deactivateForm,
    deactivateFormsItem
  };
})();
