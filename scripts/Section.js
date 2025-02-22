export default class Section {
  constructor({ items, renderer }, containerSelector) {
      this._items = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
  }

  // Método para renderizar los elementos
  renderer() {
      this._items.forEach((item) => this._renderer(item));
  }

  // Método para agregar un elemento al contenedor
  addItem(element) {
      this._container.prepend(element);
  }

  setItems(items) {
    this._items = items;
}
}