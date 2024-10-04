

    const login_form =  document.querySelector("#login-form");

    const email_container = document.querySelector("#login-container > #login-form > #email");

    const email_input_field = email_container.querySelector("#emailInput");

    const email_error_container = email_container.querySelector("#error-email-msg");

    const tick = email_container.querySelector("#email-tick");

    const password_container = document.querySelector("#login-container > #login-form > #password");

    const password_radio_btn = password_container.querySelector("#alphanumeric-radio-btn");

    const pin_radio_btn = password_container.querySelector("#pin-radio-btn");

    const show_password = password_container.querySelector("#show-password");

    const pin_input_container =  password_container.querySelector("#pin-input-container");

    const password_input_container = password_container.querySelector("#alphanumeric-input-container");

    const password_input = password_container.querySelector("#alphanumeric-input");

    const pin_input = password_container.querySelectorAll("#pin-input-container input");

    const forget_password = password_container.querySelector("#forget_password");

    const invalidCredentials = document.querySelector("#invalid-credentials");

    const login_btn_container = document.querySelector("#login-container > #login-form > #login-btn-container");

    const login_btn = login_btn_container.querySelector("#login-btn");


