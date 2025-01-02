import pkg from 'pg';
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'your_host',
    database: process.env.DB_NAME || 'company_db',
    password: process.env.DB_PASSWORD || 'gaming',
    port: parseInt(process.env.DB_PORT || '5432', 10),
});

export default pool;