'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class goods_spec extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  goods_spec.init(
    {
      name: DataTypes.STRING,
      status: {
        type: DataTypes.TINYINT(1),
        defaultValue: 1
      }
    },
    {
      sequelize,
      modelName: 'goods_spec'
    }
  )
  return goods_spec
}
