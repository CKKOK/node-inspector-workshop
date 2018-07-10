DROP TABLE users_tasks;
DROP TABLE users;
DROP TABLE tasks;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    password TEXT
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT
);

CREATE TABLE users_tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    task_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (task_id) REFERENCES tasks(id)
);