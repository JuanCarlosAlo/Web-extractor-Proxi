const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { extractHtml } = require('./handlers/extractHtml'); // Import using CommonJS syntax

const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:3000', // Cambia esto por el dominio de tu frontend
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// Manejar solicitudes preflight (OPTIONS)
app.options('*', cors());

// Middleware para parsear el body
app.use(bodyParser.json());

// Ruta para extraer HTML
app.post('/extract', async (req, res) => {
  const { url } = req.body;
  try {
    const html = await extractHtml(url);
    res.send(html);
  } catch (error) {
    console.error('Error during HTML extraction:', error);
    res.status(500).send('Error during HTML extraction');
  }
});

// Iniciar el servidor en el puerto asignado
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
