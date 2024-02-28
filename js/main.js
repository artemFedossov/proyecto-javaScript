/*variable que se le asigna a los botones*/
const btnRegistrar = document.getElementById('registrar');
const btnBuscar = document.getElementById('btnBuscar');
/*variables que vienen del input de la web*/
const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const inputDni = document.getElementById('dni');
const inputNumeroDeVentas = document.getElementById('numeroDeVentas');
const inputTotal = document.getElementById('total');
const inputBuscar = document.getElementById('buscar');
/*variables que muestran informacion del buscador*/
const mostrarNombre = document.getElementById('mostrarNombre');
const mostrarApellido = document.getElementById('mostrarApellido');
const mostrarDni = document.getElementById('mostrarDni');
const mostrarVentas = document.getElementById('mostrarNumeroDeVentas');
const mostrarTotal = document.getElementById('mostrarTotal');
const mostrarPromedio = document.getElementById('promedio');
/*funcion que le asigna valores a la variable vendedor provenientes del browser */
const vendedores = obtenerVendedores();

/*declaración de la clase vendedor*/
class Vendedor {
    constructor(nombre, apellido, dni, ventas, total) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.ventas = ventas;
        this.total = total;
    }
}

/*función agregar: registra un vendedor con sus respectivos datos que provienen del input*/
function agregar() {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let dni = inputDni.value;
    let ventas = inputNumeroDeVentas.value;
    let total = inputTotal.value;

    /*creamo una instancia del vendedor*/
    const nuevoVendedor = new Vendedor(nombre, apellido, dni, ventas, total);

    if ((nombre.trim() !== "") &&
        (apellido.trim() !== "") &&
        (dni.trim() !== "") &&
        (ventas.trim() !== "") &&
        (total.trim() !== "")) {
        
        /*carga el primer vendedor que se obtiene del registro*/
        if (vendedores.length === 0) {
            vendedores.push(nuevoVendedor);
            /*setItem almacena el array vendedores bajo la clave 'vendedores'
              y stringify convierte el array vendedores en una cadena JSON*/
            localStorage.setItem('vendedores', JSON.stringify(vendedores));  
        } else {
            /*iter todos los vendedores primero se fija si existe un DNI ya registrado,
              en caso de no encontrar agrega uno nuevo al final del array vendedores*/
            for (let i=0; i < vendedores.length; i++) {
                if (vendedores[i].dni === dni) {
                    alert("ya existe un vendedor con ese DNI");
                    break;
                } else if (vendedores.length-1 === i) {
                    vendedores.push(nuevoVendedor);
                    localStorage.setItem('vendedores', JSON.stringify(vendedores));
                    break;
                }
            }
        }
    }
}

/*funcion buscar: busca en el array vendedores considencia en la propiedad dni 
  para devolverla y mostrarla en un input*/
function buscador() {
    let buscar = inputBuscar.value;
    let flag = 0;

    /*if que itera en busca del mismo valor ingresado en el buscador para devolver la coincidencia
      y mostrarlo, en caso contrario devolvera que no existe el dni ingresado*/
    if(buscar.trim() !== "") {
        for (let i=0; i < vendedores.length; i++) {
            if (vendedores[i].dni === buscar) {
                mostrarDni.textContent = vendedores[i].dni;
                mostrarNombre.textContent = vendedores[i].nombre;
                mostrarApellido.textContent = vendedores[i].apellido;
                mostrarVentas.textContent = vendedores[i].ventas;
                mostrarTotal.textContent = vendedores[i].total;
                mostrarPromedio.textContent = "$ " + (mostrarTotal.textContent / mostrarVentas.textContent);
                flag = 1;
            }
        }
    }
    if(flag == 0 || buscar.trim() === "") {
        console.log(flag);
        alert("numero de DNI inexistente");
    }
}

/*funcion que obtiene datos bajo la clave 'vendedores' y el JSON intentara convertir 
  una cadena JSON en un objeto, en caso de que no exista, crea un array vacio*/
function obtenerVendedores() {
    let vendedores = JSON.parse(localStorage.getItem('vendedores')) || [];
    return vendedores;
}

/*evento sobre el boton agregar*/
btnRegistrar.addEventListener('click', agregar);
/*evento sobre el boton buscar*/
btnBuscar.addEventListener('click', buscador);

/*funcion que remueve los items almacenados en el browser*/
/*localStorage.removeItem('vendedores')*/
