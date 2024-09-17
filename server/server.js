const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { extractHtml } = require('./handlers/extractHtml'); // Import using CommonJS syntax

const app = express();
const port = 3000;

app.use(cors({
    origin: "*",
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
    res.status(500).send('Error during HTML extraction');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
