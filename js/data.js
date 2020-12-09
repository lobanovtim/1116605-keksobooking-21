"use strict";

(function () {

  const OFFER_TYPE = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`,
  };

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

  const cardList = []

  console.log(cardList);
  window.network.getData(function(offerOfNearby){
    // Генерирует объекты
    for (let i = 0; i < offerOfNearby.length; i++) {
      cardList.push(offerOfNearby[i]);
    };
  }, function() {});


  const errorHandler = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 10; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  }

  window.network.sendRequest(window.getData, errorHandler);

  const getTypeHouse = (type) => {
    OFFER_TYPE.forEach(item = () => {
      if(OFFER_TYPE.type === type) {
        return OFFER_TYPE.type;
      }
    })
  }
  // console.log(getTypeHouse(house))


  window.data = {
    cardList,
    getTypeHouse
  };

})();
