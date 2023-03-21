const {DataTypes} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
	const Comment = sequelize.define(
		"comment",
		{
			body: {
				type: Sequelize.STRING,
			},
			user_id: {
				type: DataTypes.INTEGER.UNSIGNED,
				allowNull: false,
			},
			message_id: {
				type: DataTypes.INTEGER.UNSIGNED,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);

	Comment.associate = (models) => {
		Comment.belongsTo(models.Message, {
		  foreignKey: "message_id",
		  onDelete: "CASCADE",
		});
	  };

	return Comment;
};
