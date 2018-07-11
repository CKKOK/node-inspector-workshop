const db = require('../db');
const encrypt = require('js-sha256');
const helpers = require('../helpers'); // We use helpers.dbCallback here to handle all the errors, so that our model functions can focus on the database querying

// =====================================================================
// Query Strings - writing them all up here so that we don't have to keep
// declaring them inside the functions
// =====================================================================
const SELECT_ALL_USERS = 'SELECT * FROM USERS';
const CREATE_USER = 'INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING id';
const AUTHENTICATE_USER = 'SELECT id FROM users WHERE email = $1 AND password = $2';
const FIND_ALL_TASKS = 'SELECT users.name AS username, tasks.name AS taskname, users.id AS userid, tasks.id AS taskid FROM tasks INNER JOIN users_tasks ON tasks.id = users_tasks.task_id INNER JOIN users ON users_tasks.user_id = users.id WHERE users.id = $1';
const FIND_TASK = 'SELECT users.name AS username, tasks.name AS taskname, tasks.description FROM tasks INNER JOIN users_tasks ON tasks.id = users_tasks.task_id INNER JOIN users ON users_tasks.user_id = users.id WHERE users.id = $1 AND tasks.id = $2';
const CREATE_TASK = 'INSERT INTO tasks (name, description) VALUES ($1, $2) RETURNING id';
const CREATE_USER_TASK = 'INSERT INTO users_tasks (user_id, task_id) VALUES ($1, $2) RETURNING id';
// =====================================================================


function create(user, controllerCallback) {
    let values = [ user['name'], user['email'], encrypt(user['password']) ];
    db.query(CREATE_USER, values, helpers.dbCallback(controllerCallback));
};

/**
 * Either finds a specific user if an id is supplied, or finds all users
 * @param {number} id 
 * @param {function} callback 
 */
function find(id, controllerCallback) {
    let values = [];
    let callback = controllerCallback;
    if (typeof id === 'function') {
        callback = id; // this means that no id was passed in, only a callback
    } else {
        queryString += ' WHERE id = $1';
        values = [id];
    };
    db.query(SELECT_ALL_USERS, values, helpers.dbCallback(callback));
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

function authenticate(user, controllerCallback) {
    let values = [ user.email, encrypt(user['password']) ];
    db.query(AUTHENTICATE_USER, values, helpers.dbCallback(callback));
};

function createTask(userId, task, controllerCallback) {
    let taskValues = [ task['name'], task['description'] ];

    function taskCreationCallback(result) {
        let taskId = result.rows[0];
        let userValues = [userId, taskId];
        db.query(CREATE_USER_TASK, userValues, helpers.dbCallback(controllerCallback));
    }

    db.query(CREATE_TASK, taskValues, helpers.dbCallback(taskCreationCallback));
};

function findAllTasks(userId, controllerCallback) {
    let values = [userId];
    db.query(FIND_ALL_TASKS, values, helpers.dbCallback(controllerCallback));
};

function findTask(userId, taskId, controllerCallback) {
    let values = [userId, taskId];
    db.query(FIND_TASK, values, helpers.dbCallback(controllerCallback));
}

module.exports = {
    find,
    findBy,
    create,
    authenticate,
    findAllTasks,
    createTask,
    findTask
}