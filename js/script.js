//Variables universales

class Cliente {
    constructor() {
        this._id = "id";
        this._nombre = "nombre";
        this._clave = "clave";
        this._cuenta = "cuenta";
    }

    retirar(monto) {

        let indice = 0;
        indice = datos.findIndex((e) => e.id == objeto._id);
        if (monto < Number(objeto._cuenta)) {
            objeto._cuenta = Number(objeto._cuenta) - monto;
            datos[indice].cuenta = objeto._cuenta;
            alert(`Transacción exitosa, su saldo es ${objeto._cuenta}`);
        } else {
            alert("Fondos insuficientes");
        }
    }

    consignar(monto) {
        let indice = 0;
        indice = datos.findIndex((e) => e.id == objeto._id);
        objeto._cuenta = Number(objeto._cuenta) + monto;
        datos[indice].cuenta = objeto._cuenta;
        alert(`Transacción exitosa, su saldo es ${objeto._cuenta}`);
    }
}

let objeto = new Cliente();
let datos = [];

function inicializarDatos() {
    const xhttp = new XMLHttpRequest();//Variable para la conexión
    xhttp.open('GET', './js/usuarios.json', true);//realizo consulta usando el método get asincrono
    xhttp.send();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            datos = JSON.parse(this.responseText);//Declaración varaibel universal
        }
    }
}

// 0--> Tomar datos del usuario
// 1--> Iniciar sesion
// 2--> Consignar
// 3--> Selección de opciones
// 4--> Retirar

let confirmarOperacion = 0;

function imprimirCar(numero) {


    if (confirmarOperacion == "3") {

        if (numero.value == "1") {
            alert(`Señor(a) ${objeto._nombre} su saldo es ${objeto._cuenta}`);
        } else if (numero.value == "2") {

            let opciones = document.getElementById("OpcionOperaciones");
            let texto = document.getElementById("texto");
            texto.value = "";
            texto.placeholder = "INTRODUCE EL MONTO A RETIRAR";
            texto.type = "text";
            confirmarOperacion = 4;
            opciones.style = "display:none"
            texto.style = "display:block";
        } else if (numero.value == "3") {

            let opciones = document.getElementById("OpcionOperaciones");
            let texto = document.getElementById("texto");
            texto.value = "";
            texto.placeholder = "INTRODUCE EL MONTO A CONSIGNAR";
            texto.type = "text";
            confirmarOperacion = 2;
            opciones.style = "display:none"
            texto.style = "display:block";
        }
    } else {
        document.getElementById("texto").value = document.getElementById("texto").value + numero.value;
    }
}

function corregir() {
    document.getElementById("texto").value = "";
    //console.log(objeto._nombre);
}

function iniciarUsuario() {

    let texto = document.getElementById("texto");
    let usuario = datos.filter((e) => e.id == texto.value);

    if (usuario.length != 0) {

        objeto._nombre = usuario[0].nombre;
        objeto._id = usuario[0].id;
        objeto._clave = usuario[0].clave;
        objeto._cuenta = usuario[0].cuenta;
        texto.value = "";
        texto.placeholder = "INTRODUCE LA CONTRASEÑA";
        texto.type = "password";
        confirmarOperacion = 1;

    } else {
        alert("Ingrese un usuario valido");
        texto.value = "";
    }
}

function iniciarSesion() {

    let texto = document.getElementById("texto");
    let opciones = document.getElementById("OpcionOperaciones");

    if (objeto._clave == texto.value) {

        alert(`Bienvenido a su banco X señor(a) ${objeto._nombre}`);

        alert("Indique la operación que desea realizar")
        texto.style = "display:none;"

        opciones.style = "display:block;"
        confirmarOperacion = 3;

    } else {
        alert("Ingrese un usuario valido");
        texto.value = "";

        texto.value = "";
        texto.placeholder = "INTRODUCE EL ID USUARIO";
        texto.type = "text";
        confirmarOperacion = 0;
    }
}

function retirarFondos() {
    let texto = document.getElementById("texto");
    let cantidad = Number(texto.value);
    objeto.retirar(cantidad);
    texto.value = "";
    texto.placeholder = "INTRODUCE EL ID USUARIO";
    texto.type = "text";
    confirmarOperacion = 0;
}

function consignarFondos() {
    let texto = document.getElementById("texto");
    let cantidad = Number(texto.value);
    objeto.consignar(cantidad);
    texto.value = "";
    texto.placeholder = "INTRODUCE EL ID USUARIO";
    texto.type = "text";
    confirmarOperacion = 0;
}

function operacionBotonConfirmar() {
    switch (confirmarOperacion) {
        case 0:
            iniciarUsuario();
            break;

        case 1:
            iniciarSesion();
            break;

        case 2:
            consignarFondos();
            break;

        case 4:
            retirarFondos();
            break;

        default:
            break;
    }
}

function cancelarOperacion() {
    let texto = document.getElementById("texto");
    let opciones = document.getElementById("OpcionOperaciones");
    texto.value = "";
    texto.value = "";
    texto.placeholder = "INTRODUCE EL ID USUARIO";
    texto.type = "text";
    confirmarOperacion = 0;

    texto.style = "display:block;"
    opciones.style = "display:none;"
}
