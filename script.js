// Contenedor de formularios
const logregBox = document.querySelector('.logreg-box');

// Enlaces para cambiar entre formularios
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

// Muestra el formulario de registro
registerLink.addEventListener('click', () => {
    logregBox.classList.add('active');
});

// Muestra el formulario de inicio de sesión
loginLink.addEventListener('click', () => {
    logregBox.classList.remove('active');
});
