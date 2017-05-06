/**
 * Created by airing on 2017/4/10.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'team',
        {
            'name': {
                'type': DataTypes.STRING(45),
                'allowNull': false
            },
            'number': {
                'type': DataTypes.INTEGER,
                'allowNull': false
            },
            'share_id': {
                'type': DataTypes.STRING(45),
                'allowNull': false
            }
        }
    );
}
