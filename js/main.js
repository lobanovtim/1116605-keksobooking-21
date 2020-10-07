'use strict';

const OFFER_TITLE = `Заголовок объявления`;
const OFFER_ADDRESS = `600, 350`;
const OFFER_TYPE = [`palace`, `flat`, `house`, `bungalow`];
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
  `conditioner`
];
const OFFER_DESCRIPTION = ``;
const OFFER_PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const MIN_LOCATION_X = 0;
const MAX_LOCATION_X = 1200;
const MIN_LOCATION_Y = 130;
const MAX_LOCATION_Y = 630;
const MIN_OFFER_PRICE = 1000;
const MAX_OFFER_PRICE = 20000;
const OFFERS_AMOUNT = 8;

const pinSize = {
  width: 50,
  height: 70
};

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const pinList = document.querySelector(`.map__pins`);
const pinTamplate = document.querySelector(`#pin`)
.content
.querySelector(`.map__pin`);

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

// Создаёт DOM-элементы
const renderPin = function (offerOfNearby) {
  let pinElement = pinTamplate.cloneNode(true);

  pinElement.querySelector(`.map__pin img`).src = offerOfNearby.author.avatar;
  pinElement.querySelector(`.map__pin img`).alt = offerOfNearby.offer.title;
  pinElement.style.left = `${offerOfNearby.location.x - (pinSize.width / 2)}px`;
  pinElement.style.top = `${offerOfNearby.location.y - (pinSize.height / 2)}px`;

  return pinElement;
};

// Генерирует объекты
const fragment = document.createDocumentFragment();
for (let i = 1; i <= OFFERS_AMOUNT; i++) {
  const offerOfNearby = {
    "author": {
      "avatar": `img/avatars/user0${i}.png`
    },
    "offer": {
      "title": OFFER_TITLE,
      "address": OFFER_ADDRESS,
      "price": getRandomNumber(MIN_OFFER_PRICE, MAX_OFFER_PRICE),
      "type": getRandomElement(OFFER_TYPE),
      "rooms": getRandomNumber(0, OFFER_ROOMS.length),
      "guests": getRandomNumber(0, OFFER_GUESTS.length),
      "checkin": getRandomElement(OFFER_CHECKIN),
      "checkout": getRandomElement(OFFER_CHECKOUT),
      "features": getRandomArray(OFFER_FEATURES),
      "description": getRandomElement(OFFER_DESCRIPTION),
      "photos": getRandomArray(OFFER_PHOTOS)
    },
    "location": {
      "x": getRandomNumber(MIN_LOCATION_X, MAX_LOCATION_X),
      "y": getRandomNumber(MIN_LOCATION_Y, MAX_LOCATION_Y)
    }
  };

  fragment.appendChild(renderPin(offerOfNearby));
}

// Добавляет фрагменты на страницу
pinList.appendChild(fragment);
