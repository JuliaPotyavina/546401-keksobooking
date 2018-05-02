'use strict';

(function () {
  window.map = {
    mapElement: document.querySelector('.map'),
    mainPin: document.querySelector('.map__pin--main'),

    // Активация карты
    activateMap: function () {
      this.mapElement.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');
      for (var i = 0; i < window.form.adFields.length; i++) {
        window.form.adFields[i].disabled = false;
      }

      window.form.setFormAddress(window.form.formAddress, window.map.mainPin, window.map.mapElement);
      window.pin.displayPinList(window.data.adCollection, window.map.mapElement);
    },

    // Очищение карты от карточек
    removeCards: function (location) {
      var cards = location.querySelectorAll('.map__card');
      for (var i = cards.length - 1; i >= 0; i--) {
        location.removeChild(cards[i]);
      }
    }
  };

  // Добавление обработчиков на страницу
  window.map.mainPin.addEventListener('mousedown', function (e) {
    window.map.activateMap();
    window.form.mainPinMouseDownHandler(e);
  });
  window.form.adForm.addEventListener('change', window.form.formChangeHandler);
  window.form.checkIn.addEventListener('change', window.form.checkInChangeHandler);
  window.form.checkOut.addEventListener('change', window.form.checkOutChangeHandler);
  window.form.roomNumber.addEventListener('change', window.form.roomNumberChangeHandler);

  window.form.setFormAddress(window.form.formAddress, window.map.mainPin, window.map.mapElement);
})();
