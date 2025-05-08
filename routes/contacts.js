const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const { getDb } = require('../db/conn');

// GET todos os contatos
router.get('/', async (req, res) => {
  const db = getDb();
  try {
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Error when searching for contacts' });
  }
});

// GET um contato por ID
router.get('/:id', async (req, res) => {
  const db = getDb();
  try {
    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Invalid ID or error when searching for contact' });
  }
});

module.exports = router;
