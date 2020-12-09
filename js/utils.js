"use strict";

(function () {

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



  window.utils = {
    getRandomNumber,
    getRandomElement,
    getRandomArray,
  };

})();
