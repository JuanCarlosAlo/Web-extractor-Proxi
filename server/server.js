const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { extractHtml } = require('./handlers/extractHtml'); 

const app = express();
const port = 8080;

// Configuración de CORS
app.use(cors({
    origin: '*', 
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(bodyParser.json());

app.post('/extract', async (req, res) => {
  const { url } = req.body;
  try {
    const html = await extractHtml(url);
    res.send(html);
  } catch (error) {
    console.error('Error during HTML extraction:', error);
    res.status(500).send(`Error during HTML extraction: ${error.message || error}`);
  }
});

app.listen(port, () => {
    console.log(`Server running at https://web-extractor-proxi-production.up.railway.app/`);
});
