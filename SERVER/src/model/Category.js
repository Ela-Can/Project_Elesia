import pool from "../config/db.js";

class Category {

    static async findAll() {
        const SELECT_ALL = `SELECT label, ref FROM category ORDER BY label ASC`;
        return await pool.query(SELECT_ALL);
    }

    static async create(label, ref) {
        const INSERT = `INSERT INTO category (label, ref) VALUES (?, ?)`;
        return await pool.execute(INSERT, [label, ref]);
    }

    static async update(label, ref, id) {
        const UPDATE = `UPDATE category SET label = ?, ref = ? WHERE id = ?`;
        return await pool.execute(UPDATE, [label, ref, id]);
    }

    static async remove(id) {
        const DELETE = `DELETE FROM category WHERE id = ?`;
        return await pool.execute(DELETE, [id]);
    }

};

export default Category;