'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class goods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  goods.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
        allowNull: false
      },
      cate_id: {
        type: DataTypes.INTEGER,
        comment: '分类ID',
        allowNull: false
      },
      promotion: {
        type: DataTypes.STRING,
        comment: '促销宣传语'
      },
      unit: { type: DataTypes.STRING(20), comment: '单位', allowNull: false, defaultValue: 'pieces' },
      seo_keyword: {
        type: DataTypes.STRING,
        comment: '用于seo，meta中的关键词'
      },
      sub_title: {
        type: DataTypes.STRING,
        comment: '副标题'
      },
      stock: {
        type: DataTypes.INTEGER,
        comment: '库存',
        defaultValue: 0
      },
      price: {
        type: DataTypes.INTEGER(10),
        defaultValue: 0
      },
      cost_price: {
        type: DataTypes.INTEGER(10),
        defaultValue: 0
      },
      default_sku_id: {
        type: DataTypes.INTEGER,
        comment: '默认SKU_ID'
      },
      is_show_stock: {
        type: DataTypes.TINYINT(1),
        defaultValue: 1,
        allowNull: false,
        comment: '是否显示库存'
      },
      goods_specs_type: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        comment: '商品规格 1统一规格 2多规格'
      },
      main_image: {
        type: DataTypes.STRING(500),
        comment: '商品主图'
      },
      description: DataTypes.TEXT,
      banner_image: {
        type: DataTypes.STRING(500),
        comment: '首页显示banner图地址'
      },
      is_index_recommend: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0,
        comment: '是否首页显示为banner'
      },
      sort: {
        type: DataTypes.INTEGER(10),
        comment: '排序',
        defaultValue: 255
      },
      seo_description: {
        type: DataTypes.STRING(500),
        comment: '用于SEO,meta中的description'
      },
      brand_id: {
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: 'goods'
    }
  )
  return goods
}
