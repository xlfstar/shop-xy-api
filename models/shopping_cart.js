'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class shopping_cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  shopping_cart.init(
    {
      goods_id: {
        type: DataTypes.INTEGER,
        comment: '商品ID',
        allowNull: false
      },
      member_id: {
        type: DataTypes.INTEGER,
        comment: '用户ID'
      },
      sku_id: {
        type: DataTypes.INTEGER,
        comment: 'sku_id唯一标识',
        allowNull: false
      },
      status: {
        type: DataTypes.TINYINT(1),
        comment: '状态0:手动操作移除出购物车,1:正常在购物车里面,2:已经结算，系统自动移除',
        defaultValue: 1
      },
      numbers: {
        type: DataTypes.INTEGER,
        comment: '数量',
        defaultValue: 1,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'shopping_cart'
    }
  )
  return shopping_cart
}
