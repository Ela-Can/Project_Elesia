import pool from "../config/db.js";

class Contact {

    static async findAllPendingRequests(status) {
        const SELECT_PENDING = `
            SELECT
                contactForm.id,
                email,
                content,
                DATE_FORMAT(date, '%d/%m/%Y %H:%i') AS date,
                CASE
                    WHEN status = 0 THEN 'demande non lue'
                    WHEN status = 1 THEN 'demande lue'
                END AS status,
                subject.label AS subject
            FROM contactForm
            JOIN subject ON contactForm.id_subject = subject.id
            WHERE status IN (0, 1)
            ORDER BY date DESC`;
        return await pool.query(SELECT_PENDING, [status]);
    }

    static async findAllFinishedRequests(status) {
        const SELECT_FINISHED = `
            SELECT
                contactForm.id,
                email,
                content,
                DATE_FORMAT(date, '%d/%m/%Y %H:%i') AS date,
                CASE
                    WHEN status = 2 THEN 'demande traitée'
                END AS status,
                subject.label AS subject
            FROM contactForm
            JOIN subject ON contactForm.id_subject = subject.id
            WHERE status = 2
            ORDER BY date DESC`;
        return await pool.query(SELECT_FINISHED, [status]);
    }

    static async create(email, content, id_subject) {
        const INSERT = `INSERT INTO contactForm (email, content, id_subject) VALUES (?, ?, ?)`;
        return await pool.execute(INSERT, [email, content, id_subject] );
    }

    static async update(status, id) {
        const UPDATE = `UPDATE contactForm set status = ? WHERE id = ?`;
        return await pool.execute(UPDATE, [status, id]);
    }

};

export default Contact;