// Selección de elementos reutilizables
const inputName = document.querySelector(".form__field-name");
const inputAbout = document.querySelector(".form__field-about");
const buttonSave = document.querySelector(".form__save");
const popups = document.querySelectorAll(".popup");
const buttonEdit = document.querySelector(".header__author-edit");
const buttonEditPlaces = document.querySelector(".header__button");
const closePopups = document.querySelectorAll(".popup__close-icon");
const forms = document.querySelectorAll("form");
const currentName = document.querySelector(".header__author-name");
const currentJob = document.querySelector(".header__author-about");

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

// Cntenedor de lugares, sección lugares
const placesContainer = document.querySelector(".places");

// Se crea una tarjeta como función
function createCard(cardData) {
    // Se crean las tarjetas
    const card = document.createElement("div");
    card.classList.add("places__card");

    const trash = document.createElement("button");
    trash.classList.add("places__card-trash");

    const trashImage = document.createElement("img");
    trashImage.classList.add("places__card-trash-icon");
    trashImage.src = "./images/trash.svg";
    trashImage.alt = "Trash";

    trash.appendChild(trashImage);

    const img = document.createElement("img");
    img.classList.add("places__card-image");
    img.src = cardData.link;
    img.alt = `${cardData.name}`;
    
    const cardInfo = document.createElement("div");
    cardInfo.classList.add("places__card-info");

    const title = document.createElement("p");
    title.classList.add("places__card-title");
    title.textContent = cardData.name;

    const button = document.createElement("button");
    button.classList.add("places__card-button");

    button.addEventListener("click", () => {
        button.classList.toggle("active");
    });

    const likeImg = document.createElement("img");
    likeImg.src = "./images/like.svg";
    likeImg.alt = "Like";
    likeImg.classList.add("places__card-like");

    // Se pone el like
    button.appendChild(likeImg);
    cardInfo.appendChild(title);
    cardInfo.appendChild(button);

    // Se agrega la imagen del lugar a cada tarjeta
    card.appendChild(trash);
    card.appendChild(img);
    card.appendChild(cardInfo);

    // Se añaden las funciones para la tarjeta nueva
    trash.addEventListener('click', function() {
        // Remove the card
        card.remove();
    });


    const cardHidden = document.createElement("div");
    cardHidden.classList.add("places__hidden-popup");

    const hiddenContainer = document.createElement("div");
    hiddenContainer.classList.add("places__hidden-container");

    const closeHidden = document.createElement("button");
    closeHidden.classList.add("places__card-closure");

    const closeHiddenIcon = document.createElement("img");
    closeHiddenIcon.src = "./images/logo_plus.svg";
    closeHiddenIcon.alt = "Simbolo +";
    closeHiddenIcon.classList.add("places__card-closure-icon");

    closeHidden.appendChild(closeHiddenIcon);

    const hiddenImage = document.createElement("img");
    hiddenImage.src = cardData.link;
    hiddenImage.alt = "Imagen de " + cardData.name;
    hiddenImage.classList.add("places__hidden-image");

    const hiddenImageText = document.createElement("p");
    hiddenImageText.classList.add("places__hidden-description");
    hiddenImageText.textContent = cardData.name;

    hiddenContainer.appendChild(closeHidden);
    hiddenContainer.appendChild(hiddenImage);
    hiddenContainer.appendChild(hiddenImageText);

    cardHidden.appendChild(hiddenContainer);

    img.addEventListener("click", () => {
        cardHidden.style.display = "flex";
    });

    // Cerrar el popup correspondiente
    closeHidden.addEventListener("click", () => {
      cardHidden.style.display = "none";
    });

    return [card, cardHidden];
}

// Añadimos las tarjetas al DOM
initialCards.forEach((cardData) => {
    const [cardElement, cardElementHidden] = createCard(cardData);
    placesContainer.appendChild(cardElement);
    placesContainer.appendChild(cardElementHidden);
});

// Función para esconder un popup
const showPopup = (element) => {
    element.classList.add("popup_opened");
};

// Función para esconder un popup
const hidePopup = (element) => {
    element.classList.remove("popup_opened");
    forms.forEach((form) => form.reset());
};

// Agregar listeners para mostrar y ocultar el popup
buttonEdit.addEventListener("click", () => {
    showPopup(document.querySelector("#authorForm")); 
});

buttonEditPlaces.addEventListener("click", () => {
    showPopup(document.querySelector("#placesForm")); 
});

// Agregar listener de cerrar formulario si se da click en el icono de cerrar
closePopups.forEach((closeIcon) => {
    closeIcon.addEventListener("click", () => {
        hidePopup(document.querySelector(".popup_opened"));
    })
});

// Agregar listener de cerrar el formulario si se da click fuera 
popups.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
        if (evt.target === popup) {
            hidePopup(popup);
            
        }
    })
})

popups.forEach((popup) => {
    document.addEventListener("keydown", (evt) => {
        if (evt.key === 'Escape') {
            hidePopup(popup);
        }
    })
})

const cardPopups = document.querySelectorAll(".places__hidden-popup");

// Agregar listener de cerrar el formulario con ESC
document.addEventListener('keydown', (evt) => {
    cardPopups.forEach((popupElement) => {
        if (evt.key === 'Escape') {
            popupElement.style.display = "none";
          }
    });
  });

cardPopups.forEach((popupElement) => {
    popupElement.addEventListener("click", (evt) => { 
        if (evt.target === popupElement) {
            popupElement.style.display = "none";
        }
    });
});

