// Selección de elementos reutilizables
const inputName = document.querySelector(".form__field-name");
const inputAbout = document.querySelector(".form__field-about");
const buttonSave = document.querySelector(".form__save");
const popup = document.querySelector("#form_container");
const buttonEdit = document.querySelector(".header__author-edit");
const buttonEditPlaces = document.querySelector(".header__button");
const closePopup = document.querySelector(".header__form-closure");
const formElement = document.querySelector("#form");
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

    return card;
}

function createHiddenCard(cardData) {
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

    return cardHidden;
}

// Añadimos las tarjetas al DOM
initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData);
    const cardElementHidden = createHiddenCard(cardData);
    placesContainer.appendChild(cardElement);
    placesContainer.appendChild(cardElementHidden);
});

// Obtenemos los likes de los botones
const buttons = document.querySelectorAll(".places__card-button");
  

// Función para alternar la clase "active"
const toggleActive = (event) => {
    event.currentTarget.classList.toggle("active");
};

// Función para resetear el formulario
const resetForm = () => {
    inputName.value = '';
    inputAbout.value = '';
    buttonSave.style.color = "rgba(196, 196, 196, 1)";
    buttonSave.style.border = "1px solid rgba(196, 196, 196, 1)";
    buttonSave.style.backgroundColor = "transparent";
};

// Función para mostrar un popup
const showPopup = (element, type) => {
    element.style.display = 'flex';

    if (type === "editAuthor") {
        // Configuración para editar el Autor
        element.querySelector(".form__field-name").placeholder = "Editar perfil";
        element.querySelector(".form__field-about").placeholder = "Nombre";
        element.querySelector(".form__title").textContent = "Acerca de mí";
        element.querySelector(".form__save").textContent = "Guardar";

    } else if (type === "placesAdd") {
        // Configuración para editar los lugares
        element.querySelector(".form__field-name").placeholder = "Título";
        element.querySelector(".form__field-about").placeholder = "Enlace a la imagen";
        element.querySelector(".form__title").textContent = "Nuevo lugar";
        element.querySelector(".form__save").textContent = "Crear";
    }
};

// Función para esconder un popup
const hidePopup = (element) => {
    element.style.display = 'none';
    resetForm();
};

// Función para manejar el envío del formulario
const handleFormSubmit = (event, type) => {
    event.preventDefault();

    if (type === "editAuthor") {
        const name = inputName.value.trim();
        const job = inputAbout.value.trim();

    // Actualizar los datos en el DOM
        currentName.textContent = name;
        currentJob.textContent = job;
    }

    else if (type === "placesAdd") {
        const placeName = inputName.value.trim();
        const placeUrl = inputAbout.value.trim();

        // Creamos el lugar
        const newCard = {
            name: placeName,
            link: placeUrl
        }
        const cardElement = createCard(newCard);
        placesContainer.appendChild(cardElement);
    }

    // Limpiar formulario y cerrar popup
    resetForm();
    hidePopup(popup);
};

// Función para actualizar el estilo del botón de guardar
const updateButtonStyle = () => {
    const isFilled = inputName.value.trim() || inputAbout.value.trim();
    buttonSave.style.color = isFilled ? "white" : "";
    buttonSave.style.border = isFilled ? "none" : "1px solid rgba(196, 196, 196, 1)";
    buttonSave.style.backgroundColor = isFilled ? "black" : "transparent";
    buttonSave.classList.toggle("dynamic", isFilled);
};

// Agregar listeners a los botones de "like"
buttons.forEach((button) => {
    button.addEventListener("click", toggleActive);
});

// Agregar listeners para mostrar y ocultar el popup
buttonEdit.addEventListener("click", () => {
    currentFormType = "editAuthor"; 
    showPopup(popup, currentFormType); 
});
buttonEditPlaces.addEventListener("click", () => {
    currentFormType = "placesAdd";
    showPopup(popup, currentFormType);
});
closePopup.addEventListener("click", () => hidePopup(popup));

// Agregar listener al formulario para manejar el submit
formElement.addEventListener("submit", (event) => {
    handleFormSubmit(event, currentFormType);
});

// Agregar listeners a los inputs para actualizar el botón de guardar
[inputName, inputAbout].forEach((input) => {
    input.addEventListener("input", updateButtonStyle);
});

// Obtenemos los pop ups escondidos y las imagenes
const cardImages = document.querySelectorAll(".places__card-image");
const popups = document.querySelectorAll(".places__hidden-popup");

// Borrar la tarjeta si necesario
const trashButtons = document.querySelectorAll('.places__card-trash');

// Borrar la tarjeta si es necesario
trashButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Se encuentra el padre más cercano
    const card = button.closest('.places__card');
    card.remove();
  });
});

// Agregar listeners a las images para mostrarla en pantalla completa
cardImages.forEach((image, index) => {
    image.addEventListener("click", () => {
      // Abrir el popup correspondiente
      popups[index].style.display = "flex";
    });
  });

// Cerrar el popup correspondiente
popups.forEach((popup) => {
    const closeButton = popup.querySelector(".places__card-closure");
    closeButton.addEventListener("click", () => {
      popup.style.display = "none";
    });
  });