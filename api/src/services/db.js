const { Sequelize } = require('sequelize');
const config = require('./db.config.js');

const sequelize = new Sequelize(...config);

const modelDefiners = [
	require('../models/userModel'),
	require('../models/refreshTokenModel'),
	require('../models/noteModel'),
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

module.exports = sequelize;
