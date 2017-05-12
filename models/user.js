/**
 * Created by airing on 2017/4/10.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'user',
        {
            'token': {
                'type': DataTypes.STRING(125),
                'allowNull': true
            },
            'name': {
                'type': DataTypes.STRING(45),
                'allowNull': true
            },
            'sex': {
                'type': DataTypes.STRING(45),
                'allowNull': true
            },
            'id_card': {
                'type': DataTypes.STRING(45),
                'allowNull': true
            },
            'phone': {
                'type': DataTypes.STRING(45),
                'allowNull': true
            },
            'sos_name': {
                'type': DataTypes.STRING(45),
                'allowNull': true
            },
            'sos_phone': {
                'type': DataTypes.STRING(45),
                'allowNull': true
            },
            'shit_size': {
                'type': DataTypes.STRING(45),
                'allowNull': true
            },
            'like': {
                'type': DataTypes.STRING(45),
                'allowNull': true
            },
            'work': {
                'type': DataTypes.STRING(45),
                'allowNull': true
            },
            'teamId': {
                'type': DataTypes.INTEGER,
                'allowNull': true
            },
            'role': {   // 0，自由人 1，审核过 2，审核不过 3，未审核 4，队长
                'type': DataTypes.INTEGER,
                'allowNull': true
            },
            'face_url': {
                'type': DataTypes.STRING(500),
                'allowNull': true
            },
            'nick_name': {
                'type': DataTypes.STRING(500),
                'allowNull': true
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
