import Card from './Card.js'
import FormValidator from './FormValidator.js'
import PopupWithForm from './PopupWithForm.js';


import { handleCardClick, handleAuthorFormSubmit, 
    handlePlacesFormSubmit, showPopup, forms, 
    buttonEdit, buttonEditPlaces, placesContainer, configs} from './utils.js'; 


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

const popupWithForm = new PopupWithForm('#authorForm', handleAuthorFormSubmit);
popupWithForm.setEventListeners();

const popupPlacesForm = new PopupWithForm('#placesForm', handlePlacesFormSubmit);
popupPlacesForm.setEventListeners();



initialCards.forEach((cardData) => {
    const newCard = new Card(cardData.name, 
                             cardData.link, 
                             ".card-template", 
                             handleCardClick); 

    const cardElement= newCard.generateCard();

    placesContainer.append(cardElement);
});

// Agregar listeners para mostrar y ocultar el popup
buttonEdit.addEventListener("click", () => {
    showPopup(popupWithForm); 
});

buttonEditPlaces.addEventListener("click", () => {
    showPopup(popupPlacesForm); 
});
