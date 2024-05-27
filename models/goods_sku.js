'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class goods_sku extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  goods_sku.init(
    {
      goods_id: {
        type: DataTypes.INTEGER,
        comment: '商品id',
        allowNull: false
      },
      status: {
        type: DataTypes.TINYINT(1),
        defaultValue: 1
      },
      price: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      spec_value_ids: {
        type: DataTypes.STRING,
        comment: '规格属性id，用逗号链接'
      },
      spec_values: {
        type: DataTypes.STRING
      },
      cost_price: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      sku_image: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      sequelize,
      modelName: 'goods_sku'
    }
  )
  return goods_sku
}
