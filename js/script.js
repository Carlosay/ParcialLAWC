document.addEventListener("DOMContentLoaded", function () {
    // Funci�n para obtener y mostrar el valor del d�lar oficial
    function obtenerYMostrarDolarOficial() {
        fetch("https://dolarapi.com/v1/dolares/contadoconliqui")
            .then(response => response.json())
            .then(data => {
                const valorDolarCompra = data.compra;
                const valorDolarVenta = data.venta;
                const fechaActualizacion = new Date(data.fechaActualizacion).toLocaleString();
                mostrarValorDolar(`Valor del dolar CCL (Compra): $${valorDolarCompra} Valor del dolar CCL(Venta):  $${valorDolarVenta}`);
                mostrarFechaActualizacion(fechaActualizacion, "fechaDolarOficial");
            })
            .catch(error => console.error("Error al obtener el valor del dolar oficial:", error));
    }

    // Funci�n para obtener y mostrar el valor del d�lar blue
    function convertirADolarBlue() {
        fetch("https://dolarapi.com/v1/dolares/blue")
            .then(response => response.json())
            .then(data => {
                const valorDolarBlueCompra = data.compra;
                const valorDolarBlueVenta = data.venta;
                const fechaActualizacion = new Date(data.fechaActualizacion).toLocaleString();
                const mensaje = `Valor del dolar blue (Compra): $${valorDolarBlueCompra} | Valor del dolar blue (Venta): $${valorDolarBlueVenta}`;
                mostrarValorDolarBlue(mensaje);
                mostrarFechaActualizacion(fechaActualizacion, "fechaDolarBlue");

                // Aplicar la clase de animaci�n "fade-in"
                agregarClaseAnimacion("mensajeDolarBlue");
                agregarClaseAnimacion("fechaDolarBlue");

                // Iniciar el temporizador para actualizar autom�ticamente despu�s de 5 segundos
                iniciarTemporizador();
            })
            .catch(error => console.error("Error al obtener el valor del dolar blue:", error));
    }

    // Funci�n para mostrar el valor en la interfaz
    function mostrarValorDolar(mensaje) {
        const elementoValorDolar = document.getElementById("valorDolar");
        if (elementoValorDolar) {
            elementoValorDolar.textContent = mensaje;
        }
    }

    // Funci�n para mostrar el valor del d�lar blue en un mensaje
    function mostrarValorDolarBlue(mensaje) {
        const elementoMensajeDolarBlue = document.getElementById("mensajeDolarBlue");
        if (elementoMensajeDolarBlue) {
            elementoMensajeDolarBlue.textContent = mensaje;
        }
    }

    // Funci�n para mostrar la fecha de actualizaci�n en la interfaz
    function mostrarFechaActualizacion(fecha, elementoId) {
        const elementoFecha = document.getElementById(elementoId);
        if (elementoFecha) {
            elementoFecha.textContent = `Ultima actualizacion: ${fecha}`;
        }
    }

    // Funci�n para agregar la clase de animaci�n "fade-in"
    function agregarClaseAnimacion(elementoId) {
        const elemento = document.getElementById(elementoId);
        if (elemento) {
            elemento.classList.add("fade-in");
        }
    }

    // Funci�n para iniciar el temporizador
    function iniciarTemporizador() {
        // Limpiar el temporizador anterior si existe
        if (temporizador) {
            clearTimeout(temporizador);
        }

        // Iniciar el temporizador para actualizar autom�ticamente despu�s de 5 segundos
        temporizador = setTimeout(() => {
            obtenerYMostrarDolarOficial();
            convertirADolarBlue();
        }, 5000);
    }

    // Variable para almacenar el temporizador
    let temporizador;

    // Event listener para el bot�n "Convertir a Blue"
    const botonConvertirBlue = document.querySelector("#convertirABlue");
    if (botonConvertirBlue) {
        botonConvertirBlue.addEventListener("click", function () {
            // Cambiar el fondo a un degradado
            document.body.style.background = "linear-gradient(to right, #3498db, #2c3e50)";

            // Iniciar el proceso de conversi�n a d�lar blue
            convertirADolarBlue();
        });
    }

    // Inicializar con el valor del d�lar oficial
    obtenerYMostrarDolarOficial();
});