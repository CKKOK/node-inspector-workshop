const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

router.post('/login', users.authenticate);
router.post('/create', users.create);

router.get('/:id/tasks/new', users.showCreateTaskForm);
router.get('/:id/tasks/:taskId', users.showTask);
router.get('/:id/tasks', users.showAllTasks);
router.get('/:id/logout', users.logout);
router.get('/new', users.register);
router.get('/:id', users.showHome);
router.get('/', users.showAll);

module.exports = router;