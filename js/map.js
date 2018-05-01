'use strict';

var COUNT_ADS = 8;
var IMAGE_OFFSET = 7;
var PIN_GAP = 22;
var adData = {
  titles: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  types: ['palace', 'flat', 'house', 'bungalo'],
  checkin: ['12:00', '13:00', '14:00'],
  checkout: ['12:00', '13:00', '14:00'],
  photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  avatars: ['01', '02', '03', '04', '05', '06', '07', '08'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
};

var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var adFields = document.querySelectorAll('.ad-form fieldset');
var mainPin = document.querySelector('.map__pin--main');
var formAddress = document.querySelector('#address');
var adType = document.querySelector('#type');
var adPrice = document.querySelector('#price');
var checkIn = document.querySelector('#timein');
var checkOut = document.querySelector('#timeout');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');


// Карта и поля формы находятся в неактивном режиме

var disableElements = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].disabled = true;
  }
};

disableElements(adFields);

// Функция для случайного числа (включая max)
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};

// Случайная сортировка массивов
var sortRandomArray = function (arr) {
  function compareRandom() {
    return Math.random() - 0.5;
  }
  return arr.sort(compareRandom);
};

// Функция для рандомного индекса
var getRandomIndex = function (arr) {
  var index = getRandomNumber(0, arr.length);
  return index;
};

//  Функция перевода типа
var translateType = function (type) {
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
};

// Функция генерации случайного массива
var generateRandomArray = function (array) {
  var randomArray = [];
  randomArray = array.slice(0);
  sortRandomArray(randomArray);

  randomArray.length = getRandomNumber(0, randomArray.length + 1);

  return randomArray;
};

// Функция создания объявлений
var createAds = function (data, maxAds) {
  var ads = [];

  sortRandomArray(data.avatars);
  sortRandomArray(data.titles);
  sortRandomArray(data.photos);


  for (var i = 0; i < maxAds; i++) {
    var ad = {
      'author': {
        'avatar': 'img/avatars/user' + data.avatars[i] + '.png'
      },
      'location': {
        'x': getRandomNumber(300, 900),
        'y': getRandomNumber(150, 500),
      },
      'offer': {
        'title': data.titles[i],
        'price': getRandomNumber(1000, 1000000),
        'type': data.types[getRandomIndex(data.types)],
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 5),
        'checkin': data.checkin[getRandomIndex(data.checkin)],
        'checkout': data.checkout[getRandomIndex(data.checkout)],
        'features': generateRandomArray(data.features),
        'description': '',
        'photos': data.photos
      },
    };
    ad.offer.address = ad.location.x + ', ' + ad.location.y;
    ads.push(ad);
  }

  return ads;
};

var adCollection = createAds(adData, COUNT_ADS);

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

// Рендер списка меток
var displayPinList = function (data, location) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(createPin(data[i]));
  }
  location.appendChild(fragment);
};

// Создание элементов features
var createFeatureElements = function (array) {
  var fragment = document.createDocumentFragment();
  var featureElement;
  for (var i = 0; i < array.length; i++) {
    featureElement = document.createElement('li');
    featureElement.className = 'popup__feature popup__feature--' + array[i];
    fragment.appendChild(featureElement);
  }

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
  card.querySelector('.popup__type').textContent = translateType(ad.offer.type);
  card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  card.querySelector('.popup__features').innerHTML = '';
  card.querySelector('.popup__features').appendChild(createFeatureElements(ad.offer.features));
  card.querySelector('.popup__description').textContent = ad.offer.description;
  card.querySelector('.popup__photos').innerHTML = '';
  card.querySelector('.popup__photos').appendChild(createPhotoElements(ad.offer.photos));
  card.querySelector('.popup__avatar').src = ad.author.avatar;

  card.querySelector('.popup__close').addEventListener('click', function () {
    location.removeChild(card);
  });

  return card;
};

