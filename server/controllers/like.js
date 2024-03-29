const db = require("../models/database");
const like = require("../models/like");
const Like = db.likes;
const Op = db.Sequelize.Op


exports.createLike = (req, res) => {

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
				message: err.message || "Sorry there was an error while creating the like",
			});
		});
};

exports.findlikes = (req, res) => {
	const message_id = req.query.message_id;
  
	Like.findAll({ where: { message_id: message_id } })
	  .then((data) => {
		res.send(data);
	  })
	  .catch((err) => {
		res.status(500).send({
		  message:
			err.message || "Sorry there was an error while searching for likes",
		});
	  });
  };

