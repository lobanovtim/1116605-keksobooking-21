"use strict";

(function () {

  const pinList = document.querySelector(`.map__pins`);
  const pinTamplate = document
    .querySelector(`#pin`)
    .content.querySelector(`.map__pin`);

  // Создаёт DOM-элементы Pin
  const renderPin = function (offerOfNearby, id) {
    let pinElement = pinTamplate.cloneNode(true);

    pinElement.querySelector(`.map__pin img`).src = offerOfNearby.author.avatar;
    pinElement.querySelector(`.map__pin img`).alt = offerOfNearby.offer.title;
    pinElement.style.left = `${offerOfNearby.location.x}px`;
    pinElement.style.top = `${offerOfNearby.location.y}px`;

    pinElement.dataset.id = id;

    return pinElement;
  };

  const renderPins = (cards) => {
    window.network.getData(function(cards){
    const fragment = document.createDocumentFragment();
    cards.forEach((item, index) => {
      fragment.appendChild(renderPin(item, index));
    });
    pinList.appendChild(fragment);
  }, function() {});
  };

  // Добавляет/удаляет карточку
  pinList.addEventListener(`click`, (evt) => {
    const target = evt.target;
    const targetCard = pinList.querySelector(`.map__card`);
    const targetPin = target.closest(`.map__pin`);
    if (target.classList.contains(`popup__close`)) {
      targetCard.remove();
      return;
    }
    if (targetPin && targetPin.dataset.id) {
      if (targetCard) {
        targetCard.remove();
      }
      pinList.appendChild(window.card.renderCard(window.data.cardList[targetPin.dataset.id]));
    }
  });

  const removePins = () => {
    const pins = document.querySelectorAll(`.map__pin`);
    pins.forEach(function (item) {
      if (!item.matches(`.map__pin--main`)) {
        item.remove();
      }
    });
  };

  window.pin = {
    renderPins,
    removePins
  };

})();
