'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class payment_methods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  payment_methods.init(
    {
      name: DataTypes.STRING,
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1
      },
      sort: {
        type: DataTypes.INTEGER(3),
        defaultValue: 255
      }
    },
    {
      sequelize,
      modelName: 'payment_methods'
    }
  )
  return payment_methods
}
