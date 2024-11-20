import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import session from "express-session";
import fileUpload from 'express-fileupload';

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const MySQLStore = require("express-mysql-session")(session);

import router from "./router/index.routes.js";
import pool from "./config/db.js";

const app = express();

const PORT = process.env.LOCAL_PORT;

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
		methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type"],
	})
);

app.use(
	session({
		secret: process.env.SECRET_KEY_SESSION,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24, // 24h
			httpOnly: true,
			secure: false,
		},
		store: new MySQLStore({
			host: process.env.HOST_DB,
			port: process.env.PORT_DB,
			user: process.env.USER_DB,
			password: process.env.PASS_DB,
			database: process.env.NAME_DB,
		}),
	})
);
app.use("/img", express.static(path.join(process.cwd(), "public/img")));

app.use(fileUpload({
    useTempFiles: false,
	debug: true,
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
	console.log("user session", req.session.user);
	try {
		const [[result]] = await pool.query(
			"SELECT COUNT(session_id) AS session FROM sessions"
		);
		console.log("Active sessions:", result.session);
		console.log(
			"User session:",
			req.session.user ? req.session : "No user session"
		);
		next();
	} catch (err) {
		console.error("Error fetching sessions:", err.message);
	}
});

app.use(["/api/v1", "/"], router);


app.listen(PORT, () =>
    console.log(`Server is running at http://localhost:${PORT}`)
);