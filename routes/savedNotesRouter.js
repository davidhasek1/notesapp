const express = require('express');
const router = express.Router();
const savedNotes = require('../controllers/notes');

router.get('/savednotes', savedNotes.renderNotes );
router.get('/savednotes/:noteId', savedNotes.getNote);

router.post('/savednotes', savedNotes.getRedirect);

module.exports = router;