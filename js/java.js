
const arrayEntradas = [  //array de objetos
    {
        id: 1,
        artista: "Taylor Swift",
        precio: 35000,
        fecha: "Octubre 13 2024",
        imagen: "imagenes/taylorSwiftEntrada.jpg"
    },
    {
        id: 2,
        artista: "Arctic Monkeys",
        precio: 25000,
        fecha: "Septiembre 7 2024",
        imagen: "imagenes/arcticMonkeysEntrada.jpg"
    },
    {
        id: 3,
        artista: "5SOS",
        precio: 10000,
        fecha: "Julio 30 2025",
        imagen: "imagenes/5sosEntrada.png"
    },
]

//let entradasEnCarrito = []
let entradasEnCarritoLS = localStorage.getItem("entradasEnCarrito")

class Carrito {
    constructor() {
        this.entradasCarrito = [];
    }

    agregarEntrada(id, cant) {
        let entrada = arrayEntradas.find(ent => ent.id === id);
        if (entrada) {
            if (entradasEnCarritoLS) {
                this.entradasCarrito = JSON.parse(entradasEnCarritoLS)
            }
            else {
                this.entradasCarrito = []
            }
        }

        if (this.entradasCarrito.some(ent => ent.id === idBoton)) {
            const index = this.entradasCarrito.findIndex(ent => ent.id === idBoton)
            this.entradasCarrito[index].cantidad += cant
        }
        else {
            entrada.cantidad = cant
            this.entradasCarrito.push(entrada)
        }
        localStorage.setItem("entradasEnCarrito", JSON.stringify(this.entradasCarrito))
    }

    cantidadEnCarrito() {
        return (JSON.parse(entradasEnCarritoLS).length)
    }

    detallarEntradasEnCarrito() {
        this.entradasCarrito = JSON.parse(entradasEnCarritoLS)
        let listaCarrito = ""
        let total = 0

        this.entradasCarrito.forEach(ent => {
            listaCarrito += "• " + ent.artista + " - " + ent.fecha + " - $" + ent.precio + " x " + ent.cantidad + " = $" + (ent.precio*ent.cantidad)  + "\n";
            total += ent.precio*ent.cantidad
        })
        totalPrecio.innerHTML = `TOTAL $${total}`
        return listaCarrito;
    }

    calcularTotalPagar() {
        let total = 0;

        this.productos.forEach(ent => {
            total += ent.precio;
        });

        return total;
    }

    actualizarNumerito() {
        let numerito = document.getElementById("numerito")
        if (JSON.parse(localStorage.getItem('entradasEnCarrito'))) {
            localStorage.setItem("numerito", numerito.innerHTML = JSON.parse(entradasEnCarritoLS).length)
        } else {
            entradasEnCarritoLS = ""
            numerito.innerHTML = entradasEnCarritoLS.length
        }
    }
}

class Entrada {
    constructor() {
        this.entradas = [];
    }

    precioPorCantidad(id, cant) {
        let entrada = arrayEntradas.find(ent => ent.id === id);
        let precioPorCant = 0
        if (cant) {
            if (entrada) {
                precioPorCant = entrada.precio * cant
            }
        }
        return precioPorCant
    }
}

const contenedorEntradas = document.getElementById("contenedorEntradas")

const contenedorCantEntradas = document.getElementById("contenedorCantEntradas")
contenedorCantEntradas.classList.add("disabled")

const btnComprarTaylorSwift = document.getElementById("btnComprarTaylorSwift")
const btnComprarArcticMonkeys = document.getElementById("btnComprarArcticMonkeys")
const btnComprar5sos = document.getElementById("btnComprar5sos")

const validarCantEntradas = document.getElementById("validarCantEntradas")

const totalPagar = document.getElementById("totalPagar")

const inputCantEntradas = document.getElementById("inputCantEntradas")

const btnAgregarCarrito = document.getElementById("btnAgregarCarrito")
const btnVaciarCarrito = document.getElementById("btnVaciarCarrito")
const btnComprar = document.getElementById("btnComprar")

const contenedorFinalizarCompra = document.getElementById("contenedorFinalizarCompra")
contenedorFinalizarCompra.classList.add("disabled")
const divDetalle = document.getElementById("divDetalle")
const totalPrecio = document.getElementById("totalPrecio")
const finalizarCompra = document.getElementById("finalizarCompra")
const compraExitosa = document.getElementById("compraExitosa")
compraExitosa.classList.add("disabled")

