const Pool = require('pg').Pool;

// FOR LOCAL INSTANCE OF POSTGRES DB //

// const todoPool = new Pool({
//     user: "postgres",
//     password: "postgres",
//     host: "localhost",
//     port: 5432,
//     database: "todoapp"
// });


const todoPool = new Pool({
    connectionString: process.env.PGDBConnectionString,
    ssl: {
      rejectUnauthorized: false
    }
});

module.exports = todoPool;