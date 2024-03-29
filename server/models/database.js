const dbConfig = require("../config/dbconfig.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorsAliases: false,

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.messages = require("./message.js")(sequelize, Sequelize);
db.users = require("./user.js")(sequelize, Sequelize);
db.likes = require('./like.js')(sequelize, Sequelize);
db.comments = require('./comment.js')(sequelize, Sequelize);
db.views = require('./view.js')(sequelize, Sequelize)

module.exports = db;
