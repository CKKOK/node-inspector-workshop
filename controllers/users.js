const User = require('../models/User');

function register(req, res) {
    res.render('users/Registration');
};

function create(req, res) {

    if (req.body['password'] !== req.body['passwordConfirmation']) {
        return res.render('users/Registration');
    };

    const user = {
        name: req.body['name'],
        email: req.body['email'],
        password: req.body['password']
    };

    const controllerCallback = function (result) {
        let id = result.rows[0]['id'];
        res.cookie('login', id);
        res.redirect('/users/' + id);
    };

    User.create(user, controllerCallback);
};

function authenticate(req, res) {
    const user = {
        email: req.body['email'],
        password: req.body['password']
    };

    const controllerCallback = function (result) {
        if (result.rows.length > 0) {
            let id = result.rows[0]['id'];
            res.cookie('login', id);
            res.redirect('/users/' + id);
        } else {
            res.redirect('/');
        }
    }

    User.authenticate(user, controllerCallback);
};

function showAll(req, res) {
    res.send('Hey this works!');
};

function showHome(req, res) {
    const { id } = req.params;
    const controllerCallback = function(result) {
        res.render('users/Home', {name: result.rows[0]['name'], id})
    };
    User.find(id, controllerCallback);
};

function logout(req, res) {
    res.clearCookie('login');
    res.redirect('/');
};

function showCreateTaskForm(req, res) {
    res.render('tasks/TaskCreationPage', {userId: req.cookies['login']});
};

function createTask(req, res) {
    const { name, description, userId } = req.body;
    const task = {
        name: name,
        description: description
    };
    const controllerCallback = function(res) {
        res.redirect('/users/' + userId);
    }
    User.createTask(userId, task, controllerCallback);
};

function showTask(req, res) {
    const { id, taskId } = req.body;
    const controllerCallback = function(result) {
        if (result.rows.length > 0) {
            res.render('users/Task', result.rows[0]);
        } else {
            res.redirect('/users/' + id);
        };
    };
    User.findTask(id, taskId, controllerCallback);
};

function showAllTasks(req, res) {
    const { id } = req.params;
    const controllerCallback = function(result) {
        let tasks = result;
        
        const controllerCallback_2 = function(result_2) {
            let name = result_2.rows[0]['name'];
            res.render('users/Tasks', {tasks, id, name});
        }

        User.find(id, controllerCallback_2);
    }
    User.findAllTasks(id, controllerCallback);
};

module.exports = {
    showAll,
    showHome,
    create,
    register,
    authenticate,
    showTask,
    showAllTasks,
    logout,
    createTask,
    showCreateTaskForm
}