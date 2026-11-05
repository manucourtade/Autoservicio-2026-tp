const mostrarError = (message, contenedor) => {
    contenedor.innerHTML = `<p class = "error">${message}</p>`
}

const contenedorProductos = document.getElementById("contenedor-productos");
const urlBase = "http://localhost:3000";
const createProductForm = document.getElementById("createProductForm");

const validarForm = (data) => {
    const errores = []

    if (!data.name  || !data.category || !data.price || !data.image) errores.push('Faltan campos');

    if (!data.category in categorias) errores.push('Categoria invalida')
    
    if (typeof data.name !== 'string' || data.name.trim().length < 2) errores.push('Nombre al mmenos de dos caracteres');

    if (typeof data.price !== 'number' || data.price <= 0) errores.push('El precio debe ser mayor a 0');

    if (typeof data.active !== 'boolean' && data.active !== 0 && data.active !== 1) {
        errores.push('Active invalido');
    }
}

createProductForm.addEventListener("submit", async event => {

    event.preventDefault(); 


    const formData = new FormData(event.target);
    console.log(formData); 


    const formObj = Object.fromEntries(formData.entries());
    formObj.price = Number(formObj.price);
    formObj.active = Number(formObj.active);

    try {
        const response = await fetch(`${urlBase}/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formObj)
        });
        console.log(response);
        
        
        const data = await response.json();
        
        if (!response.ok) {
            console.log(data.listaErrores);
            mostrarError(data.message, contenedorProductos);
            return;
        }   

    } catch (error) {
        console.error("Error al hacer la solicitud: ", error);
        mostrarError("Fallo la conexion en el servidor", contenedorProductos);

    }
})