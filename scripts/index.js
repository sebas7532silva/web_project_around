// Importaciones
import Card from './Card.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithConfirmation from './PopupWithConfirmation.js';
import Api from './Api.js';

import { forms, buttonEdit, buttonEditPlaces, configs, avatarButton, avatarImage } from './utils.js';

// ===============================
// Configuración de instancias
// ===============================

// Instancia de Api para manejar API requests
const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
        authorization: "5e475ae9-19a8-4ab8-bfe3-d69ffaafd1db",
        "Content-Type": "application/json"
    }
});

// Instancia de UserInfo para manejar la información del usuario
const userInfo = new UserInfo({
    nameSelector: ".header__author-name",
    aboutSelector: ".header__author-about"
});


// Obtener y actualizar la información del usuario
api.getUserInfo()
    .then((userData) => {
        userInfo.setUserInfo({
            name: userData.name,
            about: userData.about
        });

        avatarImage.src = userData.avatar;
    })
    .catch((error) => {
        console.error('Error fetching user info:', error);
    });

// ===============================
// Popups de formularios y confirmación
// ===============================

const avatarPopup = new PopupWithForm("#edit-image", (formData) => {
    return api.updateProfilePicture(formData.url)
        .then((data) => {
            avatarImage.src = data.avatar;
            avatarPopup.close();
        })
        .catch((err) => {
            console.error("Error al actualizar la imagen de perfil:", err);
        });
});

avatarPopup.setEventListeners();


// Instancia de PopupWithForm para editar información del usuario
const popupWithForm = new PopupWithForm('#authorForm', (inputValues) => {
    return api.postUserInfo(inputValues)
        .then((updatedUserData) => {
            userInfo.setUserInfo({
                name: updatedUserData.name,
                about: updatedUserData.about
            });
            popupWithForm.close();
        })
        .catch((error) => {
            console.error('Error updating user info:', error);
        });
});
popupWithForm.setEventListeners();

// Instancia de PopupWithForm para agregar nuevas tarjetas
const popupPlacesForm = new PopupWithForm('#placesForm', (inputValues) => {
    return api.postCard({
        name: inputValues.titulo,
        link: inputValues.url
    })
        .then((newCardData) => {
            const newCard = new Card(
                newCardData.name,
                newCardData.link,
                newCardData._id,
                newCardData.isLiked,
                ".card-template",
                handleCardClick,
                (cardElement, cardId) => popupWithConfirmation.open(cardElement, cardId),
                api
            );

            const element = newCard.generateCard();
            section.addItem(element, true);
            popupPlacesForm.close();
        })
        .catch((error) => {
            console.error('Error posting new card:', error);
        });
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
    items: [], // Cards will be set dynamically
    renderer: (cardData) => {
        const newCard = new Card(
            cardData.name,
            cardData.link,
            cardData._id,
            cardData.isLiked, 
            ".card-template",
            handleCardClick,
            (cardElement, cardId) => popupWithConfirmation.open(cardElement, cardId),
            api
        );
        const element = newCard.generateCard();
        section.addItem(element);
    }
}, ".places");

// Obtener y renderizar tarjetas iniciales
api.getInitialCards()
    .then((cards) => {
        const orderedCards = cards.reverse();
        section.setItems(orderedCards);
        section.renderer(); // Render initial cards
    })
    .catch((error) => {
        console.error('Error fetching initial cards:', error);
    });

// Instancia de PopupWithConfirmation para borrar tarjetas
const popupWithConfirmation = new PopupWithConfirmation(
    '#trashConfirmation',
    (cardElement, cardId) => {
        return api.deleteCard(cardId)
            .then(() => {
                cardElement.remove(); 
                popupWithConfirmation.close(); 
            })
            .catch((error) => {
                console.error('Error deleting card:', error);
            });
    }
);

// Set popup event listeners
popupWithConfirmation.setEventListeners();

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

avatarButton.addEventListener("click", () => {
    avatarPopup.open();
});