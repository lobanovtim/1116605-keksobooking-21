"use strict";

const OFFER_TITLE = [
  `Заголовок объявления 1`,
  `Заголовок объявления 2`,
  `Заголовок объявления 3`,
  `Заголовок объявления 4`,
];
const OFFER_ADDRESS = [
  `Какой-то адрес 1`,
  `Какой-то адрес 2`,
  `Какой-то адрес 3`,
  `Какой-то адрес 4`,
];
const OFFER_TYPE = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`,
};
const TYPE_HOUSE_COAST = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};
const OFFER_ROOMS = [1, 2, 3, 4, 5, 6, 7];
const OFFER_GUESTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const OFFER_CHECKIN = [`12:00`, `13:00`, `14:00`];
const OFFER_CHECKOUT = [`12:00`, `13:00`, `14:00`];
const OFFER_FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`,
];
const OFFER_DESCRIPTION = [
  `Какое-то описание 1`,
  `Какое-то описание 2`,
  `Какое-то описание 3`,
  `Какое-то описание 4`,
];
const OFFER_PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
];

const pinSize = {
  width: 50,
  height: 70,
};

const MIN_LOCATION_X = pinSize.width / 2;
const MAX_LOCATION_X = 1200 - pinSize.width / 2;
const MIN_LOCATION_Y = 130 + pinSize.height;
const MAX_LOCATION_Y = 630;
const MIN_OFFER_PRICE = 1000;
const MAX_OFFER_PRICE = 20000;
const OFFERS_AMOUNT = 8;

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const pinList = document.querySelector(`.map__pins`);
const pinTamplate = document
  .querySelector(`#pin`)
  .content.querySelector(`.map__pin`);
const cardTemplate = document
  .querySelector(`#card`)
  .content.querySelector(`.map__card`);

// Случайное число
const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Случайное значение из массива
const getRandomElement = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
};

// Массив случайной длинный
const getRandomArray = function (array) {
  let newArrayLength = getRandomNumber(0, array.length - 1);
  let newArray = [];
  for (let i = 0; i <= newArrayLength; i++) {
    newArray.push(array[i]);
  }
  return newArray;
};

// Создаёт DOM-элементы Pin
const renderPin = function (offerOfNearby) {
  let pinElement = pinTamplate.cloneNode(true);

  pinElement.querySelector(`.map__pin img`).src = offerOfNearby.author.avatar;
  pinElement.querySelector(`.map__pin img`).alt = offerOfNearby.offer.title;
  pinElement.style.left = `${offerOfNearby.location.x}px`;
  pinElement.style.top = `${offerOfNearby.location.y}px`;

  return pinElement;
};

const correcttWord = function (number, one, two, many) {
  let n = Math.abs(number) % 100;// Проверка по модулю
  if (n > 4) {
    return many;
  }

  n %= 10;

  if (n === 1) {
    return one;
  }

  if (n > 1 && n < 5) {
    return two;
  }

  return many;
};

// Создаёт DOM-элементы Card
const renderCard = function (offerOfNearby) {
  let cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector(`.popup__title`).textContent =
    offerOfNearby.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent =
    offerOfNearby.offer.address;
  cardElement.querySelector(
      `.popup__text--price`
  ).textContent = `${offerOfNearby.offer.price}₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent =
    OFFER_TYPE[offerOfNearby.offer.type];

  // Меняет окончания слов в зависимости от числа
  const room = offerOfNearby.offer.rooms;
  const guest = offerOfNearby.offer.guests;

  const choosePhrase = `${room} ${correcttWord(room, `комната`, `комнаты`, `комнат`)} для ${guest} ${correcttWord(guest, `гостя`, `гостей`, `гостей`)}`;
  cardElement.querySelector(`.popup__text--capacity`).textContent = choosePhrase;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${offerOfNearby.offer.checkin}, выезд до ${offerOfNearby.offer.checkout}`;
  cardElement.querySelector(`.popup__description`).textContent = offerOfNearby.offer.description;
  cardElement.querySelector(`.popup__avatar`).src = offerOfNearby.author.avatar;

  // Нахдит и очищает список ul
  let cardFeatures = cardTemplate.querySelector(`.popup__features`);
  cardFeatures.innerHTML = ``;

  // Создаёт элементы списка и заполняет список
  for (let j = 0; j < offerOfNearby.offer.features.length; j++) {

    let newFeature = document.createElement(`li`);
    newFeature.classList.add(
        `popup__feature`,
        `popup__feature--${offerOfNearby.offer.features[j]}`
    );
    cardFeatures.appendChild(newFeature);
  }

  // Нахдит oчищает div
  const cardPhotos = cardElement.querySelector(`.popup__photos`);
  cardPhotos.innerHTML = ``;

  // Создаёт элементы img и заполняет src из массива
  for (let j = 0; j < offerOfNearby.offer.photos.length; j++) {
    let newPhotos = document.createElement(`img`);
    newPhotos.classList.add(`popup__photo`);
    newPhotos.setAttribute(`src`, offerOfNearby.offer.photos[j]);
    newPhotos.setAttribute(`alt`, `Фотография жилья`);
    newPhotos.setAttribute(`width`, `45`);
    newPhotos.setAttribute(`height`, `40`);
    cardPhotos.appendChild(newPhotos);
  }
  return cardElement;
};

