import pool from "../config/db.js";

class SkinType {

    static async findAll() {
        const SELECT_ALL = `SELECT * FROM skinType`;
        return await pool.query(SELECT_ALL);
    }

    static async create(label) {
        const INSERT = `INSERT INTO skinType (label) VALUE (?)`;
        return await pool.execute(INSERT, [label]);
    }

    static async update(label, id) {
        const UPDATE = `UPDATE skinType SET label = ? WHERE id = ?`;
        return await pool.execute(UPDATE, [label, id]);
    }

    static async remove(id) {
        const DELETE = `DELETE FROM skinType WHERE id = ?`;
        return await pool.execute(DELETE, [id]);
    }

};

export default SkinType;