const db = require("../models/database");
const message = require("../models/message");
const Message = db.messages;
const Op = db.Sequelize.Op;
const fs = require("fs");

const comment = require("../models/comment");
const Comment = db.comments;

const view = require("../models/view");
const View = db.views;

const like = require("../models/like");
const Like = db.likes;

exports.update = (req, res, next) => {
	const id = req.params.id;
	const messageObject = req.file
		? {
				...req.body,
				imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
		  }
		: {...req.body};

	Message.findOne({where: {id: id}})
		.then((message) => {
			if (!message) {
				return res.status(404).json({error: "Message not found"});
			}

			const filename = message.imageUrl.split("/images/")[1];
			if (req.file) {
				fs.unlink(`images/${filename}`, (error) => {
					if (error) {
						throw error;
					}
				});
			}
		})
		.catch((error) => {
			res.status(400).json({error});
		});

	Message.update({...messageObject}, {where: {id: id}})
		.then(() => res.status(200).json({message: "Message has been updated"}))
		.catch((error) => res.status(400).json({error}));
};

exports.delete = (req, res, next) => {
	Message.findOne({where: {id: req.params.id}})
		.then((message) => {
			const filename = message.imageUrl.split("/images/")[1];
			fs.unlink("images/" + filename, () => {
				Comment.destroy({where: {message_id: req.params.id}})
					.then(() => {
						return Like.destroy({where: {message_id: req.params.id}});
					})
					.then(() => {
						return View.destroy({where: {message_id: req.params.id}});
					})
					.then(() => {
						return Message.destroy({where: {id: req.params.id}});
					})
					.then(() => {
						res.status(200).json({message: "Message has been deleted"});
					})
					.catch((error) => {
						res.status(400).json({error});
					});
			});
		})
		.catch((error) => {
			res.status(400).json({error});
		});
};

exports.create = (req, res) => {
	const url = req.protocol + "://" + req.get("host");

	const message = {
		title: req.body.title,
		body: req.body.body,
		user_id: req.body.user_id,
		imageUrl: url + "/images/" + req.file.filename,
	};

	Message.create(message)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Sorry there was an error while creating the post",
			});
		});
};

exports.findAll = (req, res) => {
	const title = req.query.title;
	var condition = title ? {title: {[Op.like]: `%${title}%`}} : null;

	Message.findAll({where: condition})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "An error occurred whilst retrieving posts.",
			});
		});
};

exports.findOne = async (req, res) => {
	const id = req.params.id;

	Message.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Message with id=${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error retrieving Message with id=" + id,
			});
		});
};
