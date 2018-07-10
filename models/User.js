const db = require('../db');
const encrypt = require('js-sha256');
const helpers = require('../helpers');

/**
 * Either finds a specific user if an id is supplied, or finds all users
 * @param {number} id 
 * @param {function} callback 
 */
function find(id, controllerCallback) {
    let queryString = 'SELECT * FROM USERS';
    let values = [];
    let callback = controllerCallback;
    if (typeof id === 'function') {
        callback = id; // this means that no id was passed in, only a callback
    } else {
        queryString += ' WHERE id = $1';
        values = [id];
    };
    db.query(queryString, values, helpers.dbCallback(callback));
};

function findBy(criteria, callback) {
    let queryString = 'SELECT * FROM USERS WHERE ';
    let values = [];
    let criteriaString = '', i = 1;
    for (let condition in criteria) {
        criteriaString += condition + ' = $' + i + ', ';
        values.push(criteria[condition]);
        i++;
    }
    criteriaString = criteriaString.slice(0, -2);
    queryString += criteriaString;
    db.query(queryString, values, helpers.dbCallback(callback));
}

function create(user, controllerCallback) {
    let queryString = 'INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING id';
    let values = [ user['name'], user['email'], encrypt(user['password']) ];
    db.query(queryString, values, helpers.dbCallback(controllerCallback));
};

function authenticate(user, controllerCallback) {
    let queryString = 'SELECT id FROM users WHERE email = $1 AND password = $2';
    let values = [ user.email, encrypt(user['password']) ];
    db.query(queryString, values, helpers.dbCallback(callback));
};

function findAllTasks(userId, controllerCallback) {
    let queryString = 'SELECT users.name AS username, tasks.name AS taskname, users.id AS userid, tasks.id AS taskid FROM tasks INNER JOIN users_tasks ON tasks.id = users_tasks.task_id INNER JOIN users ON users_tasks.user_id = users.id WHERE users.id = $1';
    let values = [userId];
    db.query(queryString, values, helpers.dbCallback(controllerCallback));
};

function findTask(userId, taskId, controllerCallback) {
    let queryString = 'SELECT users.name AS username, tasks.name AS taskname, tasks.description FROM tasks INNER JOIN users_tasks ON tasks.id = users_tasks.task_id INNER JOIN users ON users_tasks.user_id = users.id WHERE users.id = $1 AND tasks.id = $2';
    let values = [userId, taskId];
    db.query(queryString, values, helpers.dbCallback(controllerCallback));
}

function createTask(userId, task, controllerCallback) {
    let taskQueryString = 'INSERT INTO tasks (name, description) VALUES ($1, $2) RETURNING id';
    let taskValues = [ task['name'], task['description'] ];
    db.query(taskQueryString, taskValues, function(error, result) {
        if (error) {
            throw new Error(error);
        } else {
            let taskId = result.rows[0];
            let userQueryString = 'INSERT INTO users_tasks (user_id, task_id) VALUES ($1, $2) RETURNING id';
            let userValues = [userId, taskId];
            db.query(userQueryString, userValues, helpers.dbCallback(controllerCallback));
        };
    });
};


module.exports = {
    find,
    findBy,
    create,
    authenticate,
    findAllTasks,
    createTask,
    findTask
}