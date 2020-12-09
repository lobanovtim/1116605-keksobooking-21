"use strict";

(function () {
  const URL_GET_DATA = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL_SEND_DATA = `https://21.javascript.pages.academy/keksobooking`;
  const STATUSE_CODE = {
    OK: 200
  };
  const TIMEOUT = 10000;


  let sendRequest = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.timeout = TIMEOUT;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === STATUSE_CODE.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Произошла ошибка: ${xhr.status}`);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Превышено вермя ожидания (${xhr.timeout}мс)`);
    });

    return xhr;
  };

  const getData = (onSuccess, onError) => {
    let xhr = sendRequest(onSuccess, onError);
    xhr.open(`GET`, URL_GET_DATA);
    xhr.send();
  };

  const sendData = (data, onSuccess, onError) => {
    let xhr = sendRequest(onSuccess, onError);
    xhr.open(`POST`, URL_SEND_DATA);
    xhr.send(data);
  };

  window.network = {
    sendRequest,
    getData,
    sendData
  }
})();
