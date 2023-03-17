const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require('body-parser')
dotenv.config();

const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
const likeRoutes = require('./routes/like');
const commentRoutes = require('./routes/comment')
const viewRoutes = require('./routes/view')

const app = express();

const db = require("./models/database");
db.sequelize
	.sync()
	.then(() => {
		console.log(`Synced`);
	})
	.catch((err) => {
		console.log(`Failed to sync ${err.message}`);
	});

var corsOptions = {
	origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(express.json());



app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);
app.use('/api/likes' , likeRoutes)
app.use('/api/comment' , commentRoutes)
app.use('/api/views', viewRoutes)

module.exports = app;
