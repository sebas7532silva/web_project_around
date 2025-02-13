// Importaciones
import Card from './Card.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import PopupWithImage from './PopupWithImage.js';

import { forms, buttonEdit, buttonEditPlaces, configs, initialCards } from './utils.js';

// ===============================
// Configuración de instancias
// ===============================

// Instancia de UserInfo para manejar la información del usuario
const userInfo = new UserInfo({
    nameSelector: ".header__author-name",
    aboutSelector: ".header__author-about"
});

// Instancia de PopupWithForm para editar información del usuario
const popupWithForm = new PopupWithForm('#authorForm', (inputValues) => {
    userInfo.setUserInfo(inputValues);
});
popupWithForm.setEventListeners();

// Instancia de PopupWithForm para agregar nuevas tarjetas
const popupPlacesForm = new PopupWithForm('#placesForm', (inputValues) => {
    const newCard = new Card(
        inputValues.titulo, 
        inputValues.url, 
        ".card-template", 
        handleCardClick
    );
    const element = newCard.generateCard();
    section.addItem(element, true); // Agregar al inicio
});
popupPlacesForm.setEventListeners();

// Instancia de PopupWithImage para mostrar la imagen en un popup
const popupWithImage = new PopupWithImage('.places__hidden-popup');
popupWithImage.setEventListeners();

// ===============================
// Función para manejar clics en tarjetas
// ===============================
const handleCardClick = (title, url) => {
    popupWithImage.open({
        src: url,
        alt: title,
        description: title
    });
};

// ===============================
// Configuración de la sección de tarjetas
// ===============================
const section = new Section({
    items: initialCards,
    renderer: (cardData) => {
        const newCard = new Card(
            cardData.name, 
            cardData.link, 
            ".card-template", 
            handleCardClick
        );
        const element = newCard.generateCard();
        section.addItem(element);
    }
}, ".places");

// Renderizar tarjetas iniciales
section.renderer();

// ===============================
// Validación de formularios
// ===============================
forms.forEach((formElement) => {
    const formValidator = new FormValidator(configs, formElement);
    formValidator.enableValidation();
});

// ===============================
// Listeners de botones principales
// ===============================
buttonEdit.addEventListener("click", () => {
    popupWithForm.open();
});

buttonEditPlaces.addEventListener("click", () => {
    popupPlacesForm.open();
});

