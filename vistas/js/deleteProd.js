const mostrarError = (message, contenedor) => {
    contenedor.innerHTML = `<p class = "error">${message}</p>`
}
const contenedorProductos = document.getElementById("contenedor-productos");
const urlBase = "http://localhost:3000";

const formId = document.getElementById('formId');

formId.addEventListener('submit', async e => {

    e.preventDefault();
    const idProd = e.target.idProd.value.trim();

    try {
        const response = await fetch(`${urlBase}/api/products/${idProd}`);
        console.log(response);
        
        const data = await response.json();
        if (!response.ok) {
            mostrarError(data.message, contenedorProductos);
        }        
        renderizarProducto(data.payload[0]);
        
    } catch (error) {
        console.error("Error al hacer la solicitud: ", error);
        mostrarError("Fallo la conexion en el servidor", contenedorProductos);
    }
});

const renderizarProducto = (producto) => {
    console.table(producto);
    
    let htmlProducto = `
        <ul class="listados-container">
            <li class="li-listados">
                <img src="${producto.image}" alt="${producto.name}" class="img-listados">
            </li>
            <li class="li-listados">
                Id: ${producto.id} / Nombre: ${producto.name} / <strong>Precio: $${producto.price}</strong>
            </li>
            <li>
                <button id="btn-eliminar">Eliminar</button>
            </li>
        </ul>
    `;

    contenedorProductos.innerHTML = htmlProducto;

    const btnEliminar = document.getElementById('btn-eliminar');
    btnEliminar.addEventListener("click", e => {
        e.preventDefault();
        let pantallaConfirmar = `
                        <div class="pantalla-confirmar">
                            <p>Estas seguro de eliminar: ${producto.name}</p>
                            <button class="btn-confirmar btn-conf-si">SI</button>
                            <button class="btn-confirmar btn-conf-no">NO</button>
                        </div>
        `
        contenedorProductos.innerHTML += pantallaConfirmar;
        confirmarOpcion(producto.id)
    })
}

const confirmarOpcion = (id) => {
    const pantallaConfirmar = document.querySelector('.pantalla-confirmar')
        pantallaConfirmar.addEventListener("click", e => {

            if(e.target.matches('.btn-conf-si')) {
                eliminarProducto(id)
            }
            contenedorProductos.innerHTML = "";
            })  
    
}

const eliminarProducto = async (id) => {
    try {
        const response = await fetch(`${urlBase}/api/products/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();
        
        if (!response.ok) {
            mostrarError(data.message, contenedorProductos)
            return;
        }

        contenedorProductos.innerHTML = "";

    } catch (err) {
        console.log(err)
    }

}