let validator = new Validation();
let dom_references = {};
let isValid = {
    email: false, 
    password: false, 
    pin: false
};


document.addEventListener('DOMContentLoaded', () => {

    initializeDomReferences(); 
    bindAllEventListeners();

});


function initializeDomReferences() {

    dom_references.login_form =  document.querySelector("#login-form");
    dom_references.email_container = document.querySelector("#login-container > #login-form > #email");
    dom_references.email_input_field = dom_references.email_container.querySelector("input");
    dom_references.email_error_text = dom_references.email_container.querySelector("#email-input-error > p");
    dom_references.email_status_icon = dom_references.email_container.querySelector("#email-status-icon");
    dom_references.password_container = dom_references.login_form.querySelector("#password");
    dom_references.password_radio_btn = dom_references.password_container.querySelector("#alphanumeric-radio-btn");
    dom_references.pin_radio_btn = dom_references.password_container.querySelector("#pin-radio-btn");
    dom_references.show_password = dom_references.password_container.querySelector("#show-password");
    dom_references.pin_inputs_container =  dom_references.password_container.querySelector("#pin-inputs-container");
    dom_references.password_input_container = dom_references.password_container.querySelector("#alphanumeric-input-container");
    dom_references.password_input = dom_references.password_input_container.querySelector("input");
    dom_references.pin_inputs = dom_references.password_container.querySelectorAll("#pin-inputs-container  input");
    dom_references.forget_password = dom_references.password_container.querySelector("#forget_password");
    dom_references.invalidCredentials = document.querySelector("#invalid-credentials");
    dom_references.login_btn = dom_references.login_form.querySelector("#login-btn");

}


function bindAllEventListeners() {


    dom_references.email_input_field.addEventListener("focus", function() {
        hideEmailError();
    })
    

    dom_references.email_input_field.addEventListener("input", function() {

        let entered_email = dom_references.email_input_field.value;
        if (!validator.validateEmail(entered_email) && entered_email.length > 0) {
            isValid.email = false;
            validateAndToggleLoginButton();
        }
        else {
            isValid.email = true;
            validateAndToggleLoginButton();
        }
    })


    dom_references.email_input_field.addEventListener('blur', function() {

        if(!isValid.email && dom_references.email_input_field.value.length > 0) {
            showEmailError();
        }
        else {
            hideEmailError();
        }
    });


    dom_references.password_radio_btn.addEventListener("change", showPasswordInputField);


    dom_references.show_password.addEventListener("click", togglePasswordVisibility);


    dom_references.password_input.addEventListener("input", function() {

        if (dom_references.password_input.value.length > 0) {
            isValid.password = true;
            validateAndToggleLoginButton();
        }
        else {
            isValid.password = false;
            validateAndToggleLoginButton();
        }
    })


    dom_references.pin_radio_btn.addEventListener("change", showPinInputField);


    dom_references.pin_inputs.forEach((input, index) => {

        input.addEventListener("keydown", (event) => {

            if(validator.isNumber(event)) {
                showInputTemporarilyAndFocusNextPin(input, index);
                enableLoginButtonOnValidPin();
            }

            else if (event.key === "Backspace"){
                focusPreviousPin(event, input, index);
                enableLoginButtonOnValidPin();
            }
            else {
                hideNonNumbers(event);
            }
        })

    })
    

    dom_references.login_form.addEventListener("submit", function(event) {

        event.preventDefault();

        if (validator.validateCredentials(getAllUserCredentials(), getEnteredEmail(), getEnteredPassword(), getEnteredPin())) {
            showSuccessfulLogin();
        }
        else {
            showLoginError();
        }
    })
}


function showEmailError() {
    dom_references.email_input_field.classList.add("error-border");
    dom_references.email_error_text.classList.add("show");
    dom_references.email_error_text.classList.remove("hide");
}


function hideEmailError() {
    dom_references.email_input_field.classList.remove("error-border");
    dom_references.email_error_text.classList.remove("show");
    dom_references.email_error_text.classList.add("hide");
}


