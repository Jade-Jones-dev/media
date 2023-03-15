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
  
	Comment.findAll({ where: { message_id: message_id } })
	  .then((data) => {
		res.send(data);
	  })
	  .catch((err) => {
		res.status(500).send({
		  message:
			err.message || "Sorry there was an error while searching for comments",
		});
	  });
  };

  exports.deleteComment = (req, res, next) => {
	Comment.findOne({id: req.params.id})
		.then((comment) => {
			// if (message.userId !== req.auth.userId || req.auth.isAdmin !== true) {
			// 	res.status(403).json({message: "Unauthorised"});
			// 	return;
			// }

			Comment.destroy({where: {id: req.params.id}})
				.then(() => res.status(200).json({message: "Message has been deleted"}))
				.catch((error) => res.status(400).json({error}));
		})
		.catch((error) => res.status(400).json({error}));
};

exports.updateComment = (req, res) => {
	const id = req.params.id;

	// if (message.userId !== req.auth.userId || req.auth.isAdmin !== true) {
	// 	res.status(403).json({message: "Unauthorised"});
	// 	return;
	// }

	Comment.update(req.body, {
		where: {id: id},
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Comment was updated successfully.",
				});
			} else {
				res.send({
					message: `Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error updating Comment with id=" + id,
			});
		});
};