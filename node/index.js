import express from "express";
import cors from "cors";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";

const app = express();

const puerto = environments.port;


app.use(cors()); // MIDDLEWARE
app.use((req, res, next) => {
    const fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    next(); // Pasa al siguiente middleware (si lo hay) o a la respuesta
})

app.use(express.json());

const validateId = (req, res, next) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(404).json({
            message: "El id debe ser un numero positivo"
        });
    }
    req.id = id;
    next();
};


const validateProduct = (req, res, next) => {
    const categorias = ['drink', 'food'];
    const errores = [];
    const { category, image, name, price, active } = req.body;

    if (!name || !category || price === undefined || !image || active === undefined) {
        errores.push('Faltan campos');
    }

    if (!categorias.includes(category)) errores.push('Categoria invalida');

    if (typeof name !== 'string' || name.trim().length < 2) {
        errores.push('Nombre al menos de dos caracteres');
    }

    if (typeof price !== 'number' || price <= 0) {
        errores.push('El precio debe ser mayor a 0');
    }

    if (typeof image !== 'string') errores.push('Imagen invalida');

    if (typeof active !== 'boolean' && active !== 0 && active !== 1) {
        errores.push('Active invalido');
    }

    if (errores.length > 0) {
        return res.status(400).json({
            message: 'Datos invalidos',
            listaErrores: errores
        });
    }

    next();
};

// GET ALL
app.get("/api/products",  async (req, res) => {
    try {
        const sql = "SELECT * FROM products";
        const [rows] = await connection.query(sql);
        console.log(rows);
        
        if (rows.length === 0) {
            res.status(404).json({
                message: "No hay productos"
            })
        }
        res.status(200).json({
            payload: rows
        });

    } catch (err) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
});



// GET BY ID
app.get("/api/products/:id",validateId ,async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await connection.query(`SELECT * FROM products WHERE id = ?`, [id]);
        
        if (rows.length === 0) return res.status(404).json({
            message: `No existe el producto con id: ${id}`
        })

        console.log(rows)

        res.status(200).json({
            payload: rows
        })
    } catch (err) {
        res.status(500).json({ message: "Error interno del servidor" });

    }

})


// DELETE by id
app.delete("/api/products/:id",validateId , async (req, res) => {
    try {
        const id = req.params.id;
        const [result] = await connection.query(`DELETE FROM products where id = ?` , [id]);
        console.log(result);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `No existe el producto con id: ${id}` });
        }

        res.status(200).json({
            message: 'Producto eliminado',
            payload: result
        })

    } catch (err) {
        res.status(500).json({ message: "Error interno del servidor" });    }
})

// POST
app.post("/api/products",validateProduct , async (req, res) => {
    try {
        const { category, image, name, price , active} = req.body;
        const sql = "INSERT INTO products (name, image, category, price, active) VALUES (?, ?, ?, ?, ?)";
    
        const [rows] = await connection.query(sql, [name, image, category, price, active]);

        if (rows.affectedRows === 0) {
            return res.status(400).json({
                message: "Datos invalidos"
            })
        }
        res.status(201).json({
            message: "Producto creado exitosamente",
            productId: rows.insertId  
        });

    } catch (err) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

//PUT BY ID
app.put("/api/products/:id", [validateId, validateProduct], async (req, res) => {
    try {
        const id = req.params.id;
        const {category, image, name, price, active } = req.body;
        const [result] =  await connection.query(`UPDATE products SET category = ?, image = ?, name = ?, price = ?, active = ? WHERE id = ?`, 
            [category, image, name, price, active, id])

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `No existe el producto con id: ${id}` });
        }

            res.status(200).json({
            message: "Producto modificado con exito",
        })

    } catch (err) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
})


app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`)
});
