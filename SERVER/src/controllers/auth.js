import Auth from "../model/Auth.js";
import bcrypt from "bcrypt";

const SALT = 10;

// Vérification du format de l'email

const validEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
        
// Vérification du format du mot de passe
// Caractères spéciaux pouvant être utilisés @$!%*?&

const validPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[^\s]{8,}$/;
    return passwordRegex.test(password);
};

const validPseudo = (pseudo) => {
    const pseudoRegex = /^(?=.*[a-zA-Z]{3,})[a-zA-Z0-9_-]+$/;
    return pseudoRegex.test(pseudo);
};

// [a-zA-Z0-9_-]+$ : Permet uniquement les lettres, les chiffres, les tirets (-) et les underscores (_). Les espaces ou autres caractères sont interdits.

const register = async (req, res) => {
    try {
        const pseudo = req.body.pseudo.trim();
        const email = req.body.email.trim();
        const password = req.body.password.trim();
        const { birthdate } = req.body;

        if (!email || !pseudo || !password || !birthdate) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        if (pseudo.length < 3 || pseudo.length > 50) {
            return res.status(400).json({ msg: "Pseudo must be between 3 and 50 characters" });
        }

        if (email.length > 100) {
            return res.status(400).json({ msg: "Email must be 100 characters or less" });
        }

        if (password.length < 8 || password.length > 60) {
            return res.status(400).json({ msg: "Password must be between 8 and 60 characters" });
        }

        if (!validEmail(email)) {
            return res.status(400).json({ msg: "Invalid email format" });
        }

        if (!validPassword(password)) {
            return res.status(400).json({ 
                msg: "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character" 
            });
        }

        if (!validPseudo(pseudo)) {
            return res.status(400).json({ msg: "Invalid pseudo format" });
        }

        const today = new Date();
        const userBirthdate = new Date(birthdate);
        const hundredYearsAgo = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());

        if (userBirthdate > today) {
            return res.status(400).json({ msg: "Birthdate cannot be in the future" });
        }

        if (userBirthdate < hundredYearsAgo) {
            return res.status(400).json({ msg: "Birthdate cannot be more than 100 years ago" });
        }

        const [[userByEmail]] = await Auth.findOneByEmail(email);
        const [[userByPseudo]] = await Auth.findOneByPseudo(pseudo);

        if (userByEmail) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        if (userByPseudo) {
            return res.status(400).json({ msg: "Pseudo already exists" });
        }

        if (!userByEmail && !userByPseudo) {
            const hash = await bcrypt.hash(password, SALT);
            const [response] = await Auth.create({ pseudo, birthdate, email, hash });

            if (response.affectedRows === 1) {
            	res.status(201).json({ msg: "User created" });
            } else {
            	res.status(500).json({ msg: "User not created" });
            }
        }

    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

const login = async (req, res) => {
    try {

        console.log("Contenu de req.body :", req.body);
        const email = req.body.email //.trim();
        const password = req.body.password //.trim();

        if (!email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        if (email.length > 100) {
            return res.status(400).json({ msg: "Email must be 100 characters or less" });
        }

        if (password.length < 8 || password.length > 60) {
            return res.status(400).json({ msg: "Password must be between 8 and 60 characters" });
        }

        const [[user]] = await Auth.findOneByEmail(email);

        if (!user) {
            return res.status(400).json({ msg: "Email not found" });
        }

        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const [[userById]] = await Auth.findOneById(user.id);
                console.log("Informations utilisateur récupérées :", userById);
                req.session.user = { id: user.id, ...userById };

                return res.status(200).json({
                    msg: "User logged in",
                    isLogged: true,
                    user: {
                        id : user.id,
                        ...userById
                    },
                });
            } else {
                return res.status(400).json({ msg: "Email or Password Incorrect" });
            }
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const logout = async (req, res) => {
    try {
        req.session.destroy();
        // req.session = null;
        res.clearCookie("connect.sid");
        req.status(200).json({
            msg: "User logged out",
            isLogged: "false",
        });
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const check_auth = async (req, res) => {
    const { user } = req.session;
    res.status(200).json({
        isLogged: true,
        user,
    });
};

export { register, login, logout, check_auth };