class Card {
  constructor({data, handleCardClick}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
  }

  _getTemplate() { //Задача метода _getTemplate — вернуть разметку карточки через return.
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._cardSelector) 
      .content
      .querySelector(".element")
      .cloneNode(true);

    // вернём DOM-элемент карточки 
    return cardElement;
    }

    generateCard() {
      // Запишем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
      this._element = this._getTemplate();
       
      this._elementName = this._element.querySelector(".element__name");
      this._elementFoto = this._element.querySelector(".element__foto");
      this._setEventListeners(); // добавим обработчики
       // Добавим данные
      this._elementName.textContent = this._name; // название места из массива
      this._elementFoto.src = this._link; // ссылка из массива
      this._elementFoto.alt = this._name; // alt
      
      // Вернём элемент наружу
      return this._element;
    }

    //слушатели событий карточки
    //лучше сразу создать отдельный метод _setEventListeners, чтобы не засорять код в generateCard
    _setEventListeners() {
      // для удаления
      this._element.querySelector(".element__delete").addEventListener("click", () => {
        this._delitCard();
      });
      // для лайка 
      this._element.querySelector(".element__like").addEventListener("click", () => {
        this._likeToggle();
      });
      // для открытия
      this._elementFoto.addEventListener("click", () => {
        this.handleCardClick(); 
      });
    }

    // функция удаления
    _delitCard() {
      this._element.remove();
      this._element.innerHTML = null;
    }

    // функция лайка
    _likeToggle () {  
      this._element.querySelector(".element__like").classList.toggle("element__like_black");
    }
  }

export {Card};

