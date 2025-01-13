const enableValidation = ({ 
    formSelector, 
    inputSelector, 
    submitButtonSelector 
}) => {
    const formElement = document.querySelector(formSelector);
    const buttonSave = document.querySelector(submitButtonSelector);

    const showError = (inputElement, errorMessage) => {
        const errorElement = inputElement.nextElementSibling;
        errorElement.textContent = errorMessage;
        inputElement.style.borderBottom = "1px solid rgba(255, 0, 0, 1)";
    };

    const hideError = (inputElement) => {
        const errorElement = inputElement.nextElementSibling;
        errorElement.textContent = "";
        inputElement.style.borderBottom = "1px solid rgba(196, 196, 196, 1)";
    };

    const isValid = (inputElement) => {
        if (!inputElement.validity.valid) {
            showError(inputElement, inputElement.validationMessage);
        } else {
            hideError(inputElement);
        }
    };

    const updateButtonStyle = () => {
        const isFormValid = formElement.checkValidity(); 
        buttonSave.style.color = isFormValid ? "white" : "";
        buttonSave.style.border = isFormValid ? "none" : "1px solid rgba(196, 196, 196, 1)";
        buttonSave.style.backgroundColor = isFormValid ? "black" : "transparent";
        buttonSave.classList.toggle("dynamic", isFormValid);
        buttonSave.disabled = !isFormValid;
    };

    const setEventListeners = () => {
        const inputList = Array.from(formElement.querySelectorAll(inputSelector));

        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                isValid(inputElement);
                updateButtonStyle();  
            });
        });
    };

    setEventListeners();

    formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
    });
}

enableValidation({
    formSelector: "#form",
    inputSelector: ".form__field",
    submitButtonSelector: ".form__save"
});
