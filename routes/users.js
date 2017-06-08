var express = require('express');
var router = express.Router();
var UserModel = require('../models').User;
var TeamModel = require('../models').Team;
var sha1 = require('sha1');
var md5 = require('md5');
var https = require('https');
var querystring = require('querystring');

var MESSAGE = {
    SUCCESS : '请求成功',
    PARAMETER_ERROR : '参数错误',
    USER_NOT_EXIST : '用户不存在',
    TEAM_NOT_EXIST : '队伍不存在',
    PASSWORD_ERROR : '账号密码错误',
    ID_NOT_EXIST : '邀请码错误',
    KICK_ERROR : '不可踢出自己',
    TEAM_ALREADY_EXISE: '队伍名已被使用'
}

/* users/login */
router.get('/login', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.query.code == undefined || req.query.code == '') {
        res.json({status: 1, timestamp: timestamp, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }

    const postData = {
        js_code: req.query.code,
        appid: 'wxe4dff4321e59c3c7', // 填写小程序appid
        secret: '3b6e7f724da8195c99ef74502d0c5e84',  // 填写小程序的secret
        grant_type: 'authorization_code'
    };

    const content = querystring.stringify(postData);

    const options = {
        host: 'api.weixin.qq.com',
        path: '/sns/jscode2session',
        method: 'POST',
        agent: false,
        rejectUnauthorized: false,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': content.length
        }
    };

    var req = https.request(options,function(response){
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log(JSON.parse(chunk));
            UserModel.findOne({
                where:{
                    openid: JSON.parse(chunk).openid
                }
            }).then(function(user) {
                if (!user) {
                    UserModel.create({
                        openid: JSON.parse(chunk).openid,
                        role: 0
                    }).then(function() {
                        return res.json({status: 0, openid: JSON.parse(chunk).openid})
                    })
                } else {
                    return res.json({status: 2000, openid: JSON.parse(chunk).openid})
                }
            })  
        });
        response.on('end',function(){
            console.log('over');
        });
    });

    req.write(content);
    req.end();

});


/* users/create_team */
router.get('/create_team', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.query.team_name == undefined || req.query.team_name == '') {
        res.json({status: 1, timestamp: timestamp, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }

    var team = {
        name: req.query.team_name,
        number: 1,
        share_id: Math.floor(Math.random()*899998)+100000
    };

    TeamModel.findOne({
        where: {
            name: req.query.team_name
        }
    }).then((result)=>{
        if (!result) {
            TeamModel.create(team).then(()=>{
                res.json({status: 0, timestamp: timestamp, msg: MESSAGE.SUCCESS, data: team})
            })
            return;
        }
        res.json({status: 1020, timestamp: timestamp, msg: MESSAGE.TEAM_ALREADY_EXISE, data: team})
    }).catch(next);
    return;
});

/* users/add_manager */
router.get('/add_manager', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.query.name == undefined || req.query.name == ''
        || req.query.sex == undefined || req.query.sex == ''
        || req.query.id_card == undefined || req.query.id_card == ''
        || req.query.phone == undefined || req.query.phone == ''
        || req.query.sos_name == undefined || req.query.sos_name == ''
        || req.query.sos_phone == undefined || req.query.sos_phone == ''
        || req.query.shit_size == undefined || req.query.shit_size == ''
        || req.query.share_id == undefined || req.query.share_id == ''
        || req.query.like == undefined || req.query.like == ''
        || req.query.work == undefined || req.query.work == ''
        || req.query.nick_name == undefined || req.query.nick_name == ''
        || req.query.face_url == undefined || req.query.face_url == ''
        || req.query.openid == undefined || req.query.openid == '') {
        res.json({status: 1, timestamp: timestamp, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }

    TeamModel.findOne({
        where: {
            share_id: req.query.share_id
        }
    }).then(function (result) {
        var user = {
            name: req.query.name,
            sex: req.query.sex,
            id_card: req.query.id_card,
            phone: req.query.phone,
            sos_name: req.query.sos_name,
            sos_phone: req.query.sos_phone,
            shit_size: req.query.shit_size,
            teamId: result.id,
            like: req.query.like,
            work: req.query.work,
            role: 4,
            nick_name: req.query.nick_name,
            face_url: req.query.face_url,
            token: sha1(timestamp)
        };

        UserModel.update(user,{
            where: {
                openid: req.query.openid
            }
        }).then(function (result) {
            return res.json({status: 0, timestamp: timestamp, msg: MESSAGE.SUCCESS, data: user});
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
            users.push(userData);
        });
        res.json({status: 0, data: users, msg: MESSAGE.SUCCESS});
    }).catch(next);
});

