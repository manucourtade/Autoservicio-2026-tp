import express from "express";

import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";

const app = express();

const puerto = environments.port;

// 
app.get("/", (req, res) => {
    res.send("Hola mundo desde un servidor express.js papa!!!");
})

// GET ALL

app.get("/api/products", async (req, res) => {
    const [rows, tables] = await connection.query("SELECT * FROM products");
    console.log(rows);
    res.status(200).json({
        payload: rows
    });
});


// GET BY ID

app.get("/api/products/:id", async (req, res) => {
    const id = req.params.id;
    const [rows] = await connection.query(`SELECT * FROM products WHERE products.id = ${id}`);
    console.log(rows);
    res.status(200).json({
        payload: rows
    })
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



app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`)
});