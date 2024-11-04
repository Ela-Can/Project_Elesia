import pool from "../config/db.js";

class Auth {

    static async findOneByEmail(email) {
        const SELECT = `SELECT * FROM user WHERE email = ?`;
        return await pool.execute(SELECT, [email]);
    }

    static async findOneByPseudo(pseudo) {
        const SELECT = `SELECT * FROM user WHERE pseudo = ?`;
        return await pool.execute(SELECT, [pseudo]);
    }

    static async findOneById(id) {
        const SELECT = `SELECT * FROM user WHERE id = ?`;
        return await pool.execute(SELECT, [id]);
    }

    static async create(datas) {
        const INSERT = `INSERT INTO user (pseudo, birthdate, email, password) VALUES (?, ?, ?, ?)`;
        return await pool.execute(INSERT, [...Object.values(datas)]);
    }

}

export default Auth;