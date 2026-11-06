const mostrarError = (message, contenedor) => {
    contenedor.innerHTML = `<p class = "error">${message}</p>`
}

const contenedorProductos = document.querySelector(".contenedor-productos");
const urlBase = "http://localhost:3000";



async function obtenerProductos() {
    try {
        const response = await fetch(`${urlBase}/api/products`);
        console.log(response);
        
        const data = await response.json();
        if (!response.ok) {
            mostrarError(data.message, contenedorProductos);
            return false;
        }
        // En data tenemos payload: arrayDeObjetos
        console.table(data.payload);
        
        renderizarProductos(data.payload);
        buscarProducto(data.payload);

        return true;
    } catch (error) {
        console.error("Error al hacer la solicitud: ", error);
        mostrarError("Fallo la conexion del servidor", contenedorProductos)
        return;
    }
}

const cardProducto = prod => `
    <div class="card-producto">
        <div class="card-img">
            <img src="${prod.image}" alt="${prod.name}">
        </div>
        <div class="card-texto">
            <h4 class="card-name">${prod.name}</h4>
            <p class="card-id">Id: ${prod.id}</p>
            <p class="card-price">$ ${prod.price}</p>
        </div>
        <div class="contenedor-botones">
            <button type="button" class="btn btn-editar">Editar</button>
            <button type="button" class="btn btn-eliminar">Eliminar</button>
        </div>
    </div>
`;

function renderizarProductos(array) {
    let htmlProducto = "";

    array.forEach(prod => {
        htmlProducto += cardProducto(prod);
    });

    contenedorProductos.innerHTML += htmlProducto;
}

function buscarProducto (arr) {
    const formIdName = document.getElementById('formIdName')
    
    formIdName.addEventListener('input', e => {
        contenedorProductos.innerHTML = "";
        e.preventDefault();
        const input = document.getElementById('prod').value.trim().toLowerCase();
        const prodEncontrado = arr.filter(p => String(p.id).startsWith(input) || p.name.toLowerCase().startsWith(input));
        
        if (input === "") {
            renderizarProductos(arr);
            return;
        }
        if (prodEncontrado.length === 0) {
            mostrarError(`No se encontró un producto con id/nombre ${input}`, contenedorProductos);
            return;
        }

        renderizarProductos(prodEncontrado);
                
});
}           

obtenerProductos()