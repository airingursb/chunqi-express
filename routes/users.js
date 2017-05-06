var express = require('express');
var router = express.Router();
var UserModel = require('../models').User;
var TeamModel = require('../models').Team;
var sha1 = require('sha1');
var md5 = require('md5');

var MESSAGE = {
    SUCCESS : '请求成功',
    PARAMETER_ERROR : '参数错误',
    USER_NOT_EXIST : '用户不存在',
    PASSWORD_ERROR : '账号密码错误',
}

/* users/create_team */
router.get('/create_team', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.query.name == undefined || req.query.name == ''
        || req.query.sex == undefined || req.query.sex == ''
        || req.query.id_card == undefined || req.query.id_card == ''
        || req.query.phone == undefined || req.query.phone == ''
        || req.query.sos_name == undefined || req.query.sos_name == ''
        || req.query.sos_phone == undefined || req.query.sos_phone == ''
        || req.query.shit_size == undefined || req.query.shit_size == ''
        || req.query.team == undefined || req.query.team == ''
        || req.query.like == undefined || req.query.like == ''
        || req.query.work == undefined || req.query.work == ''
        || req.query.nick_name == undefined || req.query.nick_name == ''
        || req.query.face_url == undefined || req.query.face_url == ''
        || req.query.team_name == undefined || req.query.team_name == '') {
        res.json({status: 1, timestamp: timestamp, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }

    var user = {
        name: req.query.name,
        sex: req.query.sex,
        id_card: req.query.id_card,
        phone: req.query.phone,
        sos_name: req.query.sos_name,
        sos_phone: req.query.sos_phone,
        shit_size: req.query.shit_size,
        team: req.query.team,
        like: req.query.like,
        work: req.query.work,
        nick_name: req.query.nick_name,
        face_url: req.query.face_url,
        role: 0
    };

    var team = {
        name: req.query.team_name,
        number: 0,
        share_id: Math.floor(Math.random()*899998)+100000
    };

    UserModel.create(user).then(function (result) {
        TeamModel.create(team).then(function (result){
            return res.json({status: 0, timestamp: timestamp, msg: MESSAGE.SUCCESS})
        }).catch(next);
    }).catch(next);
});

/* users/show_team */
router.get('/show_team', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.query.team_id == undefined || req.query.team_id == '') {
        res.json({status: 1, timestamp: timestamp, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }

    UserModel.findAll({
        where: {
            teamId: req.query.team_id
        }
    }).then(function (result){

        var users = [];
        result.forEach(function (user) {
            
            var userData = {};
            userData.user_id = user.id;
            userData.nick_name = user.nick_name;
            userData.face_url = user.face_url;
            userData.role = user.role;
            if (i >= startRow && i < endRow) {
                users.push(userData);
            }
            i++;
        });
        res.json({status: 0, data: users, msg: MESSAGE.SUCCESS});
    }).catch(next);
});

/* users/show_user */
router.get('/show_user', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.query.name == undefined || req.query.name == ''
        || req.query.sex == undefined || req.query.sex == ''
        || req.query.id_card == undefined || req.query.id_card == ''
        || req.query.phone == undefined || req.query.phone == ''
        || req.query.sos_name == undefined || req.query.sos_name == ''
        || req.query.sos_phone == undefined || req.query.sos_phone == ''
        || req.query.shit_size == undefined || req.query.shit_size == ''
        || req.query.team == undefined || req.query.team == '') {
        res.json({status: 1, timestamp: timestamp, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }
});

/* users/join_team */
router.get('/join_team', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.query.name == undefined || req.query.name == ''
        || req.query.sex == undefined || req.query.sex == ''
        || req.query.id_card == undefined || req.query.id_card == ''
        || req.query.phone == undefined || req.query.phone == ''
        || req.query.sos_name == undefined || req.query.sos_name == ''
        || req.query.sos_phone == undefined || req.query.sos_phone == ''
        || req.query.shit_size == undefined || req.query.shit_size == ''
        || req.query.team == undefined || req.query.team == '') {
        res.json({status: 1, timestamp: timestamp, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }
});

/* users/add_user */
router.get('/add_user', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.query.name == undefined || req.query.name == ''
        || req.query.sex == undefined || req.query.sex == ''
        || req.query.id_card == undefined || req.query.id_card == ''
        || req.query.phone == undefined || req.query.phone == ''
        || req.query.sos_name == undefined || req.query.sos_name == ''
        || req.query.sos_phone == undefined || req.query.sos_phone == ''
        || req.query.shit_size == undefined || req.query.shit_size == ''
        || req.query.team == undefined || req.query.team == '') {
        res.json({status: 1, timestamp: timestamp, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }

    var user = {
        name: req.query.name,
        sex: req.query.sex,
        id_card: req.query.id_card,
        phone: req.query.phone,
        sos_name: req.query.sos_name,
        sos_phone: req.query.sos_phone,
        shit_size: req.query.shit_size,
        team: req.query.team,
        like: req.query.like,
        work: req.query.work,
    };

    UserModel.create(user).then(function (result) {
        return res.json({status: 0, timestamp: timestamp, msg: MESSAGE.SUCCESS})
    });
});

/* users/remove_user */
router.get('/remove_user', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.query.name == undefined || req.query.name == ''
        || req.query.sex == undefined || req.query.sex == ''
        || req.query.id_card == undefined || req.query.id_card == ''
        || req.query.phone == undefined || req.query.phone == ''
        || req.query.sos_name == undefined || req.query.sos_name == ''
        || req.query.sos_phone == undefined || req.query.sos_phone == ''
        || req.query.shit_size == undefined || req.query.shit_size == ''
        || req.query.team == undefined || req.query.team == '') {
        res.json({status: 1, timestamp: timestamp, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }
});

module.exports = router;
