export default class Card {
    constructor(name, link, cardId, isLiked, templateSelector, handleCardClick, handleTrashClick, api) {
        this._name = name;
        this._link = link;
        this._cardId = cardId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
        this._api = api;

        // Initialize default state
        this._isLiked = isLiked;
    }

    _getTemplate() {
        const templateContent = document
            .querySelector(this._templateSelector)
            .content;

        const cardElement = templateContent.querySelector('.places__card').cloneNode(true);

        return cardElement;
    }

    generateCard() {
        const cardElement = this._getTemplate();
        this._element = cardElement;

        // Set up the card content
        this._element.querySelector('.places__card-title').textContent = this._name;
        this._image = this._element.querySelector('.places__card-image');
        this._trashButton = this._element.querySelector('.places__card-trash');
        this._likeButton = this._element.querySelector('.places__card-button');

        this._image.src = this._link;
        this._image.alt = this._name;

        this._toggleLikeState();

        // Add event listeners
        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._trashButton.addEventListener('click', () => {
            this._handleTrashClick(this._element, this._cardId);
        });

        this._image.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });

        this._likeButton.addEventListener('click', () => {
            if (this._isLiked) {
                this._api.deleteLike(this._cardId)
                    .then(() => {
                        this._isLiked = false;
                        this._toggleLikeState();
                    })
                    .catch((err) => console.error('Error removing like:', err));
            } else {
                this._api.addLike(this._cardId)
                    .then(() => {
                        this._isLiked = true;
                        this._toggleLikeState();
                    })
                    .catch((err) => console.error('Error adding like:', err));
            }
        });
    }

    _toggleLikeState() {
        if (this._isLiked) {
            this._likeButton.classList.add("active"); 
        } else {
            this._likeButton.classList.remove("active");
        }
    }
}

