import Card from './Card.js'
import FormValidator from './FormValidator.js'

// Selección de elementos reutilizables
const forms = document.querySelectorAll("form");

const placesContainer = document.querySelector(".places");
const configs = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save",
    inactiveButtonClass: "form__save_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error"
  };

// Crear las tarjetas iniciales

const initialCards = [
    {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
    },
    {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
    },
    {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
    },
    {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
    },
    {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
    },
    {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
    }
];

forms.forEach((formElement) => {
    const formValidator = new FormValidator(configs, formElement);
    formValidator.enableValidation();
})

// Añadimos las tarjetas al DOM
initialCards.forEach((cardData) => {
    placesContainer.append(new Card(cardData.name, 
        cardData.link, 
        ".card-template").generateCard());
});