/* users/show_user */
router.get('/show_user', function (req, res, next) {

    var timestamp = new Date().getTime();
    if (req.query.user_id == undefined || req.query.user_id == '') {
        res.json({status: 1, timestamp: timestamp, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }
    UserModel.findOne({
        where: {
            id: req.query.user_id
        }
    }).then(function (user) {
        res.json({status: 1, timestamp: timestamp, msg: MESSAGE.SUCCESS, data: user});
    }).catch(next);
});

/* users/pass_user */
router.get('/pass_user', function (req, res, next) {

    var timestamp = new Date().getTime();
    if (req.query.user_id == undefined || req.query.user_id == '') {
        res.json({status: 1, timestamp: timestamp, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }
    UserModel.update({
        role: 1
    },{
        where: {
            id: req.query.user_id
        }
    }).then(function (result) {
        return res.json({status: 0, timestamp: timestamp, msg: MESSAGE.SUCCESS})
    }).catch(next);
});

/* users/nopass_user */
router.get('/nopass_user', function (req, res, next) {

    var timestamp = new Date().getTime();
    if (req.query.user_id == undefined || req.query.user_id == '') {
        res.json({status: 1, timestamp: timestamp, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }
    UserModel.update({
        role: 2
    },{
        where: {
            id: req.query.user_id
        }
    }).then(function (result) {
        return res.json({status: 0, timestamp: timestamp, msg: MESSAGE.SUCCESS})
    }).catch(next);
});

/* users/join_team */
router.get('/join_team', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.query.share_id == undefined || req.query.share_id == '') {
        res.json({status: 1, timestamp: timestamp, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }

    TeamModel.findOne({
        where: {
            share_id: req.query.share_id
        }
    }).then(function (result) {
        if (result) {
            return res.json({status: 0, timestamp: timestamp, msg: MESSAGE.SUCCESS})
        } else {
            return res.json({status: 1000, timestamp: timestamp, msg: MESSAGE.ID_NOT_EXIST})
        }
    }).catch(next);
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
        || req.query.share_id == undefined || req.query.share_id == ''
        || req.query.like == undefined || req.query.like == ''
        || req.query.work == undefined || req.query.work == ''
        || req.query.nick_name == undefined || req.query.nick_name == ''
        || req.query.face_url == undefined || req.query.face_url == '') {
        res.json({status: 1, timestamp: timestamp, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }

    TeamModel.findOne({
        where: {
            share_id: req.query.share_id
        }
    }).then(function (result) {
        var user = {
            name: req.query.name,
            sex: req.query.sex,
            id_card: req.query.id_card,
            phone: req.query.phone,
            sos_name: req.query.sos_name,
            sos_phone: req.query.sos_phone,
            shit_size: req.query.shit_size,
            teamId: result.id,
            like: req.query.like,
            work: req.query.work,
            role: 0,
            nick_name: req.query.nick_name,
            face_url: req.query.face_url,
            token: sha1(timestamp)
        };

        UserModel.create(user).then(function (result) {
            return res.json({status: 0, timestamp: timestamp, msg: MESSAGE.SUCCESS, data: user})
        }).catch(next);
    }).catch(next);
});

/* users/remove_user */
router.get('/remove_user', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.query.user_id == undefined || req.query.user_id == ''
        || req.query.openid == undefined || req.query.openid == '') {
        res.json({status: 1, timestamp: timestamp, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }

    UserModel.findOne({
        where: {
            id: req.query.user_id,
            openid: req.query.openid
        }
    }).then(function (result) {
        if(result){
            return res.json({status: 1010, timestamp: timestamp, msg: MESSAGE.KICK_ERROR})
        } else {
            UserModel.destroy({
                where: {
                    id: req.query.user_id,
                }
            }).then(function(result) {
                return res.json({status: 0, timestamp: timestamp, msg: MESSAGE.SUCCESS})       
            })
        }
    }).catch(next);

});

/* users/delete_team */
router.get('/delete_team', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.query.team_id == undefined || req.query.team_id == '') {
        res.json({status: 1, timestamp: timestamp, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }

    UserModel.destroy({
        where: {
            teamId: req.query.team_id,
        }
    }).then(function () {
        TeamModel.destroy({
            where: {
                id: req.query.team_id
            }
        }).then(function() {
            res.json({status: 0, msg: MESSAGE.SUCCESS})
            return;
        })
    });
    res.json({status: 0, msg: MESSAGE.SUCCESS})

});

/* users/get_user */
router.get('/get_user', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.query.openid == undefined || req.query.openid == '') {
        res.json({status: 1, timestamp: timestamp, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }

    UserModel.findOne({
        where: {
            openid: req.query.openid
        }
    }).then(function (result) {
        if(result) {
            return res.json({status: 0, timestamp: timestamp, msg: MESSAGE.SUCCESS, data: result})
        } else {
            return res.json({status: 1001, timestamp: timestamp, msg: MESSAGE.USER_NOT_EXIST})
        }
    }).catch(next);
});

/* users/get_team */
router.get('/get_team', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.query.team_id == undefined || req.query.team_id == '') {
        res.json({status: 1, timestamp: timestamp, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }

    TeamModel.findOne({
        where: {
            id: req.query.team_id
        }
    }).then(function (result) {
        if(result) {
            return res.json({status: 0, timestamp: timestamp, msg: MESSAGE.SUCCESS, data: result})
        } else {
            return res.json({status: 1002, timestamp: timestamp, msg: MESSAGE.TEAM_NOT_EXIST})
        }
    }).catch(next);
});


/* users/feedback */
router.get('/feedback', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.query.openid == undefined || req.query.openid == ''
        || req.query.content == undefined || req.query.content == '') {
        res.json({status: 1000, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }

    var contact = req.query.contact || 'null'

    var feedback = {
        contact: contact,
        content: req.query.content
    };
    UserModel.findOne({
        where: {
            openid: req.query.openid
        }
    }).then(function (user) {
        if (!user) {
            return res.json({status: 1001, msg: MESSAGE.USER_NOT_EXIST});
        }
        user.createFeedback(feedback);
        res.json({status: 0, msg: MESSAGE.SUCCESS});
    }).catch(next);
});


module.exports = router;
