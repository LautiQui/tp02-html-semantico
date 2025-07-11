document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-suscripcion");

  const campos = {
    nombre: {
      input: document.getElementById("nombre"),
      error: document.getElementById("error-nombre"),
      validar: function () {
        const valor = this.input.value.trim();
        const valido = valor.length > 6 && valor.includes(" ");
        this.setError(valido, "Debe tener más de 6 letras y al menos un espacio");
        return valido;
      },
    },
    email: {
      input: document.getElementById("email"),
      error: document.getElementById("error-email"),
      validar: function () {
        const valor = this.input.value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const valido = regex.test(valor);
        this.setError(valido, "Debe ser un email válido");
        return valido;
      },
    },
    password: {
      input: document.getElementById("password"),
      error: document.getElementById("error-password"),
      validar: function () {
        const valor = this.input.value.trim();
        const valido = valor.length >= 8 && /[a-zA-Z]/.test(valor) && /\d/.test(valor);
        this.setError(valido, "Mínimo 8 caracteres con letras y números");
        return valido;
      },
    },
    repetirPassword: {
      input: document.getElementById("repetir-password"),
      error: document.getElementById("error-repetir-password"),
      validar: function () {
        const valor = this.input.value.trim();
        const valido = valor === campos.password.input.value.trim();
        this.setError(valido, "Las contraseñas no coinciden");
        return valido;
      },
    },
    edad: {
      input: document.getElementById("edad"),
      error: document.getElementById("error-edad"),
      validar: function () {
        const valor = parseInt(this.input.value.trim());
        const valido = Number.isInteger(valor) && valor >= 18;
        this.setError(valido, "Debe ser mayor o igual a 18");
        return valido;
      },
    },
    telefono: {
      input: document.getElementById("telefono"),
      error: document.getElementById("error-telefono"),
      validar: function () {
        const valor = this.input.value.trim();
        const valido = /^\d{7,}$/.test(valor);
        this.setError(valido, "Debe tener al menos 7 dígitos (solo números)");
        return valido;
      },
    },
    direccion: {
      input: document.getElementById("direccion"),
      error: document.getElementById("error-direccion"),
      validar: function () {
        const valor = this.input.value.trim();
        const valido = valor.length >= 5 && /\d/.test(valor) && /[a-zA-Z]/.test(valor) && valor.includes(" ");
        this.setError(valido, "Debe tener letras, números y un espacio");
        return valido;
      },
    },
    ciudad: {
      input: document.getElementById("ciudad"),
      error: document.getElementById("error-ciudad"),
      validar: function () {
        const valor = this.input.value.trim();
        const valido = valor.length >= 3;
        this.setError(valido, "Debe tener al menos 3 caracteres");
        return valido;
      },
    },
    cp: {
      input: document.getElementById("cp"),
      error: document.getElementById("error-cp"),
      validar: function () {
        const valor = this.input.value.trim();
        const valido = valor.length >= 3;
        this.setError(valido, "Debe tener al menos 3 caracteres");
        return valido;
      },
    },
    dni: {
      input: document.getElementById("dni"),
      error: document.getElementById("error-dni"),
      validar: function () {
        const valor = this.input.value.trim();
        const valido = /^\d{7,8}$/.test(valor);
        this.setError(valido, "Debe tener 7 u 8 dígitos numéricos");
        return valido;
      },
    },
  };

  // Métodos comunes
  for (const campo in campos) {
    campos[campo].setError = function (valido, mensaje) {
      if (!valido) {
        this.error.textContent = mensaje;
      } else {
        this.error.textContent = "";
      }
    };

    campos[campo].input.addEventListener("blur", () => {
      campos[campo].validar();
    });

    campos[campo].input.addEventListener("focus", () => {
      campos[campo].error.textContent = "";
    });
  }

  // Submit (API)
 
  form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let errores = [];

  // Validar todos los campos
  for (const campo in campos) {
    const valido = campos[campo].validar();
    if (!valido) {
      errores.push(campo);
    }
  }

  if (errores.length === 0) {
    // Construir objeto con los datos del formulario para enviar
    const datosEnviar = {};
    for (const campo in campos) {
      datosEnviar[campo] = campos[campo].input.value.trim();
    }

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosEnviar),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const datosRespuesta = await response.json();

      // Mostrar modal con éxito y datos de respuesta
      mostrarModal(
        "Éxito",
        "Formulario enviado correctamente.\nRespuesta del servidor:\n" + JSON.stringify(datosRespuesta, null, 2)
      );

      // Guardar datos recibidos en LocalStorage
      localStorage.setItem("datosRespuesta", JSON.stringify(datosRespuesta));

      // Resetear formulario
      form.reset();

    } catch (error) {
      // Mostrar modal con error
      mostrarModal("Error", "No se pudo enviar el formulario.\nDetalles: " + error.message);
    }
  } else {
    alert("Errores en los siguientes campos:\n\n" + errores.join("\n"));
  }
});


  // tiempo real 
const tituloFormulario = document.getElementById("titulo-formulario");
const inputNombre = document.getElementById("nombre");

function actualizarTitulo() {
  const nombreValor = inputNombre.value.trim();
  if (nombreValor.length > 0) {
    tituloFormulario.textContent = "HOLA " + nombreValor.toUpperCase();
  } else {
    tituloFormulario.textContent = "Suscribite al Diario";
  }
}

inputNombre.addEventListener("keydown", () => {
  setTimeout(actualizarTitulo, 0);
});

inputNombre.addEventListener("focus", actualizarTitulo);

});

