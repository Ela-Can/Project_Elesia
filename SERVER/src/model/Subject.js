import pool from "../config/db.js";

class Subject {

    static async findAll() {
        const SELECT_ALL = `SELECT * FROM subject`;
        return await pool.query(SELECT_ALL);
    }

    static async findAllActiveSubjects() {
        const SELECT_ALL_ACTIVE = `SELECT * FROM subject WHERE subjectStatus = 1`;
        return await pool.query(SELECT_ALL_ACTIVE, );
    }

    static async create(label) {
        const INSERT = `INSERT INTO subject (label) VALUES (?)`;
        return await pool.execute(INSERT, [label]);
    }

    static async update(label, id) {
        const UPDATE = `UPDATE subject set label = ? WHERE id = ?`;
        return await pool.execute(UPDATE, [label, id]);
    }

    static async hideSubject(id, subjectStatus) {
        const UPDATE = `UPDATE subject set subjectStatus = ? WHERE id = ?`;
        return await pool.execute(UPDATE, [subjectStatus, id]);
    }

};

export default Subject;