var Sequelize = require('sequelize');
var sequelize = require('../config/sequelize').sequelize();
var User = sequelize.import('./user');
var Team = sequelize.import('./team');
var Feedback = sequelize.import('./feedback');

Team.hasMany(User, {foreignKey: 'teamId', targetKey: 'teamId'});
User.hasMany(Feedback, {foreignKey: 'userId', targetKey: 'userId'});

sequelize.sync();

exports.User = User;
exports.Team = Team;
exports.Feedback = Feedback;

