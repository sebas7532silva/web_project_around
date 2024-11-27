// Funcion para cambiar el active
function change_to_active() {
    this.classList.toggle("active")
};

// Botones de input
let input_name = document.querySelector(".form__field-name");
let input_about = document.querySelector(".form__field-about");

// Obtener el botón de guardar información
let buttonSave = document.querySelector(".form__save");

function reset_form() {
    input_name.value = ''; // Clear the name input
    input_about.value = ''; // Clear the about input
    // Reset the button styles after submission
    buttonSave.style.color = "rgba(196, 196, 196, 1)";
    buttonSave.style.border = "1px solid rgba(196, 196, 196, 1)";
    buttonSave.style.backgroundColor = "transparent";
}

// Funcion para mostrar el popup
function show_popup(item) {
    item.style.display = 'flex';
}

// Funcion para esconder el popup
function hide_popup(item) {
    item.style.display = 'none';
    reset_form();
}
  

// Obtenemos todos los botones de like
let buttons = document.querySelectorAll(".places__card-button");

// Loop para irse por cada botón
buttons.forEach(button => {
    button.addEventListener("click", change_to_active);
    }
);

// Obtenemos los botones para cerrar y abrir el popup
let button_edit = document.querySelector(".header__author-edit");
let popup = document.querySelector(".header__popup");
let close_popup = document.querySelector(".header__form-closure");

console.log(popup);

// Añadimos el EventListener
button_edit.addEventListener("click", () => show_popup(popup));
close_popup.addEventListener("click", () => hide_popup(popup));

// Código para guardar los parametros del formulario
let formElement = document.querySelector(".form");

function handleProfileFormSubmit(evt) {

    evt.preventDefault();
    // Una vez hecho esto, podemos definir nuestra propia forma de entregar el formulario.
    // Lo explicaremos todo con más detalle después.

    // Busquemos los campos del formulario en el DOM
    let nameInput = document.querySelector(".form__field-name");
    let jobInput = document.querySelector(".form__field-about");

    // Obtén los valores de cada campo desde la propiedad de valor correspondiente
    let name = nameInput.value.trim();
    let job = jobInput.value.trim();

    // Selecciona los elementos donde se introducirán los valores de los campos
    let current_name = document.querySelector(".header__author-name");
    let current_job = document.querySelector(".header__author-about");

    // Inserta nuevos valores utilizando el textContent
    current_name.textContent = name;
    current_job.textContent = job;

    // Limpia los campos del formulario
    nameInput.value = '';
    jobInput.value = '';

    // Reset the button styles after submission
    buttonSave.style.color = "rgba(196, 196, 196, 1)";
    buttonSave.style.border = "1px solid rgba(196, 196, 196, 1)";
    buttonSave.style.backgroundColor = "transparent";
}

function updateButtonStyle() {
    let nameInput = document.querySelector(".form__field-name");
    let jobInput = document.querySelector(".form__field-about");
    let buttonSave = document.querySelector(".form__save");

    if (nameInput.value.trim() || jobInput.value.trim()) {
        buttonSave.style.color = "white";
        buttonSave.style.border = "none";
        buttonSave.style.backgroundColor = "black";
        buttonSave.classList.add("dynamic");
    } else {
        buttonSave.style.color = "";
        buttonSave.style.border = "";
        buttonSave.style.backgroundColor = "";
        buttonSave.classList.remove("dynamic");
    }
}

// Conecta el manipulador (handler) al formulario:
// se observará el evento de entrega
formElement.addEventListener('submit', handleProfileFormSubmit);

// Cambiar el botón de guardar dinámicamente
input_name.addEventListener("input", updateButtonStyle);
input_about.addEventListener("input", updateButtonStyle);