// Очищение карты от карточек
var removeCards = function (location) {
  var cards = location.querySelectorAll('.map__card');
  for (var i = cards.length - 1; i >= 0; i--) {
    location.removeChild(cards[i]);
  }
};

// Установка координат основной метки
var setFormAddress = function (addr, pin, location) {
  var x = Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2);
  var y = Math.floor(mainPin.offsetTop + mainPin.offsetHeight / 2);

  if (location.classList.contains('map--faded')) {
    addr.value = x + ', ' + y;
  } else {
    y = Math.floor(y + (mainPin.offsetHeight / 2) + PIN_GAP - IMAGE_OFFSET);

    addr.value = x + ', ' + y;
  }
};

// Активация карты
var activateMap = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  for (var i = 0; i < adFields.length; i++) {
    adFields[i].disabled = false;
  }

  setFormAddress(formAddress, mainPin, map);
  displayPinList(adCollection, map);
};

// Рендер карточки
var displayCard = function (card, location) {
  var fragment = document.createDocumentFragment();
  var cardContainer = document.querySelector('.map__filters-container');

  fragment.appendChild(createCard(card, map));

  location.insertBefore(fragment, cardContainer);
};

// Установка типа аппартаментов
var setAppartmentType = function () {
  var selectedTypeValue = adType.options[adType.selectedIndex].value;

  switch (selectedTypeValue) {
    case 'bungalo':
      adPrice.min = 0;
      adPrice.placeholder = '0';
      break;
    case 'flat':
      adPrice.min = 1000;
      adPrice.placeholder = '1000';
      break;
    case 'house':
      adPrice.min = 5000;
      adPrice.placeholder = '5000';
      break;
    case 'palace':
      adPrice.min = 10000;
      adPrice.placeholder = '10000';
      break;
  }
};

// Установка количества гостей в зависимости от количества комнат
var setRoomCapacity = function () {
  var selectedRoom = roomNumber.options[roomNumber.selectedIndex];
  for (var i = 0; i < capacity.options.length; i++) {
    var option = capacity.options[i];
    if (selectedRoom.value >= option.value && option.value !== '0' && selectedRoom.value !== '100') {
      option.style.display = 'block';
      option.selected = true;
    } else if (selectedRoom.value === '100' && option.value === '0') {
      option.style.display = 'block';
      option.selected = true;
    } else {
      option.style.display = 'none';
    }
  }
};

// Обработчики событий

var adPinClickHandler = function (ad) {
  removeCards(map);
  displayCard(ad, map);
};

var formChangeHandler = function () {
  setAppartmentType();
  setRoomCapacity();
};

var checkInChangeHandler = function () {
  if (checkOut.selectedIndex !== checkIn.selectedIndex) {
    checkOut.selectedIndex = checkIn.selectedIndex;
  }
};

var checkOutChangeHandler = function () {
  if (checkIn.selectedIndex !== checkOut.selectedIndex) {
    checkIn.selectedIndex = checkOut.selectedIndex;
  }
};


//  Перемещение метки
mainPin.addEventListener('mousedown', function (evt) {
  activateMap();
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    if (parseInt(mainPin.style.top, 10) < 0) {
      mainPin.style.top = 0 + 'px';
    } else if (parseInt(mainPin.style.top, 10) > map.clientHeight - mainPin.scrollHeight) {
      mainPin.style.top = map.clientHeight - mainPin.scrollHeight + 'px';
    }
    if (parseInt(mainPin.style.left, 10) < 0) {
      mainPin.style.left = 0 + 'px';
    } else if (parseInt(mainPin.style.left, 10) > map.clientWidth - mainPin.scrollWidth) {
      mainPin.style.left = map.clientWidth - mainPin.scrollWidth + 'px';
    }

    setFormAddress(formAddress, mainPin, map);
  };
  var onMouseUp = function () {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

setFormAddress(formAddress, mainPin, map);
adForm.addEventListener('change', formChangeHandler);
checkIn.addEventListener('change', checkInChangeHandler);
checkOut.addEventListener('change', checkOutChangeHandler);
setRoomCapacity();
