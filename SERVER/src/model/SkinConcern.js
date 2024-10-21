import pool from "../config/db.js";

class SkinConcern {

    static async findAll() {
        const SELECT_ALL = `SELECT * FROM skinConcern`;
        return await pool.query(SELECT_ALL);
    }

    static async create(label) {
        const INSERT = `INSERT INTO skinConcern (label) VALUE (?)`;
        return await pool.execute(INSERT, [label]);
    }

    static async update(label, id) {
        const UPDATE = `UPDATE skinConcern SET label = ? WHERE id = ?`;
        return await pool.execute(UPDATE, [label, id]);
    }

    static async remove(id) {
        const DELETE = `DELETE FROM skinConcern WHERE id = ?`;
        return await pool.execute(DELETE, [id]);
    }

};

export default SkinConcern;