// // Генерирует объекты
// const fragment = document.createDocumentFragment();
// const cardList = [];
// for (let i = 1; i <= OFFERS_AMOUNT; i++) {
//   const offerOfNearby = {
//     author: {
//       avatar: `img/avatars/user0${i}.png`,
//     },
//     offer: {
//       title: getRandomElement(OFFER_TITLE),
//       address: getRandomElement(OFFER_ADDRESS),
//       price: getRandomNumber(MIN_OFFER_PRICE, MAX_OFFER_PRICE),
//       type: getRandomElement(OFFER_TYPE),
//       rooms: getRandomNumber(1, OFFER_ROOMS.length),
//       guests: getRandomNumber(1, OFFER_GUESTS.length),
//       checkin: getRandomElement(OFFER_CHECKIN),
//       checkout: getRandomElement(OFFER_CHECKOUT),
//       features: getRandomArray(OFFER_FEATURES),
//       description: getRandomElement(OFFER_DESCRIPTION),
//       photos: getRandomArray(OFFER_PHOTOS),
//     },
//     location: {
//       x: getRandomNumber(MIN_LOCATION_X, MAX_LOCATION_X),
//       y: getRandomNumber(MIN_LOCATION_Y, MAX_LOCATION_Y),
//     },
//   };

//   cardList.push(offerOfNearby);
//   fragment.appendChild(renderPin(offerOfNearby));
// }
// fragment.appendChild(renderCard(cardList[0]));

// // Добавляет фрагменты на страницу
// pinList.appendChild(fragment);


// 4.1
const adForm = document.querySelector(`.ad-form`);
const mapPin = document.querySelector(`.map__pin--main`);
const mapFilters = document.querySelector(`.map__filters`);

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
const LEFT_MAP_PIN = mapPin.offsetLeft + WIDTH_MAIN_PIN / 2;
const TOP_MAP_PIN = mapPin.offsetTop + HEIGHT_MAIN_PIN / 2;

// Записывает данные координат в форму объявления
adForm.querySelector(`#address`).setAttribute(`value`, LEFT_MAP_PIN + `, ` + TOP_MAP_PIN);

// Функция активации
const activatePage = function () {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  mapFilters.classList.remove(`ad-form--disabled`);
  for (let i = 0; i < adForm.length; i++) {
    adForm[i].removeAttribute(`disabled`);
  }
  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].removeAttribute(`disabled`);
  }
}

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

const titleForm = document.querySelector(`#title`);
const priceForm = document.querySelector(`#price`);
const addressForm = document.querySelector(`#address`);
const typeOfHouseForm = document.querySelector(`#type`);
const timeInForm = document.querySelector(`#timein`);
const timeOutForm = document.querySelector(`#timeout`);
const formRoomNumber = adForm.querySelector(`#room_number`);
const formGuestNumber = adForm.querySelector(`#capacity`);

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

// Зависимость количества гостей от количества комнат
const validateRoomCapacity = function (evt) {
  var rooms = parseInt(formRoomNumber.value, 10);
  var guests = parseInt(formGuestNumber.value, 10);

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
