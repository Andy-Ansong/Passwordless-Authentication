const express = require('express');
const router = express.Router();
const {sendMessages} = require('../controllers/messageController');
const auth = require('../middleware/auth');

router.post('/send', auth, sendMessages);

module.exports = router;
