const db = require('./db');
const fs = require('fs');
const encrypt = require('js-sha256');

const sql = fs.readFileSync('tables.sql').toString();

const users = [
    {name: 'Alan', email: 'alan@meh.com', password: encrypt('123')},
    {name: 'Barry', email: 'barry@meh.com', password: encrypt('123')},
    {name: 'Charlie', email: 'charlie@meh.com', password: encrypt('123')},
];

const tasks = [
    {name: 'Wake up', description: 'Stop hitting snooze'},
    {name: 'Brush teeth', description: 'Remember to floss'},
    {name: 'Get to office', description: 'Somewhere in town'},
    {name: 'Write some code', description: 'Make sure it passes all unit tests'},
    {name: 'Commit to github', description: 'Do this frequently!!!111!11'},
    {name: 'Morning standup', description: 'Stand. Literally. And talk.'},
    {name: 'Evening stand down', description: 'Stand. Still.'},
    {name: 'Have lunch', description: 'Where at huh?'},
    {name: 'Have dinner', description: 'Town?'},
    {name: 'Read a book', description: 'On what?'},
];

const users_tasks = [
    {user_id: 1, task_id: 1},
    {user_id: 2, task_id: 1},
    {user_id: 3, task_id: 1},
    {user_id: 1, task_id: 3},
    {user_id: 1, task_id: 4},
    {user_id: 1, task_id: 8},
    {user_id: 2, task_id: 2},
    {user_id: 2, task_id: 3},
    {user_id: 2, task_id: 6},
    {user_id: 2, task_id: 4},
    {user_id: 2, task_id: 8},
    {user_id: 2, task_id: 10},
    {user_id: 3, task_id: 3},
    {user_id: 3, task_id: 6},
    {user_id: 3, task_id: 4},
    {user_id: 3, task_id: 5},
    {user_id: 3, task_id: 9},
]

db.query(sql, async (err, result) => {
    if (err) {
        throw new Error(err);
    } else {
        for (let i = 0; i < users.length; i++) {
            await db.query('INSERT INTO users (name, email, password) VALUES($1, $2, $3)', [users[i].name, users[i].email, users[i].password]);
        };
        for (let i = 0; i < tasks.length; i++) {
            await db.query('INSERT INTO tasks (name, description) VALUES($1, $2)', [tasks[i].name, tasks[i].description]);
        };
        for (let i = 0; i < users_tasks.length; i++) {
            await db.query('INSERT INTO users_tasks (user_id, task_id) VALUES($1, $2)', [users_tasks[i].user_id, users_tasks[i].task_id]);
        };
        console.log('Database initialized.');
        db.end();
        process.exit(0);
    }
})