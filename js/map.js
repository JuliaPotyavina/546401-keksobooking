'use strict';
var COUNT_ADS = 8;
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var avatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Функция для случайного числа
var getRandomNumber = function(min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

// Случайная сортировка массивов
var sortRandomArray = function(arr) {
  function compareRandom() {
    return Math.random() - 0.5;
  };
  return arr.sort(compareRandom);
};

sortRandomArray(avatars);
sortRandomArray(titles);
sortRandomArray(features);
sortRandomArray(photos);

// Функция для рандомного индекса
var getRandomIndex = function(arr) {
  var index = getRandomNumber(0, arr.length);
  return index;
};

//  Функция перевода типа
var translateType = function(type) {
  switch(type) {
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
};


// Функция создания объявлений
var createAds = function(maxAds) {
  var ads = [];
  var featuresList = [];
  var randomNumber = getRandomNumber(0, features.length);
  for (var i = 0; i < randomNumber; i++) {
    featuresList.push(features[i]);
  }
  for (var i = 0; i < maxAds; i++) {
    var ad = {
      'author': {
        'avatar': 'img/avatars/user' + avatars[i] + '.png'
      },
      'location': {
        'x': getRandomNumber(300, 900),
        'y': getRandomNumber(150, 500),
      },
      'offer': {
        'title': titles[i],
        'price': getRandomNumber(1000, 1000000),
        'type': types[getRandomIndex(types)],
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 5),
        'checkin': checkin[getRandomIndex(checkin)],
        'checkout': checkout[getRandomIndex(checkout)],
        'features': featuresList,
        'description': '',
        'photos': photos
      },
    };
    ad.offer.address = ad.location.x + ', ' + ad.location.y;

    ads.push(ad);
  }
  return ads;
};

var adCollection = createAds(COUNT_ADS);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Шаблон меток
var  adsPin = document.querySelector('template').content.querySelector('.map__pin');

// Создание метки
var renderPin = function(ads, i) {
  var pin = adsPin.cloneNode(true);
  pin.querySelector('img').src = ads[i].author.avatar;
  pin.querySelector('img').alt = ads[i].offer.title;
  pin.style.left = ads[i].location.x - pin.style.width / 2 + 'px';
  pin.style.top = ads[i].location.y - pin.style.height + 'px';

  return pin;
};

var displayPinList = function() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adCollection.length; i++) {
    fragment.appendChild(renderPin(adCollection, i));
  }
  map.appendChild(fragment);
};

// Шаблон окон объявлений
var adsCard = document.querySelector('template').content.querySelector('.map__card');

// Создание элементов features
var createFeatureElements = function(features) {
  var fragment = document.createDocumentFragment();
  var featureElement;
  for (var i = 0; i < features.length; i++) {
    featureElement = document.createElement('li');
    featureElement.className = 'popup__feature popup__feature--' + features[i];
    fragment.appendChild(featureElement);
  }
  return fragment;
};

var createPhotoElements = function(photos) {
  var fragment = document.createDocumentFragment();
  var photoElement;
  for (var i = 0; i < photos.length; i++) {
    photoElement = document.createElement('img');
    photoElement.classList.add('popup__photo');
    photoElement.width = '45';
    photoElement.height = '40';
    photoElement.src = photos[i];
    fragment.appendChild(photoElement);
  }
  return fragment;
};

var renderCard = function(ads, i) {
  var card = adsCard.cloneNode(true);
  card.querySelector('.popup__title').textContent = ads[i].offer.title;
  card.querySelector('.popup__text--address').textContent = ads[i].offer.address;
  card.querySelector('.popup__text--price').textContent = ads[i].offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = translateType(ads[i].offer.type);
  card.querySelector('.popup__text--capacity').textContent = ads[i].offer.rooms + ' комнаты для ' + ads[i].offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads[i].offer.checkin + ', выезд до ' + ads[i].offer.checkout;
  card.querySelector('.popup__features').innerHTML = '';
  card.querySelector('.popup__features').appendChild(createFeatureElements(ads[i].offer.features));
  card.querySelector('.popup__description').textContent = ads[i].offer.description;
  card.querySelector('.popup__photos').innerHTML = '';
  card.querySelector('.popup__photos').appendChild(createPhotoElements(ads[i].offer.photos));
  card.querySelector('.popup__avatar').src = ads[i].author.avatar;
  return card;
};

var displayCardList = function() {
  var fragment = document.createDocumentFragment();
  var cardContainer = document.querySelector('.map__filters-container');
  for (var i = 0; i < adCollection.length; i++) {
    fragment.appendChild(renderCard(adCollection, i));
  }
  map.insertBefore(fragment, cardContainer);
};

displayPinList();
displayCardList();


