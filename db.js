const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: 'root',
    host: "localhost",
    port: 5432,
    database: "node_user"
})

module.exports = pool