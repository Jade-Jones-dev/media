const {DataTypes} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
	const Like = sequelize.define(
		"like",
		{
			user_id: {
				type: DataTypes.INTEGER.UNSIGNED,
				allowNull: false,
				primaryKey: true,
			},
			message_id: {
				type: DataTypes.INTEGER.UNSIGNED,
				allowNull: false,
				primaryKey: true,
			},
		},
		{
			timestamps: false,
		}
	);

	Like.associate = (models) => {
		Like.belongsTo(models.Message, {
		  foreignKey: "message_id",
		  onDelete: "CASCADE",
		});
	  };

	return Like;
};
