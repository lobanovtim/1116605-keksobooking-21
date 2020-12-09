"use strict";

(function () {
  const cardTemplate = document
    .querySelector(`#card`)
    .content.querySelector(`.map__card`);

  const correctWord = function (number, one, two, many) {
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
    // window.getData(function(offerOfNearby){
    let cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector(`.popup__title`).textContent =
      offerOfNearby.offer.title;
    cardElement.querySelector(`.popup__text--address`).textContent =
      offerOfNearby.offer.address;
    cardElement.querySelector(`.popup__text--price`).textContent = `${offerOfNearby.offer.price}₽/ночь`;
    cardElement.querySelector(`.popup__type`).textContent = `${offerOfNearby.offer.type}`;

    // Меняет окончания слов в зависимости от числа
    const room = offerOfNearby.offer.rooms;
    const guest = offerOfNearby.offer.guests;

    const choosePhrase = `${room} ${correctWord(room, `комната`, `комнаты`, `комнат`)} для ${guest} ${correctWord(guest, `гостя`, `гостей`, `гостей`)}`;
    cardElement.querySelector(`.popup__text--capacity`).textContent = choosePhrase;
    cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${offerOfNearby.offer.checkin}, выезд до ${offerOfNearby.offer.checkout}`;
    cardElement.querySelector(`.popup__description`).textContent = offerOfNearby.offer.description;
    cardElement.querySelector(`.popup__avatar`).src = offerOfNearby.author.avatar;

    // Нахдит и очищает список ul
    let cardFeatures = cardElement.querySelector(`.popup__features`);
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
  // }, function() {});
  };

  const removeCard = () => {
    const card = document.querySelector(`.map__card`);
    if (card) {
      card.remove();
    }
  };

  window.card = {
    renderCard,
    removeCard
  };
})();
