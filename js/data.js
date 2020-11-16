"use strict";

(function () {
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

  const cardList = [];

  const getData = () => {
    // Генерирует объекты
    for (let i = 0; i < OFFERS_AMOUNT; i++) {
      const offerOfNearby = {
        author: {
          avatar: `img/avatars/user0${i + 1}.png`,
        },
        offer: {
          title: window.utils.getRandomElement(OFFER_TITLE),
          address: window.utils.getRandomElement(OFFER_ADDRESS),
          price: window.utils.getRandomNumber(MIN_OFFER_PRICE, MAX_OFFER_PRICE),
          type: window.utils.getRandomElement(OFFER_TYPE),
          rooms: window.utils.getRandomNumber(1, 10),
          guests: window.utils.getRandomNumber(1, 10),
          checkin: window.utils.getRandomElement(OFFER_CHECKIN),
          checkout: window.utils.getRandomElement(OFFER_CHECKOUT),
          features: window.utils.getRandomArray(OFFER_FEATURES),
          description: window.utils.getRandomElement(OFFER_DESCRIPTION),
          photos: window.utils.getRandomArray(OFFER_PHOTOS),
        },
        location: {
          x: window.utils.getRandomNumber(MIN_LOCATION_X, MAX_LOCATION_X),
          y: window.utils.getRandomNumber(MIN_LOCATION_Y, MAX_LOCATION_Y),
        },
      };

      cardList.push(offerOfNearby);
    }
  };

  window.data = {
    cardList,
    OFFER_TYPE,
    getData
  };

})();
