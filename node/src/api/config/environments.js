import dotenv from "dotenv";

dotenv.config();

export default {
    port: process.env.PORT,
    database: {
        host:  process.env.HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    } 
}