var Sequelize = require('sequelize');
var sequelize = require('../config/sequelize').sequelize();
var User = sequelize.import('./user');
var Team = sequelize.import('./team');

Team.hasMany(User, {foreignKey: 'teamId', targetKey: 'teamId'});

sequelize.sync();

exports.User = User;
exports.Team = Team;