document.getElementById("contenedorFinal").classList.add("disabled")
// document.getElementById("volverInicio").classList.add("disabled")

const carrito = new Carrito()
const entrada = new Entrada()

let idBoton = 0;

carrito.actualizarNumerito()


btnComprarTaylorSwift.onclick = () => {
    idBoton = 1
    carrito.actualizarNumerito()
    btnComprarTaylorSwift.classList.add("disabled")
    document.getElementById("contenedorArcticMonkeys").classList.add("disabled")
    document.getElementById("contenedor5sos").classList.add("disabled")
    contenedorCantEntradas.classList.remove("disabled")
    totalPagar.classList.add("disabled")
    btnAgregarCarrito.classList.add("disabled")

    validarCantEntradas.onclick = () => {
        const cantEntradas = parseInt(inputCantEntradas.value)
        totalPagar.innerHTML = `Total a pagar: $${entrada.precioPorCantidad(idBoton, cantEntradas)}`
        totalPagar.classList.remove("disabled")

        if (cantEntradas) {
            btnAgregarCarrito.classList.remove("disabled")
            btnAgregarCarrito.onclick = () => {
                carrito.agregarEntrada(idBoton, cantEntradas)
            }
        }
    }
}

btnComprarArcticMonkeys.onclick = () => {
    idBoton = 2
    carrito.actualizarNumerito()
    btnComprarArcticMonkeys.classList.add("disabled")
    document.getElementById("contenedorTaylorSwift").classList.add("disabled")
    document.getElementById("contenedor5sos").classList.add("disabled")
    contenedorCantEntradas.classList.remove("disabled")
    totalPagar.classList.add("disabled")
    btnAgregarCarrito.classList.add("disabled")

    validarCantEntradas.onclick = () => {
        const cantEntradas = parseInt(inputCantEntradas.value)
        totalPagar.innerHTML = `Total a pagar: $${entrada.precioPorCantidad(idBoton, cantEntradas)}`
        totalPagar.classList.remove("disabled")

        if (cantEntradas) {
            btnAgregarCarrito.classList.remove("disabled")
            btnAgregarCarrito.onclick = () => {
                carrito.agregarEntrada(idBoton, cantEntradas)
            }
        }
    }
}

btnComprar5sos.onclick = () => {
    idBoton = 3
    carrito.actualizarNumerito()
    btnComprar5sos.classList.add("disabled")
    document.getElementById("contenedorTaylorSwift").classList.add("disabled")
    document.getElementById("contenedorArcticMonkeys").classList.add("disabled")
    contenedorCantEntradas.classList.remove("disabled")
    totalPagar.classList.add("disabled")
    btnAgregarCarrito.classList.add("disabled")

    validarCantEntradas.onclick = () => {
        const cantEntradas = parseInt(inputCantEntradas.value)
        totalPagar.innerHTML = `Total a pagar: $${entrada.precioPorCantidad(idBoton, cantEntradas)}`
        totalPagar.classList.remove("disabled")

        if (cantEntradas) {
            btnAgregarCarrito.classList.remove("disabled")
            btnAgregarCarrito.onclick = () => {
                carrito.agregarEntrada(idBoton, cantEntradas)
            }
        }
    }
}

btnVaciarCarrito.onclick = () => {
    localStorage.clear()
    carrito.actualizarNumerito()
}

btnComprar.onclick = () => {
    divDetalle.innerHTML = carrito.detallarEntradasEnCarrito()
    contenedorFinalizarCompra.classList.remove("disabled")
    document.getElementById("titulos").classList.add("disabled")
    btnComprar.classList.add("disabled")
    btnVaciarCarrito.classList.add("disabled")
    document.getElementById("contenedorTaylorSwift").classList.add("disabled")
    document.getElementById("contenedorArcticMonkeys").classList.add("disabled")
    document.getElementById("contenedor5sos").classList.add("disabled")
}

finalizarCompra.onclick = () => {
    localStorage.clear()
    carrito.actualizarNumerito()
    document.getElementById("contenedorTaylorSwift").classList.add("disabled")
    document.getElementById("contenedorArcticMonkeys").classList.add("disabled")
    document.getElementById("contenedor5sos").classList.add("disabled")
    contenedorFinalizarCompra.classList.add("disabled")
    compraExitosa.classList.remove("disabled")
    document.getElementById("contenedorFinal").classList.remove("disabled")
    // document.getElementById("volverInicio").classList.remove("disabled")
}