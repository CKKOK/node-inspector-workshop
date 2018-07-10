const express = require('express');
const router = express.Router();
const tasks = require('../controllers/tasks');

router.post('/create', tasks.create);

module.exports = router;