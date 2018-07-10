const db = require('../db');
const helpers = require('../helpers');

function create(task, controllerCallback) {
    let queryString = 'INSERT INTO tasks (name, description) VALUES ($1, $2) RETURNING id';
    let values = [task.name, task.description];
    db.query(queryString, values, helpers.dbCallback(controllerCallback))
}

function findAll(controllerCallback) {
    let queryString = 'SELECT * FROM tasks';
    db.query(queryString, helpers.dbCallback(controllerCallback));
}


module.exports = {
    create,
    findAll
}