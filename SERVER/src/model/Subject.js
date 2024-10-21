import pool from "../config/db.js";

class Subject {

    static async findAll() {
        const SELECT_ALL = `SELECT * FROM subject`;
        return await pool.query(SELECT_ALL);
    }

    static async create(label) {
        const INSERT = `INSERT INTO subject (label) VALUES (?)`;
        return await pool.execute(INSERT, [label]);
    }

    static async update(label, id) {
        const UPDATE = `UPDATE subject set label = ? WHERE id = ?`;
        return await pool.execute(UPDATE, [label, id]);
    }

    static async remove(id) {
        const DELETE = `DELETE FROM subject WHERE id = ?`;
        return await pool.execute(DELETE, [id]);
    }

};

export default Subject;