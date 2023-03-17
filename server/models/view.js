const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	const View = sequelize.define( 
		"view",
		{
		  
			user_id: {
				type: DataTypes.INTEGER.UNSIGNED,
				allowNull: false,
				primaryKey: true
			},
            message_id: {
				type: DataTypes.INTEGER.UNSIGNED,
				allowNull: false,
			primaryKey:true			},
            
		},
		{
			timestamps: false,
		}
	);
    
	return View;
};