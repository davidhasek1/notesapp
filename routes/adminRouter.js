const express = require('express');
const router = express.Router();
const adminController = require('../controllers/notes');

router.get('/editnotes', adminController.getAdminData);

router.get('/editnotes/:noteId', adminController.editNote);

router.post('/editnotes', adminController.postEditNote);

router.post('/deletenote', adminController.postDeleteNote);

module.exports = router;
