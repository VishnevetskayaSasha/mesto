//  Класс отвечает за отрисовку элементов на странице.
export class Section {
  constructor ({renderer}, containerSelector) {
    this._renderer = renderer; // функция, которая отвечает за создание и отрисовку данных на странице.
    this._container = containerSelector; //селектор контейнера, в который нужно добавлять созданные элементы.
  }
  // публичный метод, который отвечает за отрисовку всех элементов.
  renderItems(items) {
    items.forEach(item => {
        this._renderer(item);
      });
  }

  //публичный метод, который добавляем element в контейнер для массива
  addItem(element) {
    this._container.append(element); 
  }

  //публичный метод, который добавляем element в контейнер для новых карточек
  addNewItem(element) {
    this._container.prepend(element); 
  }
}