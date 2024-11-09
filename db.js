require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,        
    host: process.env.DB_HOST,          
    database: process.env.DB_DATABASE,    
    password: process.env.DB_PASSWORD,   
    port: process.env.DB_PORT,                  
    ssl: {
        rejectUnauthorized: false, 
    },
});

const query = async (text, params) => {
    const client = await pool.connect(); 
    try {
        const res = await client.query(text, params); 
        
        return res.rows; 
    } catch (err) {
        console.error('Query error', err.stack); 
        throw err;
    } finally {
        client.release();
    }
};

module.exports = {
    query,
};