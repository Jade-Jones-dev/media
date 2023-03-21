const {DataTypes} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
	const Message = sequelize.define(
		"message",
		{
			title: {
				type: Sequelize.STRING,
			},
			body: {
				type: Sequelize.STRING,
			},
			user_id: {
				type: DataTypes.INTEGER.UNSIGNED,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);

	Message.associate = (models) => {
		Message.hasMany(models.Comment, {
		  foreignKey: "message_id",
		  onDelete: "CASCADE",
		});
	  };

	  Message.associate = (models) => {
		Message.hasMany(models.View, {
		  foreignKey: "message_id",
		  onDelete: "CASCADE",
		});
	  };

	  Message.associate = (models) => {
		Message.hasMany(models.Like, {
		  foreignKey: "message_id",
		  onDelete: "CASCADE",
		});
	  };

	return Message;
};
