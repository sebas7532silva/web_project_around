// Funcion para cambiar el active
function change_to_active() {
    this.classList.toggle("active")
};

// Funcion para mostrar el popup
function show_popup(item) {
    item.style.display = 'flex';
}

// Funcion para esconder el popup
function hide_popup(item) {
    item.style.display = 'none';
}
  

// Obtenemos todos los botones de like
let buttons = document.querySelectorAll(".places__card-button");

// Loop para irse por cada botón
buttons.forEach(button => {
    button.addEventListener("click", change_to_active)
    }
);

// Obtenemos los botones para cerrar y abrir el popup
let button_edit = document.querySelector(".header__author-edit");
let popup = document.querySelector(".header__popup");
let close_popup = document.querySelector(".form__closure");

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
    let name = nameInput.value;
    let job = jobInput.value;

    // Selecciona los elementos donde se introducirán los valores de los campos
    let current_name = document.querySelector(".header__author-name");
    let current_job = document.querySelector(".header__author-about");

    // Inserta nuevos valores utilizando el textContent
    current_name.textContent = name;
    current_job.textContent = job;

    // Limpia los campos del formulario
    nameInput.value = '';
    jobInput.value = '';
}

// Conecta el manipulador (handler) al formulario:
// se observará el evento de entrega
formElement.addEventListener('submit', handleProfileFormSubmit);