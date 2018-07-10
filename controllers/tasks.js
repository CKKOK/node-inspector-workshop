// const Task = require('../models/Task');
const User = require('../models/User'); // Since a task must be created by a user, this belongs to the User model instead

function create(req, res) {
    const {name, description, userId} = req.body;
    
    let task = {
        name,
        description
    };

    const controllerCallback = function (result) {
        res.redirect('/users/' + userId);
    };

    User.createTask(userId, task, controllerCallback);
}

module.exports = {
    create
}