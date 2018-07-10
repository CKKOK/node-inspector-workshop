const dbConfig      = {
    user:       'kokcheekean',
    host:       '127.0.0.1',
    database:   'testdb',
    port:       5432
};
const pg = require('pg');
const db = new pg.Pool(dbConfig);

db.connect((err) => {
    if (err) {
        console.log('Database connection error:', err.message);
    } else {
        console.log('Database connected');
    };
});

module.exports = db;