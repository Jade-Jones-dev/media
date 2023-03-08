const db = require("../models/database");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const passwordValidator = require("password-validator");
let schema = new passwordValidator();

schema
	.is()
	.min(8) // Minimum length 8
	.is()
	.max(20) // Maximum length 100
	.has()
	.uppercase() // Must have uppercase letters
	.has()
	.lowercase() // Must have lowercase letters
	.has()
	.digits(2) // Must have at least 2 digits
	.has()
	.not()
	.spaces() // Should not have spaces
	.is()
	.not()
	.oneOf(["Passw0rd", "Password123", "password", "Password"]); // Blacklist these values

exports.signup = (req, res, next) => {
	if (!req.body.email || !req.body.name || !req.body.password) {
		res.status(400).send({
			message: "You must sign up with a name, email and password!",
		});
		return;
	}
	if (!schema.validate(req.body.password)) {
		return res.status(401).json({
			error: new Error("Your password must be a minimum of 8 characters and include both upper and lowercase letters, no spaces and 2 digits"),
		});
	} else {
		bcrypt.hash(req.body.password, 10).then((hash) => {
			const user = {email: req.body.email, password: hash, name: req.body.name, isAdmin: req.body.isAdmin};
			User.create(user)
				.then((data) => {
					res.send(user);
				})
				.catch((error) => res.status(400).json({error}))
				.catch((error) => res.status(500).json({error}));
		});
	}
};

exports.login = (req, res, next) => {
	User.findOne({where: {email: req.body.email}})
		.then((user) => {
			if (!user) {
				return res.status(401).json({
					error: new Error("User not found!"),
				});
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					console.log("hello", valid);
					if (!valid) {
						return res.status(401).json({
							error: new Error("Incorrect password!"),
						});
					}
					const token = jwt.sign({userId: user.id, isAdmin: user.isAdmin ,name: user.name}, process.env.token, {expiresIn: "24h"});
					console.log("token", token);
					res.status(200).json({
						userId: user.id,
						token: token,
						isAdmin: user.isAdmin,
						name: user.name
					});
				})
				.catch((error) => {
					res.status(500).json({
						error: error,
					});
				});
		})
		.catch((error) => {
			res.status(500).json({
				error: error,
			});
		});
};
