'use strict';

(function () {
  var IMAGE_OFFSET = 7;
  var PIN_GAP = 22;
  var capacity = document.querySelector('#capacity');
  var adType = document.querySelector('#type');
  var adPrice = document.querySelector('#price');

  window.form = {
    formAddress: document.querySelector('#address'),
    adFields: document.querySelectorAll('.ad-form fieldset'),
    adForm: document.querySelector('.ad-form'),
    checkIn: document.querySelector('#timein'),
    checkOut: document.querySelector('#timeout'),
    roomNumber: document.querySelector('#room_number'),


    // Установка координат основной метки
    setFormAddress: function (addr, pin, location) {
      var x = Math.floor(window.map.mainPin.offsetLeft + window.map.mainPin.offsetWidth / 2);
      var y = Math.floor(window.map.mainPin.offsetTop + window.map.mainPin.offsetHeight / 2);

      if (location.classList.contains('map--faded')) {
        addr.value = x + ', ' + y;
      } else {
        y = Math.floor(y + (window.map.mainPin.offsetHeight / 2) + PIN_GAP - IMAGE_OFFSET);

        addr.value = x + ', ' + y;
      }
    },

    //  Обработчики событий
    mainPinMouseDownHandler: function (e) {
      e.preventDefault();

      var startCoords = {
        x: e.clientX,
        y: e.clientY
      };

      var onMouseMove = function (eMove) {
        e.preventDefault();

        var shift = {
          x: startCoords.x - eMove.clientX,
          y: startCoords.y - eMove.clientY
        };
        startCoords = {
          x: eMove.clientX,
          y: eMove.clientY
        };

        window.map.mainPin.style.top = (window.map.mainPin.offsetTop - shift.y) + 'px';
        window.map.mainPin.style.left = (window.map.mainPin.offsetLeft - shift.x) + 'px';

        if (parseInt(window.map.mainPin.style.top, 10) < 0) {
          window.map.mainPin.style.top = 0 + 'px';
        } else if (parseInt(window.map.mainPin.style.top, 10) > (window.map.mapElement.clientHeight - window.map.mainPin.scrollHeight)) {
          window.map.mainPin.style.top = (window.map.mapElement.clientHeight - window.map.mainPin.scrollHeight) + 'px';
        }

        if (parseInt(window.map.mainPin.style.left, 10) < 0) {
          window.map.mainPin.style.left = 0 + 'px';
        } else if (parseInt(window.map.mainPin.style.left, 10) > (window.map.mapElement.clientWidth - window.map.mainPin.scrollWidth)) {
          window.map.mainPin.style.left = (window.map.mapElement.clientWidth - window.map.mainPin.scrollWidth) + 'px';
        }

        window.form.setFormAddress(window.form.formAddress, window.map.mainPin, window.map.mapElement);
      };

      var onMouseUp = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },

    formChangeHandler: function () {
      setAppartmentType();
    },

    checkInChangeHandler: function () {
      if (window.form.checkOut.selectedIndex !== window.form.checkIn.selectedIndex) {
        window.form.checkOut.selectedIndex = window.form.checkIn.selectedIndex;
      }
    },

    checkOutChangeHandler: function () {
      if (window.form.checkIn.selectedIndex !== window.form.checkOut.selectedIndex) {
        window.form.checkIn.selectedIndex = window.form.checkOut.selectedIndex;
      }
    },

    roomNumberChangeHandler: function () {
      setRoomCapacity();
    }
  };

  // Установка количества гостей в зависимости от количества комнат
  var setRoomCapacity = function () {
    var selectedRoom = window.form.roomNumber.options[window.form.roomNumber.selectedIndex];

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

  // Начальная настройка формы
  window.util.disableElements(window.form.adFields);
  setAppartmentType();
  setRoomCapacity();
})();
