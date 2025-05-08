const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectToServer } = require('./db/conn');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // evita problemas com CORS em testes
app.use(express.json());

// rota raiz
app.get('/', (req, res) => {
  res.send('API de Contatos - CSE341');
});

// rotas de contatos
app.use('/contacts', require('./routes/contacts'));

// iniciar servidor após conexão com o banco
connectToServer()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Falha ao conectar com o banco de dados:', err);
    process.exit(1);
  });
