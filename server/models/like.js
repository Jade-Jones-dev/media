const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	const Like = sequelize.define(
		"like",
		{
			user_id: {
				type: DataTypes.INTEGER.UNSIGNED,
				allowNull: false
			},
            message_id: {
				type: DataTypes.INTEGER.UNSIGNED,
				allowNull: false
			},
            
		},
		{
			timestamps: false,
		}
	);
    
	return Like;
};