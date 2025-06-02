const pool = require('../db');  // Asumiendo que crearemos un archivo db.js para la conexión

const axios = require('axios');

// Función para obtener todos los productos
async function getAllProducts(req, res) {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
}

// Función para obtener un producto por ID
async function getProductById(req, res) {
  const { id } = req.params;
  if (!id || isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error en getProductById:', error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
}

// Función para crear un producto (con imagen de API externa)
async function createProduct(req, res) {
  const { name, description, price, stock } = req.body;
  if (!name || !description || !price || stock == null) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  try {
    // Obtener imagen de API externa (ej. Lorem Picsum)
    const imageResponse = await axios.get('https://picsum.photos/200');
    const image_url = imageResponse.request.res.responseUrl;
    
    const result = await pool.query(
      'INSERT INTO products (name, description, price, stock, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, stock, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error en createProduct:', error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
}

// Función para actualizar un producto
async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, description, price, stock, image_url } = req.body;
  if (!id || isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
  try {
    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, stock = $4, image_url = $5 WHERE id = $6 RETURNING *',
      [name, description, price, stock, image_url, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error en updateProduct:', error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
}

// Función para eliminar un producto
async function deleteProduct(req, res) {
  const { id } = req.params;
  if (!id || isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
      res.json({ message: 'Producto eliminado' });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error en deleteProduct:', error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}; 