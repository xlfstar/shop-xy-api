'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class goods_spec_value extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  goods_spec_value.init(
    {
      name: DataTypes.STRING,
      status: {
        type: DataTypes.TINYINT(1),
        defaultValue: 1
      },
      spec_id: {
        type: DataTypes.INTEGER,
        comment: '规格属性ID'
      }
    },
    {
      sequelize,
      modelName: 'goods_spec_value'
    }
  )
  return goods_spec_value
}
