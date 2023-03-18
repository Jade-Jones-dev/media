const db = require("../models/database");
const view = require("../models/view");
const View = db.views;
const Op = db.Sequelize.Op

// Completed- Create 
exports.createView = (req, res) => {

	const view = {
		message_id: req.body.message_id,
		user_id: req.body.user_id,
		
	};

	View.create(view)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Sorry there was an error while creating the like",
			});
		});
};

exports.findviews = (req, res) => {
	const message_id = req.query.message_id;
  
	View.findAll({ where: { message_id: message_id } })
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

