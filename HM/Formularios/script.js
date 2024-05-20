// VALIDA CAMPO MOSTRANDO MSJ ERROR HASTA QUE SE CORRIGE
function validarInput() {
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const telefono = document.getElementById("telefono");
  const pais = document.getElementById("pais");
  const usuario = document.getElementById("usuario");

  const textoValidacion = /^[A-Z,a-z, ]*$/;
  const digitos = /^\d*$/;

  // Mostrar error en Input
  if (!textoValidacion.test(nombre.value)) {
    textoError.style.display = "block";
  } else {
    textoError.style.display = "none";
  }

  if (!textoValidacion.test(apellido.value)) {
    textoError2.style.display = "block";
  } else {
    textoError2.style.display = "none";
  }

  if (!digitos.test(telefono.value)) {
    numeroError.style.display = "block";
  } else {
    numeroError.style.display = "none";
  }

  if (!textoValidacion.test(pais.value)) {
    textoError3.style.display = "block";
  } else {
    textoError3.style.display = "none";
  }

  if (!textoValidacion.test(usuario.value)) {
    textoError4.style.display = "block";
  } else {
    textoError4.style.display = "none";
  }
}

// // EMAIL
function validarEmail() {
  const email = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const emailValidacion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailValidacion.test(email.value)) {
    emailError.style.display = "block";
  } else {
    emailError.style.display = "none";
  }
}
