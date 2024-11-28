// Selección de elementos reutilizables
const inputName = document.querySelector(".form__field-name");
const inputAbout = document.querySelector(".form__field-about");
const buttonSave = document.querySelector(".form__save");
const popup = document.querySelector(".header__popup");
const buttonEdit = document.querySelector(".header__author-edit");
const closePopup = document.querySelector(".header__form-closure");
const formElement = document.querySelector(".form");
const buttons = document.querySelectorAll(".places__card-button");
const currentName = document.querySelector(".header__author-name");
const currentJob = document.querySelector(".header__author-about");

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
const showPopup = (element) => {
    element.style.display = 'flex';
};

// Función para esconder un popup
const hidePopup = (element) => {
    element.style.display = 'none';
    resetForm();
};

// Función para manejar el envío del formulario
const handleProfileFormSubmit = (event) => {
    event.preventDefault();

    const name = inputName.value.trim();
    const job = inputAbout.value.trim();

    // Actualizar los datos en el DOM
    currentName.textContent = name;
    currentJob.textContent = job;

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
buttonEdit.addEventListener("click", () => showPopup(popup));
closePopup.addEventListener("click", () => hidePopup(popup));

// Agregar listener al formulario para manejar el submit
formElement.addEventListener("submit", handleProfileFormSubmit);

// Agregar listeners a los inputs para actualizar el botón de guardar
[inputName, inputAbout].forEach((input) => {
    input.addEventListener("input", updateButtonStyle);
});
