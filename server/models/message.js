const { DataTypes } = require('sequelize');

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
				allowNull: false
			}
		},
		{
			timestamps: false,
		}
	);

	

	return Message;
};
