const contenedorProductos = document.querySelector(".contenedor-productos");
const urlBase = "http://localhost:3000";

async function obtenerProductos() {
    try {
        const response = await fetch(`${urlBase}/api/products`);
        console.log(response);

        const data = await response.json();

        // En data tenemos payload: arrayDeObjetos
        const productos = data.payload;
        console.table(productos);

        renderizarProductos(productos);

    } catch (error) {
        console.error("Error al hacer la solicitud: ", error);
    }
}


function renderizarProductos(array) {
    let htmlProducto = "";

    array.forEach(prod => {
        htmlProducto += `
            <div class="card-producto">
                <div class="card-img">
                    <img src="${prod.image}" alt="${prod.name}">
                </div>

                <div class="card-texto">
                    <h4 class="card-name">${prod.name}</h4>
                    <p class="card-id">Id: ${prod.id}</p>
                    <p class="card-price">$ ${prod.price}</p>
                </div>
            </div>
        `;
    });

    contenedorProductos.innerHTML = htmlProducto;
}

obtenerProductos();