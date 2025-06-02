const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  // Forzar IPv4 si es necesario para evitar issues de resolución
  host: process.env.DATABASE_URL.includes('://') ? process.env.DATABASE_URL.split('@')[1].split(':')[0] : undefined,
  connectionTimeoutMillis: 5000,  // Agregar timeout de 5 segundos
});

module.exports = pool; 