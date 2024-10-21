import pool from "../config/db.js";

class Contact {

    static async findAllByStatus(status) {
        const SELECT = `
            SELECT
                contactForm.id,
                email,
                content,
                DATE_FORMAT(date, '%d/%m/%Y %H:%i') AS date,
                CASE
                    WHEN status = 0 THEN 'demande non lue'
                    WHEN status = 1 THEN 'demande lue'
                    WHEN status = 2 THEN 'demande traitée'
                END AS status,
                subject.label AS subject
            FROM contactForm
            JOIN subject ON contactForm.id_subject = subject.id
            WHERE status = ?
            ORDER BY date ASC`;
        return await pool.query(SELECT, [status]);
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