const Pool = require('pg').Pool;

const todoPool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "todoapp"
});

module.exports = todoPool;