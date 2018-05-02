'use strict';

(function () {
// Создание метки
  var createPin = function (ad) {
    var adsPin = document.querySelector('template').content.querySelector('.map__pin');
    var pin = adsPin.cloneNode(true);
    pin.querySelector('img').src = ad.author.avatar;
    pin.querySelector('img').alt = ad.offer.title;
    pin.style.left = ad.location.x - pin.style.width / 2 + 'px';
    pin.style.top = ad.location.y - pin.style.height + 'px';

    pin.addEventListener('click', function () {
      adPinClickHandler(ad);
    });

    return pin;
  };

    // Обработчик для метки, вызывающий открытие карточки объявления
  var adPinClickHandler = function (ad) {
    window.map.removeCards(window.map.mapElement);
    window.card.displayCard(ad, window.map.mapElement);
  };

  window.pin = {
    // Рендер списка меток
    displayPinList: function (data, location) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < data.length; i++) {
        fragment.appendChild(createPin(data[i]));
      }
      location.appendChild(fragment);
    }
  };
})();
