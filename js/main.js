const btnRegistrar = document.getElementById('registrar');
const btnBuscar = document.getElementById('btnBuscar');
const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const inputDni = document.getElementById('dni');
const inputNumeroDeVentas = document.getElementById('numeroDeVentas');
const inputTotal = document.getElementById('total');
const inputBuscar = document.getElementById('buscar');
const mostrarNombre = document.getElementById('mostrarNombre');
const mostrarApellido = document.getElementById('mostrarApellido');
const mostrarDni = document.getElementById('mostrarDni');
const mostrarVentas = document.getElementById('mostrarNumeroDeVentas');
const mostrarTotal = document.getElementById('mostrarTotal');
const mostrarPromedio = document.getElementById('promedio');

const vendedores = obtenerVendedores();
console.log(vendedores.length);

function agregar() {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let dni = inputDni.value;
    let ventas = inputNumeroDeVentas.value;
    let total = inputTotal.value;

    let vendedores = JSON.parse(localStorage.getItem('vendedores')) || [];

    let vendedor = {
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        ventas: ventas,
        total: total,
    };

    if ((nombre.trim() !== "") &&
        (apellido.trim() !== "") &&
        (dni.trim() !== "") &&
        (ventas.trim() !== "") &&
        (total.trim() !== "")) {
        
        if (vendedores.length === 0) {
            vendedores.push(vendedor);
            localStorage.setItem('vendedores', JSON.stringify(vendedores));  
        } else {
            for (let i=0; i < vendedores.length; i++) {
                if (vendedores[i].dni === dni) {
                    alert("numero de DNI existente");
                    break;
                } else if (vendedores.length-1 === i) {
                    vendedores.push(vendedor);
                    localStorage.setItem('vendedores', JSON.stringify(vendedores));
                    break;
                }
            }
        }
    }
}

function buscador() {
    let buscar = inputBuscar.value;
    let flag = 0;

    
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
        alert("numero de DNI existente");
    }
}

btnRegistrar.addEventListener('click', agregar);
btnBuscar.addEventListener('click', buscador);

function obtenerVendedores() {
    let vendedores = JSON.parse(localStorage.getItem('vendedores')) || [];
    return vendedores;
}

const mostrar = obtenerVendedores();
console.log(mostrar);
/*localStorage.removeItem('vendedores')*/
