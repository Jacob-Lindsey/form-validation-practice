const emailField = document.getElementById('email');
const countryField = document.getElementById('country');
const zipField = document.getElementById('zip');
const passwordField = document.getElementById('password');
const passwordConfirmField = document.getElementById('password-confirm');
const submit = document.getElementById('submit');
const form = document.getElementById('form');

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {

        // cancel previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // setup new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

const isRequired = value => value === '' ? false : true;

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isZipCodeValid = (zip) => {
    const re = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    return re.test(zip);
}

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const showError = (input, message) => {
    const formField = input.parentElement;
    input.classList.remove('success-outline');
    input.classList.add('error-outline');
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    const formField = input.parentElement;
    input.classList.remove('error-outline');
    input.classList.add('success-outline');
    const error = formField.querySelector('small');
    error.textContent = '';
};

const checkEmail = () => {
    let valid = false;
    const email = emailField.value.trim();
    if (!isRequired(email)) {
        showError(emailField, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailField, 'Email is not valid.');
    } else {
        showSuccess(emailField);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;
    const password = passwordField.value.trim();
    if (!isRequired(password)) {
        showError(passwordField, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordField, 'Password must have at least 8 characters.');
    } else {
        showSuccess(passwordField);
        valid = true;
    }
    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
    const passwordConfirm = passwordConfirmField.value.trim();
    const password = passwordField.value.trim();
    if (!isRequired(passwordConfirm)) {
        showError(passwordConfirmField, 'Please enter the password again.');
    } else if (password != passwordConfirm) {
        showError(passwordConfirmField, 'Confirmed password does not match.');
    } else {
        showSuccess(passwordConfirmField);
        valid = true;
    }
    return valid;
};

const checkZipCode = () => {
    let valid = false;
    const zip = zipField.value.trim();
    if (!isRequired(zip)) {
        showError(zipField, 'Zip Code cannot be blank.');
    } else if (!isZipCodeValid(zip)) {
        showError(zipField, 'Zip Code is not valid.');
    } else {
        showSuccess(zipField);
        valid = true;
    }
    return valid;
};

form.addEventListener('submit', function(e) {
    e.preventDefault();

    let isEmailValid = checkEmail(),
        isZipCodeValid = checkZipCode(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isEmailValid &&
        isZipCodeValid &&
        isPasswordValid &&
        isConfirmPasswordValid;
});

form.addEventListener('input', debounce(function(e) {
    switch (e.target.id) {
        case 'email':
            checkEmail();
            break;
        case 'zip':
            checkZipCode();
            break;
        case 'password':
            checkPassword();
            break;
        case 'password-confirm':
            checkConfirmPassword();
            break;
    }
}));

// function validate()
