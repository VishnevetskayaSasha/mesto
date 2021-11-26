class Card {
  constructor({data, handleCardClick, handleLikeClick, handleDeleteIconClick, userId, handleLikeDelete}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._handleLikeDelete = handleLikeDelete
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
      this._elementLike = this._element.querySelector(".element__like");
      this._eltmentDelete = this._element.querySelector(".element__delete");
      this._elementLikeNum = this._element.querySelector(".element__like-num");

      this._setEventListeners(); // добавим обработчики

       // Добавим данные
      this._elementName.textContent = this._name; // название места из массива
      this._elementFoto.src = this._link; // ссылка из массива
      this._elementFoto.alt = this._name; // alt
      this._elementLikeNum.textContent = this._likes.length; // кол-во лайков 
      this._checkForDeleteCard(); // удаление (отобразится, если пройдет по условиям)
      this._сheckForActiveLike(); // лайк (черный или прозрачный)
      
      // Вернём элемент наружу
      return this._element;
    }

    //слушатели событий карточки
    //лучше сразу создать отдельный метод _setEventListeners, чтобы не засорять код в generateCard
    _setEventListeners() {
      // для удаления
      this._eltmentDelete.addEventListener("click", () => {
        this._handleDeleteIconClick(this._cardId);
      });
      // для лайка 
      this._elementLike.addEventListener("click", () => {
        this._setLikeOnCard();
      });
      // для открытия
      this._elementFoto.addEventListener("click", () => {
        this._handleCardClick(this._name, this._link); 
      });
    }

    _checkForDeleteCard(){ // проверяет отобразится ли кнопка удаления у карточки 
      if (this._ownerId !== this._userId) {   // если id разные, скрыть значенк удаления
        this._eltmentDelete.classList.add("element__delete_invisible")
      } else {
        this._eltmentDelete.classList.remove("element__delete_invisible")
      }
    } 

    _isLiked() {
      return this._likes.some((like) => like._id === this._userId);
    }

    _сheckForActiveLike() {// проверяет каким цветом отображать лайк
      if (this._isLiked()) {
        this._elementLike.classList.add("element__like_black")
      } else {
        this._elementLike.classList.remove("element__like_black");
      }
    }

    // удаление, добавление лайка
    _setLikeOnCard = () => {
      if (this._isLiked()) {
        this._handleLikeDelete(this._cardId);
      } else {
        this._handleLikeClick(this._cardId);
      }
    };

    like = (response) => {
      this._likes = response.likes;
      this._elementLikeNum.textContent = this._likes.length;
      this._elementLike.classList.toggle("element__like_black");
    };
    

    // функция удаления
    deliteCard = () => {
      this._element.remove();
      this._element = null;
    }
}

export {Card};

