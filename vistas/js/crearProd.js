    const contenedorProductos = document.getElementById("contenedor-productos");
    const urlBase = "http://localhost:3000";
    const createProductForm = document.getElementById("createProductForm");

    createProductForm.addEventListener("submit", async event => {

        event.preventDefault(); 


        const formData = new FormData(event.target);
        console.log(formData); 


        const formObj = Object.fromEntries(formData.entries());
        console.log(formObj); 
        console.log(JSON.stringify(formObj));


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

            console.log(data.message);
            alert(data.message); 




        } catch (error) {
            console.error("Error al hacer la solicitud: ", error);
        }
    })