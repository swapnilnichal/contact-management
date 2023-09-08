const express = require('express');
const router = express.Router();
const {
    getContacts,
    getContact,
    postContacts,
    updateContacts,
    deleteContacts
} = require('../controllers/contactController');

router.route('/').get(getContacts).post(postContacts);
router.route('/:id').get(getContact).put(updateContacts).delete(deleteContacts);

module.exports = router;