function validateAndToggleLoginButton() {
    if (isValid.email && (isValid.password || isValid.pin)) {
        dom_references.login_btn.disabled = false;
    }
    else {
        dom_references.login_btn.disabled = true;
    }
}


function showPasswordInputField() {
    if (dom_references.password_radio_btn.checked) {
        dom_references.password_input.value = "";
        dom_references.password_input_container.classList.remove("alphanumeric-not-checked");
        dom_references.pin_inputs_container.classList.remove("pin-checked");
        dom_references.forget_password.innerHTML = "Forgot Password?";
        dom_references.password_input.setAttribute('required', 'required');
        dom_references.pin_inputs.forEach((input) => {
            input.removeAttribute('required');
        })
        dom_references.password_input.focus();
        dom_references.password_input.type = "password";
        dom_references.show_password.innerHTML = "visibility";
        isValid.pin = false;
        validateAndToggleLoginButton();
    }
}


function showPinInputField() {
    if (dom_references.pin_radio_btn.checked) {
        dom_references.pin_inputs.forEach((input) => {
            input.value = "";
        })
        dom_references.password_input_container.classList.add("alphanumeric-not-checked");
        dom_references.password_input_container.classList.remove("alphanumeric-checked");
        dom_references.pin_inputs_container.classList.add("pin-checked");
        dom_references.forget_password.innerHTML = "Forgot Pin?";
        dom_references.password_input.removeAttribute('required');
        dom_references.pin_inputs.forEach((input) => {
            input.setAttribute('required', 'required');
        });
        dom_references.pin_inputs[0].focus();
        isValid.password = false;
        validateAndToggleLoginButton();
    }
}


function togglePasswordVisibility() {

    if (dom_references.password_input.type === "password") {
        dom_references.password_input.type = "text";
        dom_references.show_password.innerHTML = "visibility_off"
    }
    else {
        dom_references.password_input.type = "password";
        dom_references.show_password.innerHTML = "visibility"
    }
}


function showInputTemporarilyAndFocusNextPin(input, index) {

    input.type = "text";
    setTimeout(() => {
        if (input.value.length === 1 && index < dom_references.pin_inputs.length - 1) {
            dom_references.pin_inputs[index + 1].focus();
        }
        input.type = "password";
    }, 400);
}


function focusPreviousPin(event, input, index) {

    if (input.value.length === 0 && index > 0) {
        dom_references.pin_inputs[index - 1].focus();
        event.preventDefault();
    }
}


function hideNonNumbers(event) {
    let controlKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    
    if (!controlKeys.includes(event.key)) {
        event.preventDefault();
    }
    
    
}


function enableLoginButtonOnValidPin() {
    setTimeout(() => {
        let entered_pin = getEnteredPin();
        if (entered_pin.length === 6) {
            isValid.pin = true;
            validateAndToggleLoginButton();
        }
        else {
            isValid.pin = false;
            validateAndToggleLoginButton();
        }
    }, 100)
}


function getAllUserCredentials() {
    return JSON.parse(localStorage.getItem("users"));
}


function getEnteredEmail() {
    return dom_references.email_input_field.value;
}


function getEnteredPassword() {
    return dom_references.password_input.value;
}


function getEnteredPin() {
    let loginPin = '';
    dom_references.pin_inputs.forEach(input => {
        loginPin += input.value;
    });
    return loginPin;
}


function showSuccessfulLogin() {
    hideLoginError();
    setTimeout(() => {
        window.alert("welcome");
        dom_references.login_btn.disabled = true; 
    }, 100)
    
    dom_references.email_input_field.value = "";
    dom_references.password_input.value = "";
    dom_references.pin_inputs.forEach(input => {
        input.value = "";
    });
      
    isValid.email = false;
    isValid.password = false;
    isValid.pin = false;
}


function showLoginError() {
    dom_references.invalidCredentials.classList.add("show");
}   


function hideLoginError() {
    dom_references.invalidCredentials.classList.remove("show");
}