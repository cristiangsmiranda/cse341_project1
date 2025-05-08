const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let db;

async function connectToServer() {
  try {
    await client.connect();
    db = client.db(); // conecta ao banco definido na URI
    console.log('✅ Successfully connected to MongoDB!');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

function getDb() {
  return db;
}

module.exports = { connectToServer, getDb };
