const express = require('express');
const dotenv = require('dotenv');
const { connectToServer } = require('./db/conn');
const setupSwagger = require('./swagger');


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// rotas
app.use('/contacts', require('./routes/contacts'));

// iniciar servidor após conexão com o banco
connectToServer().then(() => {
  setupSwagger(app);
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
});
