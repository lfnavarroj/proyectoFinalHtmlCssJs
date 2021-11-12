//Variables universales

class Cliente{
    constructor(){
        this._id="id";
        this._nombre="nombre";
        this._clave="clave";
        this._cuenta="cuenta";
    }

    retirar(monto) {

        console.log(monto);
        console.log(Number(objeto._cuenta));

        if(monto<Number(objeto._cuenta)){
            let saldo = Number(objeto._cuenta)-monto;
            alert(`Transacción exitosa, su saldo es ${saldo}`);
        }else{
            alert("Fondos insuficientes");
        }
    }

}

let objeto=new Cliente();

    // 0--> Tomar datos del usuario
    // 1--> Iniciar sesion
    // 2--> confirmar trazacción
    // 3--> Selección de opciones
    // 4--> Introducir monto a retirar

    let confirmarOperacion=0;

function imprimirCar(numero){

    //console.log(confirmarOperacion)

    if(confirmarOperacion=="3"){


        if (numero.value=="1") {
            alert(`Señor(a) ${objeto._nombre} su saldo es ${objeto._cuenta}`);
        }else if(numero.value=="2"){

            let opciones=document.getElementById("OpcionOperaciones");
            let texto=document.getElementById("texto");
            texto.value="";
            texto.placeholder="INTRODUCE EL MONTO A RETIRAR";
            texto.type="text";
            confirmarOperacion=4;

            opciones.style="display:none"
            texto.style="display:block";



        }else{

        }

    }else{

        document.getElementById("texto").value=document.getElementById("texto").value+numero.value;
    }
}

function corregir(){
    document.getElementById("texto").value="";
    console.log(objeto._nombre);

}

function iniciarUsuario(){
    const xhttp=new XMLHttpRequest();//Variable para la conexión
    xhttp.open('GET','./js/usuarios.json',true);//realizo consulta usando el método get asincrono
    xhttp.send();

    //console.log(objeto._nombre);

    xhttp.onreadystatechange=function(){

        let texto=document.getElementById("texto");
        if(this.readyState==4 &&this.status==200){


            //const texto= document.getElementById("texto");
            let datos=JSON.parse(this.responseText);
            let usuario=datos.filter((e)=>e.id==texto.value);
            //console.log(usuario[0].id);

            if (usuario.length!=0){

                

                objeto._nombre=usuario[0].nombre;
                objeto._id=usuario[0].id;
                objeto._clave=usuario[0].clave;
                objeto._cuenta=usuario[0].cuenta;

                
                texto.value="";
                texto.placeholder="INTRODUCE LA CONTRASEÑA";
                texto.type="password";
                confirmarOperacion=1;



            }else{
                alert("Ingrese un usuario valido");
                texto.value="";
            }
        }
    }
}

function iniciarSesion(){


    let texto=document.getElementById("texto");

    let opciones=document.getElementById("OpcionOperaciones");

    if (objeto._clave==texto.value){

        alert(`Bienvenido a su banco X señor(a) ${objeto._nombre}`);

        alert("Indique la operación que desea realizar")        
        texto.style="display:none;"

        opciones.style="display:block;"
        confirmarOperacion=3;



    }else{
        alert("Ingrese un usuario valido");
        texto.value="";

        texto.value="";
        texto.placeholder="INTRODUCE EL ID USUARIO";
        texto.type="text";
        confirmarOperacion=0;
    }
   
}

function retirarFondos() {

    let texto=document.getElementById("texto");
    let cantidad=Number(texto.value);
    objeto.retirar(cantidad);

    texto.value="";
    texto.placeholder="INTRODUCE EL ID USUARIO";
    texto.type="text";
    confirmarOperacion=0;

    
}

function operacionBotonConfirmar() {
    //const btnConfirmar=document.getElementById("confirmar");

    console.log(confirmarOperacion)
    


    switch (confirmarOperacion) {
        case 0:
            iniciarUsuario();
            break;

        case 1:
            iniciarSesion();
            break;

        case 4:
            retirarFondos();
            break;
    
        default:
            break;
    }

}
