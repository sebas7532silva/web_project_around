import Card from './Card.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';

// Selección de elementos reutilizables
export const forms = document.querySelectorAll("form");
export const buttonEdit = document.querySelector(".header__author-edit");
export const buttonEditPlaces = document.querySelector(".header__button");
export const placesContainer = document.querySelector(".places");

export const configs = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save",
    inactiveButtonClass: "form__save_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error"
  };

const userInfo = new UserInfo({
    nameSelector: ".header__author-name",
    aboutSelector: ".header__author-about"
});

export const handleAuthorFormSubmit = (inputValues) => {
    userInfo.setUserInfo(inputValues);
};

export const handleCardClick = (title, url, popupElement) => {
    const placesContainer = document.querySelector(".places");
    placesContainer.appendChild(popupElement);
    const popupWithImage = new PopupWithImage(".places__hidden-popup");
    popupWithImage.setEventListeners();
    popupWithImage.open({
        src: url,
        alt: title,
        description: title
      });
    };

export const handlePlacesFormSubmit = (inputValues) => {
    const newCard = new Card(inputValues.titulo, inputValues.url, ".card-template", handleCardClick);
    const element = newCard.generateCard();
    const placesContainer = document.querySelector(".places");
    placesContainer.insertBefore(element, placesContainer.firstChild);
};

// Función para esconder un popup
export const showPopup = (popup) => {
    popup.open();
};



