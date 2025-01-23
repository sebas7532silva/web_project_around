const popups = document.querySelectorAll(".popup");
const closePopups = document.querySelectorAll(".popup__close-icon");
const authorForm = document.querySelector("#form-author");
const placesForm = document.querySelector("#form-places");
const buttonEdit = document.querySelector(".header__author-edit");
const buttonEditPlaces = document.querySelector(".header__button");
const forms = document.querySelectorAll("form");

// Función para manejar el envío del formulario author
const updateAuthor = (form) => {
    const inputName = form.querySelector("#name-input").value.trim();
    const inputAbout = form.querySelector("#about-input").value.trim();

    const currentName = document.querySelector(".header__author-name");
    const currentAbout = document.querySelector(".header__author-about");

    currentName.textContent = inputName;
    currentAbout.textContent = inputAbout;
};

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

authorForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    // Aquí procesas los datos, por ejemplo, llamando a updateAuthor
    updateAuthor(authorForm);

    // Reinicia el formulario
    authorForm.reset();

    // Obtén todos los inputs y el botón del formulario
    const inputList = Array.from(authorForm.querySelectorAll(".form__input"));
    const submitButton = authorForm.querySelector(".form__save");

    // Desactiva el botón
    if (submitButton) {
        submitButton.classList.add("form__save_inactive");
        submitButton.disabled = true;
    }

    // Limpia los errores de validación, si aplica
    inputList.forEach((inputElement) => {
        const errorElement = authorForm.querySelector(`#${inputElement.id}-error`);
        if (errorElement) {
            inputElement.classList.remove("form__input_type_error");
            errorElement.textContent = "";
            errorElement.classList.remove("form__input-error");
        }
    });

    hidePopup(document.querySelector(".popup_opened"));
});

placesForm.addEventListener("submit", (evt) =>{
    evt.preventDefault();
    addCard(placesForm);

    placesForm.reset();

    const submitButton = placesForm.querySelector(".form__save");

    // Desactiva el botón
    if (submitButton) {
        submitButton.classList.add("form__save_inactive");
        submitButton.disabled = true;
    }

    hidePopup(document.querySelector(".popup_opened"));

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
});

popups.forEach((popup) => {
    document.addEventListener("keydown", (evt) => {
        if (evt.key === 'Escape') {
            hidePopup(popup);
        }
    })
});