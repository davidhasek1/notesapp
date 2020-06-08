const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes');

router.get('/addnote', notesController.getNotesPage);

router.post('/addnote', notesController.postNotes);

module.exports = router;
