const db = require("../models/database");
const comment = require("../models/comment");
const Comment = db.comments;
const Op = db.Sequelize.Op

// Completed- Create a new Message
exports.createcomment = (req, res) => {

	const comment = {
		message_id: req.body.message_id,
		user_id: req.body.user_id,
        body:req.body.body
		
	};

	Comment.create(comment)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Sorry there was an error while creating the post",
			});
		});
};

exports.findcomments = (req, res) => {
	const message_id = req.query.message_id;
	var condition = message_id ? {message_id: {[Op.like]: `%${message_id}%`}} : null;

	Comment.findAll({where: condition})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "An error occurred whilst retrieving posts.",
			});
		});
};