import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 3001, //might need to change this to something that adepts to other ports
});
const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Connected to company database');
    }
    catch (error) {
        console.log('An error as occured! It looks like...: ', error);
    }
};
export default connectDB;
