export default class Card {
    constructor(text, url, selector) {
        this._text = text;
        this._url = url;
        this._selector = selector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._selector)
            .content
            .cloneNode(true);
        return cardElement;
    }

    _handleOpenPopup() {
        console.log("hola");
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscapeKey);
    }
    
    _handleClosePopup() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscapeKey);
    }
    
    // Function to handle the Escape key press
    _handleEscapeKey = (evt) => {
        if (evt.key === 'Escape') {
            if (this._popup.classList.contains('popup_opened')) {
                this._handleClosePopup();
            }
        }
    };

    _trash() {
        const trash = this._card.querySelector(".places__card-trash");
        trash.addEventListener("click", () => {
            this._card.remove(); // Remove the card
            this._popup.remove(); // Remove the hidden popup
        });
    }

    _like() {
        const like = this._card.querySelector(".places__card-button");
        like.addEventListener("click", () => {
            like.classList.toggle("active");
        });
    }

    _setEventListeners() {
        // Handle popup open/close
        this._card.querySelector(".places__card-image")
                  .addEventListener("click", () => {
            this._handleOpenPopup();
        });
        this._popup.querySelector(".places__card-closure").addEventListener("click", () => {
            this._handleClosePopup();
        });


        this._popup.addEventListener("click", (evt) => { 
            if (evt.target === this._popup) {
                this._handleClosePopup();
            }
        });
        this._trash();
        this._like();
    }

    generateCard() {
        const template = this._getTemplate();

        // Separate the card and popup elements
        this._card = template.querySelector(".places__card");
        this._popup = template.querySelector(".places__hidden-popup");

        // Update card details
        this._card.querySelector(".places__card-image").src = this._url;
        this._card.querySelector(".places__card-image").alt = `Imagen de ${this._text}`;
        this._card.querySelector(".places__card-title").textContent = this._text;

        // Update popup details
        this._popup.querySelector(".places__hidden-image").src = this._url;
        this._popup.querySelector(".places__hidden-image").alt = `Imagen de ${this._text}`;
        this._popup.querySelector(".places__hidden-description").textContent = this._text;

        // Add event listeners
        this._setEventListeners();

        // Return a fragment containing both elements
        const fragment = document.createDocumentFragment();
        fragment.append(this._card, this._popup);

        return fragment;
    }
}

