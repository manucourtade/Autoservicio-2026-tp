

const modificarSeccion = document.querySelector('.modificarProduct-container');
const contenedorProductos = document.getElementById("contenedor-productos");
const urlBase = "http://localhost:3000";

const formId = document.getElementById('formId');

formId.addEventListener('submit', async e => {

    e.preventDefault();

const modificarSeccion = document.querySelector('.modificarProduct-container');
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
            <li>
                <button id="btn-modificar">Modificar</button>
            </li>
        </ul>
    `;
    
    modificarSeccion.innerHTML = htmlProducto;
    modificarProducto(producto.id);

}


const modificarProducto = (id) => {
    const btnModificar = document.getElementById('btn-modificar');

    btnModificar.addEventListener("click", () => {

        modificarSeccion.innerHTML += formularioModicificar;

        const formModificar = document.getElementById('modifyProductForm');

        formModificar.addEventListener('submit', async e => {
            e.preventDefault();

            const formData = new FormData(formModificar).entries();
            const formObj = Object.fromEntries(formData);

            try {
                const response = await fetch(`${urlBase}/api/products/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formObj)
                });

                const data = await response.json();
                console.log(data.message);
                alert(data.message);
                modificarSeccion.innerHTML = "";
            } catch (error) {
                console.error("Error al hacer la solicitud: ", error);
            }
        });
    });
};

let formularioModicificar = `
                            <form id="modifyProductForm">

                                    <label for="categoryProd">Categoria</label>
                                    <select name="category" id="categoryProd" >
                                        <option value="food">Comida</option>
                                        <option value="drink">Bebida</option>
                                    </select>

                                    <label for="imageProd">Imagen</label>
                                    <input type="text" name="image" id="imageProd">

                                    <label for="nameProd">Nombre</label>
                                    <input type="text" name="name" id="nameProd">

                                    <label for="priceProd">Precio</label>
                                    <input type="number" name="price" id="priceProd" min="1">

                                    <label for="activeProd">Disponible</label>
                                    <select name="active" id="activeProd">
                                        <option value="1">Si</option>
                                        <option value="0">No</option>
                                    </select>

                                    <input type="submit" value="Modificar producto" id= "confirmar-modificacion">

                                </form>
`
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
            <li>
                <button id="btn-modificar">Modificar</button>
            </li>
        </ul>
    `;
    
    modificarSeccion.innerHTML = htmlProducto;
    modificarProducto(producto.id);

}


const modificarProducto = (id) => {
    const btnModificar = document.getElementById('btn-modificar');

    btnModificar.addEventListener("click", () => {

        modificarSeccion.innerHTML = formularioModicificar;

        const formModificar = document.getElementById('modifyProductForm');

        formModificar.addEventListener('submit', async e => {
            e.preventDefault();

            const formData = new FormData(formModificar).entries();
            const formObj = Object.fromEntries(formData);

            try {
                const response = await fetch(`${urlBase}/api/products/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formObj)
                });

                const data = await response.json();
                console.log(data.message);
                alert(data.message);
            } catch (error) {
                console.error("Error al hacer la solicitud: ", error);
            }
        });
    });
};

let formularioModicificar = `
                            <form id="modifyProductForm">

                                    <label for="categoryProd">Categoria</label>
                                    <select name="category" id="categoryProd" >
                                        <option value="food">Comida</option>
                                        <option value="drink">Bebida</option>
                                    </select>

                                    <label for="imageProd">Imagen</label>
                                    <input type="text" name="image" id="imageProd">

                                    <label for="nameProd">Nombre</label>
                                    <input type="text" name="name" id="nameProd">

                                    <label for="priceProd">Precio</label>
                                    <input type="number" name="price" id="priceProd" min="1">

                                    <label for="activeProd">Disponible</label>
                                    <select name="active" id="activeProd">
                                        <option value="1">Si</option>
                                        <option value="0">No</option>
                                    </select>

                                    <input type="submit" value="Modificar producto" id= "confirmar-modificacion">

                                </form>
`