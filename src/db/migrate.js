const { Pool } = require('pg');
require('dotenv').config();

async function migrate() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('Error: La variable DATABASE_URL no está definida en .env');
    process.exit(1);
  }
  
  console.log('Intentando conectar con DATABASE_URL:', connectionString);  // Logging para depuración
  const pool = new Pool({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }  // Agregar SSL para Supabase
  });
  
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL,
        image_url VARCHAR(255)
      );
    `;
    await pool.query(query);
    console.log('Tabla products creada exitosamente');
  } catch (error) {
    console.error('Error al crear la tabla:', error.message);  // Logging detallado del error
    console.error('Detalles adicionales:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate(); 