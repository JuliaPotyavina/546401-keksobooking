'use strict';

(function() {
  // Создание элементов features
  var createFeatureElements = function (array) {
    var fragment = document.createDocumentFragment();
    var featureElement;
    for (var i = 0; i < array.length; i++) {
      featureElement = document.createElement('li');
      featureElement.className = 'popup__feature popup__feature--' + array[i];
      fragment.appendChild(featureElement);
    }
    console.log(array);
    return fragment;
  };

  // Генерация массива фотографий
  var createPhotoElements = function (array) {
    var fragment = document.createDocumentFragment();
    var photoElement;
    for (var i = 0; i < array.length; i++) {
      photoElement = document.createElement('img');
      photoElement.classList.add('popup__photo');
      photoElement.width = '45';
      photoElement.height = '40';
      photoElement.src = array[i];
      fragment.appendChild(photoElement);
    }

    return fragment;
  };

  // Рендер карточки объявления
  var createCard = function (ad, location) {
    var adsCard = document.querySelector('template').content.querySelector('.map__card');
    var card = adsCard.cloneNode(true);
    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.address;
    card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = window.util.translateType(ad.offer.type);
    card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    card.querySelector('.popup__features').innerHTML = '';
    card.querySelector('.popup__features').appendChild(createFeatureElements(ad.offer.features));
    card.querySelector('.popup__description').textContent = ad.offer.description;
    card.querySelector('.popup__photos').innerHTML = '';
    card.querySelector('.popup__photos').appendChild(createPhotoElements(window.util.sortRandomArray(ad.offer.photos)));
    card.querySelector('.popup__avatar').src = ad.author.avatar;

    card.querySelector('.popup__close').addEventListener('click', function () {
      location.removeChild(card);
    });

    return card;
  };

  window.card = {
    // Рендер карточки
    displayCard: function (card, location) {
      var fragment = document.createDocumentFragment();
      var cardContainer = document.querySelector('.map__filters-container');

      fragment.appendChild(createCard(card, window.map.mapElement));

      location.insertBefore(fragment, cardContainer);
    }
  };
})();
