'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  category.init(
    {
      name: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      status: {
        type: DataTypes.TINYINT(1),
        defaultValue: 1
      },
      parent_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      sort: {
        type: DataTypes.INTEGER,
        defaultValue: 255
      }
    },
    {
      sequelize,
      modelName: 'category'
    }
  )
  return category
}
