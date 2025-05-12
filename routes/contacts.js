const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const { getDb } = require('../db/conn');

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Returns all contacts
 *     responses:
 *       200:
 *         description: Contact list
 */

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


/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Returns a contact by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact found
 *       404:
 *         description: Contact not found
 */


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


/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - favoriteColor
 *               - birthday
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created successfully
 */

// POST - Criar novo contato
router.post('/', async (req, res) => {
  const db = getDb();
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const result = await db.collection('contacts').insertOne({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Error inserting contact' });
  }
});


/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update an existing contact
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *     responses:
 *       204:
 *         description: Contact successfully updated
 */


// PUT - Atualizar contato existente
router.put('/:id', async (req, res) => {
  const db = getDb();
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const result = await db.collection('contacts').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { firstName, lastName, email, favoriteColor, birthday } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(204).send(); // No Content
  } catch (err) {
    res.status(500).json({ error: 'Error updating contact' });
  }
});


/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Remove a contact
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Contact successfully removed
 */

// DELETE - Remover contato
router.delete('/:id', async (req, res) => {
  const db = getDb();

  try {
    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(204).send(); // No Content
  } catch (err) {
    res.status(500).json({ error: 'Error deleting contact' });
  }
});


module.exports = router;
