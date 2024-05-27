'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  member.init(
    {
      first_name: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING
      },
      default_address_id: {
        type: DataTypes.INTEGER,
        comment: '默认地址id'
      },
      status: {
        type: DataTypes.TINYINT(1),
        comment: '0:异常，不可用，1:正常',
        defaultValue: 1,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'member'
    }
  )
  return member
}
