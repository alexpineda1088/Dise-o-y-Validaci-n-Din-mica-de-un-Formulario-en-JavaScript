const nombre = document.getElementById('nombre');
const correo = document.getElementById('correo');
const contrasena = document.getElementById('contrasena');
const confirmar = document.getElementById('confirmar-contrasena');
const edad = document.getElementById('edad');
const btnEnviar = document.getElementById('btn-enviar');
const formulario = document.getElementById('formulario');

const errores = {
    nombre: document.getElementById('error-nombre'),
    correo: document.getElementById('error-correo'),
    contrasena: document.getElementById('error-contrasena'),
    confirmar: document.getElementById('error-confirmar'),
    edad: document.getElementById('error-edad')
};

let camposValidos = {
    nombre: false,
    correo: false,
    contrasena: false,
    confirmar: false,
    edad: false
};

// Mostrar/ocultar contraseña
document.getElementById('toggle-password').addEventListener('click', () => {
    const tipo = contrasena.type === 'password' ? 'text' : 'password';
    contrasena.type = tipo;
    cambiarIcono('toggle-password', tipo);
});

document.getElementById('toggle-confirmar').addEventListener('click', () => {
    const tipo = confirmar.type === 'password' ? 'text' : 'password';
    confirmar.type = tipo;
    cambiarIcono('toggle-confirmar', tipo);
});

function cambiarIcono(id, tipo) {
    const icono = document.getElementById(id);
    if (tipo === 'text') {
        icono.classList.remove('fa-eye');
        icono.classList.add('fa-eye-slash');
    } else {
        icono.classList.remove('fa-eye-slash');
        icono.classList.add('fa-eye');
    }
}

nombre.addEventListener('input', () => {
    if (nombre.value.length >= 3) {
        errores.nombre.textContent = '';
        camposValidos.nombre = true;
    } else {
        errores.nombre.textContent = 'El nombre debe tener al menos 3 caracteres.';
        camposValidos.nombre = false;
    }
    verificarFormulario();
});

correo.addEventListener('input', () => {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regexCorreo.test(correo.value)) {
        errores.correo.textContent = '';
        camposValidos.correo = true;
    } else {
        errores.correo.textContent = 'Correo no válido.';
        camposValidos.correo = false;
    }
    verificarFormulario();
});

contrasena.addEventListener('input', validarContrasena);
confirmar.addEventListener('input', validarConfirmacion);

function validarContrasena() {
    const regexContrasena = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
    if (contrasena.value.length >= 8 && regexContrasena.test(contrasena.value)) {
        errores.contrasena.textContent = '';
        camposValidos.contrasena = true;
    } else {
        errores.contrasena.textContent = 'Mínimo 8 caracteres, un número y un carácter especial.';
        camposValidos.contrasena = false;
    }
    validarConfirmacion();
    verificarFormulario();
}

function validarConfirmacion() {
    if (contrasena.value === confirmar.value && camposValidos.contrasena) {
        errores.confirmar.textContent = '';
        camposValidos.confirmar = true;
    } else {
        errores.confirmar.textContent = 'Las contraseñas no coinciden.';
        camposValidos.confirmar = false;
    }
    verificarFormulario();
}

edad.addEventListener('input', () => {
    if (parseInt(edad.value) >= 18) {
        errores.edad.textContent = '';
        camposValidos.edad = true;
    } else {
        errores.edad.textContent = 'Debe ser mayor o igual a 18 años.';
        camposValidos.edad = false;
    }
    verificarFormulario();
});

function verificarFormulario() {
    const todoValido = Object.values(camposValidos).every(valor => valor === true);
    btnEnviar.disabled = !todoValido;
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Formulario enviado con éxito.');
    formulario.reset();
    btnEnviar.disabled = true;
    camposValidos = { nombre: false, correo: false, contrasena: false, confirmar: false, edad: false };
});
