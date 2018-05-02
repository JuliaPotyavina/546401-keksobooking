'use strict';

(function() {
	window.util = {
		disableElements: function (elements) {
		  for (var i = 0; i < elements.length; i++) {
		    elements[i].disabled = true;
		  }
		},

		// Функция для случайного числа (включая max)
		getRandomNumber: function (min, max) {
		  return Math.floor(min + Math.random() * (max - min + 1));
		},

		// Случайная сортировка массивов
		sortRandomArray: function (arr) {
		  function compareRandom() {
		    return Math.random() - 0.5;
		  }

		  return arr.sort(compareRandom);
		},

		// Функция для рандомного индекса
		getRandomIndex: function (arr) {
		  var index = window.util.getRandomNumber(0, arr.length);
		  return index;
		},

		//  Функция перевода типа
		translateType: function (type) {
		  switch (type) {
		    case 'palace':
		      return 'Дворец';
		    case 'flat':
		      return 'Квартира';
		    case 'bungalo':
		      return 'Бунгало';
		    case 'house':
		      return 'Дом';
		    default:
		      return type;
		  }
		},

		// Функция генерации случайного массива
		generateRandomArray: function (array) {
		  var randomArray = [];
		  randomArray = array.slice(0);
		  window.util.sortRandomArray(randomArray);

		  randomArray.length = window.util.getRandomNumber(0, randomArray.length + 1);

		  return randomArray;
		}
	};
})();

