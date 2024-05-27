'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class brands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  brands.init(
    {
      name: DataTypes.STRING,
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1
      },
      sort: {
        type: DataTypes.INTEGER(3),
        defaultValue: 255
      },
      goods_numbers: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      sequelize,
      modelName: 'brands'
    }
  )
  return brands
}
