const express = require('express');
const router = express.Router();
const {
    getContacts,
    getContact,
    postContacts,
    updateContacts,
    deleteContacts,
    searchContacts
} = require('../controllers/contactController');
const validateToken = require('../middleware/validationHandler');

router.use(validateToken);
router.route('/search').get(searchContacts);
router.route('/').get(getContacts).post(postContacts);
router.route('/:id').get(getContact).put(updateContacts).delete(deleteContacts);

module.exports = router;