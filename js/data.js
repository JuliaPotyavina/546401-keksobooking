'use strict';

(function () {
  var COUNT_ADS = 8;
  var adData = {
    titles: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    types: ['palace', 'flat', 'house', 'bungalo'],
    checkin: ['12:00', '13:00', '14:00'],
    checkout: ['12:00', '13:00', '14:00'],
    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    avatars: ['01', '02', '03', '04', '05', '06', '07', '08'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
  };

  // Функция создания объявлений
  var createAds = function (data, maxAds) {
    var ads = [];

    window.util.sortRandomArray(data.avatars);
    window.util.sortRandomArray(data.titles);
    window.util.sortRandomArray(data.photos);


    for (var i = 0; i < maxAds; i++) {
      var ad = {
        'author': {
          'avatar': 'img/avatars/user' + data.avatars[i] + '.png'
        },
        'location': {
          'x': window.util.getRandomNumber(300, 900),
          'y': window.util.getRandomNumber(150, 500),
        },
        'offer': {
          'title': data.titles[i],
          'price': window.util.getRandomNumber(1000, 1000000),
          'type': data.types[window.util.getRandomIndex(data.types)],
          'rooms': window.util.getRandomNumber(1, 5),
          'guests': window.util.getRandomNumber(1, 5),
          'checkin': data.checkin[window.util.getRandomIndex(data.checkin)],
          'checkout': data.checkout[window.util.getRandomIndex(data.checkout)],
          'features': window.util.generateRandomArray(data.features),
          'description': '',
          'photos': data.photos
        },
      };
      ad.offer.address = ad.location.x + ', ' + ad.location.y;
      ads.push(ad);
    }

    return ads;
  };

  window.data = {
    adCollection: createAds(adData, COUNT_ADS)
  };
})();
