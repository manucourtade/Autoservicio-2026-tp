import express from "express";
import cors from "cors";
import { fileURLToPath } from "node:url";
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


// GET ALL
app.get("/api/products", async (req, res) => {
    try {
        const sql = "SELECT * FROM products";
        const [rows, tables] = await connection.query(sql);
        // console.log(rows);
    
        res.status(200).json({
            payload: rows
        });

    } catch (err) {
        res.status(500).json({err})
    }
});



// GET BY ID
app.get("/api/products/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await connection.query(`SELECT * FROM products WHERE id = ?`, [id]);
        console.log(rows);
        res.status(200).json({
            payload: rows
        })
    } catch (err) {
        res.status(500).json({err})

    }

})


// DELETE by id
app.delete("/api/products/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const [result] = await connection.query(`DELETE FROM products where id = ?` , [id]);
        console.log(result);
        if (result.affectedRows === 0) return res.status(404).json({message: 'Producto no encontrado'})

        res.status(200).json({
            message: 'Producto eliminado',
            payload: result
        })

    } catch (err) {
        res.status(500).json({err})
    }
})

// POST
app.post("/api/products", async (req, res) => {
    try {
        const { category, image, name, price } = req.body;
        const sql = "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";
    
        await connection.query(sql, [name, image, category, price]);
    
        res.status(201).json({
            message: "Producto creado exitosamente"
        });

    } catch (err) {
        res.status(500).json({err})
    }
});

//PUT BY ID
app.put("/api/products/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const {category, image, name, price, active } = req.body;
        const [result] =  await connection.query(`UPDATE products SET category = ?, image = ?, name = ?, price = ?, active = ? WHERE id = ${id}`, 
            [category, image, name, price, active])
        
        res.status(200).json({
            message: "Producto modificado con exito",
        })

    } catch (err) {
        res.status(500).json({err})
    }
})

// PATCH BY ID


app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`)
});
