const cervezas = [
    {id: 1, nombre:"lata de Quilmes", precio: 380},
    {id: 2, nombre:"lata de Stella", precio: 420},
    {id: 3, nombre:"lata de Andes", precio: 400},
    {id: 4, nombre:"lata de Patagonia", precio: 450},
    {id: 5, nombre:"lata de Budweiser", precio: 380},
    {id: 6, nombre:"lata de Heineken", precio: 420},
]

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.getElementById("cervezas").addEventListener("click", function (event) {
    if (event.target.classList.contains("agregar-carrito")) {
        const idCerveza = parseInt(event.target.getAttribute("data-id"));
        const cervezaSeleccionada = cervezas.find(cerveza => cerveza.id === idCerveza);

        if (cervezaSeleccionada) {
            carrito.push(cervezaSeleccionada);

            // Actualizar localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));

            // Actualizar la interfaz del carrito
            actualizarInterfazCarrito();
        }
    }
});

function actualizarInterfazCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    
    // Limpiar la lista antes de actualizar
    listaCarrito.innerHTML = "";

    // Agregar cada cerveza al carrito
    carrito.forEach(cerveza => {
        const li = document.createElement("li");
        li.textContent = `${cerveza.nombre} - $${cerveza.precio.toFixed(2)}`;
        listaCarrito.appendChild(li);
        
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add("eliminar-producto");
        botonEliminar.addEventListener("click", () => eliminarProducto(cerveza.id));

        li.appendChild(botonEliminar);

        listaCarrito.appendChild(li);
    });
}

function eliminarProducto(id) {
    // Filtrar el carrito para mantener solo las cervezas que no tengan el id especificado
    carrito = carrito.filter(cerveza => cerveza.id !== id);

    // Actualizar localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

}

function actualizarTotalEfectivo(){
    let total = 0;
    carrito.forEach(cerveza => {
        total += cerveza.precio;
    });
}
actualizarInterfazCarrito();

actualizarTotalEfectivo();


