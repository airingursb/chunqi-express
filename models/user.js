/**
 * Created by airing on 2017/4/10.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'user',
        {
            'name': {
                'type': DataTypes.STRING(45),
                'allowNull': false
            },
            'sex': {
                'type': DataTypes.STRING(45),
                'allowNull': false
            },
            'id_card': {
                'type': DataTypes.STRING(45),
                'allowNull': false
            },
            'phone': {
                'type': DataTypes.STRING(45),
                'allowNull': false
            },
            'sos_name': {
                'type': DataTypes.STRING(45),
                'allowNull': false
            },
            'sos_phone': {
                'type': DataTypes.STRING(45),
                'allowNull': false
            },
            'shit_size': {
                'type': DataTypes.STRING(45),
                'allowNull': false
            },
            'like': {
                'type': DataTypes.STRING(45),
                'allowNull': true
            },
            'work': {
                'type': DataTypes.STRING(45),
                'allowNull': true
            },
            'team': {
                'type': DataTypes.STRING(45),
                'allowNull': true
            },
            'share_id': {
                'type': DataTypes.STRING(45),
                'allowNull': true
            },
            'teamId': {
                'type': DataTypes.INTEGER,
                'allowNull': false
            },
            'role': {   // 0，队长 1，审核过 2，审核不过 3，未审核
                'type': DataTypes.INTEGER,
                'allowNull': false
            },
            'face_url': {
                'type': DataTypes.STRING(125),
                'allowNull': false
            },
            'nick_name': {
                'type': DataTypes.STRING(45),
                'allowNull': false
            }
        },
        {
            indexes: [
                {
                    name: 'team_id',
                    method: 'BTREE',
                    fields: ['teamId']
                }
            ]
        }
    );
}
