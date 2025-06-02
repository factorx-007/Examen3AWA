require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const axios = require('axios');
const productsRouter = require('./routes/products');
const cors = require('cors');


// Configuración de la base de datos PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Inicialización de Express
const app = express();

// Configuración de CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://examen3front.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());  // Middleware para parsear JSON

// Ejemplo de ruta básica (luego expandiremos)
app.get('/', (req, res) => {
  res.send('API de productos está en funcionamiento');
});

app.use('/api/products', productsRouter);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
}); 