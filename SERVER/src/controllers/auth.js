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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

const register = async (req, res) => {
    try {
        const { pseudo, birthdate, email, password } = req.body;

        if (!validEmail(email)) {
            return res.status(400).json({ msg: "Invalid email format" });
        }

        if (!validPassword(password)) {
            return res.status(400).json({ 
                msg: "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character" 
            });
        }

        const [[userByEmail]] = await Auth.findOneByEmail(email);
        const [[userByPseudo]] = await Auth.findOneByPseudo(pseudo);

        if (userByEmail) {
            res.status(400).json({ msg: "Email already exists" });
        }

        if (userByPseudo) {
            res.status(400).json({ msg: "Pseudo already exists" });
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
        res.status(500).json({ msg: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [[user]] = await Auth.findOneByEmail(email);

        if (!user) {
            res.status(400).json({ msg: "Email not found" });
        }

        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const [[userById]] = await Auth.findOneById(user.id);
                req.session.user = { id: user.id, ...userById };

                res.status(200).json({
                    msg: "User logged in",
                    isLogged: true,
                    user: userById,
                });
            } else {
                res.status(400).json({ msg: "Email or Password Incorrect" });
            }
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const logout = async (req, res) => {
    try {
        req.session.destroy();
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
    req.status(200).json({
        isLogged: true,
        user,
    });
};

export { register, login, logout, check_auth };