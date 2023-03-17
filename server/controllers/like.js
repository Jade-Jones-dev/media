const db = require("../models/database");
const like = require("../models/like");
const Like = db.likes;
const Op = db.Sequelize.Op

// Completed- Create 
exports.create = (req, res) => {

	const like = {
		message_id: req.body.message_id,
		user_id: req.body.user_id,
		
	};

	Like.create(like)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Sorry there was an error while creating the post",
			});
		});
};