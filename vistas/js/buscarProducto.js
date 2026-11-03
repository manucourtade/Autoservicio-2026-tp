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
        
        const producto = data.payload[0];
        
        renderizarProducto(producto);
        
    } catch (error) {
        console.error("Error al hacer la solicitud: ", error);
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
        </ul>
    `;

    contenedorProductos.innerHTML = htmlProducto;
}