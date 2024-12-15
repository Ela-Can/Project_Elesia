import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: process.env.NAME_DB,
    port: process.env.PORT_DB,
    connectionLimit: 10,
    queueLimit: 0,
    waitForConnections: true,
});

export default pool;