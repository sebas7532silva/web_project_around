export default class Card {
    constructor(name, link, templateSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const templateContent = document
            .querySelector(this._templateSelector)
            .content;

        const cardElement = templateContent.querySelector('.places__card').cloneNode(true);
        const popupElement = templateContent.querySelector('.places__hidden-popup').cloneNode(true);

        return { cardElement, popupElement };
    }

    generateCard() {
        const { cardElement, popupElement } = this._getTemplate();
        this._element = cardElement;
        this._popupElement = popupElement;

        this._setEventListeners();

        this._element.querySelector('.places__card-title').textContent = this._name;
        const cardImage = this._element.querySelector('.places__card-image');
        cardImage.src = this._link;
        cardImage.alt = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.places__card-image').addEventListener('click', () => {
            this._handleCardClick(this._name, this._link, this._popupElement);
        });

        this._trash();
        this._like();
    }

    _trash() {
        const trash = this._element.querySelector(".places__card-trash");
        trash.addEventListener("click", () => {
            this._element.remove();
        });
    }

    _like() {
        const like = this._element.querySelector(".places__card-button");
        like.addEventListener("click", () => {
            like.classList.toggle("active");
        });
    }
}
