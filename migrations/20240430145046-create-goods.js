'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('goods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 0
      },
      cate_id: {
        type: Sequelize.INTEGER,
        comment: '分类id',
        allowNull: false
      },
      promotion: {
        type: Sequelize.STRING,
        comment: '促销语'
      },
      unit: {
        type: Sequelize.STRING,
        comment: '单位'
      },
      keyword: {
        type: Sequelize.STRING,
        comment: '关键词'
      },
      sub_title: {
        type: Sequelize.STRING,
        comment: '副标题'
      },
      stock: {
        type: Sequelize.INTEGER,
        comment: '库存',
        defaultValue: 0
      },
      price: {
        type: Sequelize.INTEGER,
        comment: '现价'
      },
      cost_price: {
        type: Sequelize.INTEGER,
        comment: '原价'
      },
      default_sku_id: {
        type: Sequelize.INTEGER,
        comment: '默认sku_id'
      },
      is_show_stock: {
        type: Sequelize.TINYINT,
        comment: '是否显示库存',
        defaultValue: 1
      },
      goods_specs_type: {
        type: Sequelize.TINYINT,
        comment: '商品规格 1统一规格 2多规格',
        allowNull: false,
        defaultValue: 1
      },
      main_image: {
        type: Sequelize.STRING,
        comment: '主图'
      },
      description: {
        type: Sequelize.TEXT,
        comment: '描述'
      },
      banner_image: {
        type: Sequelize.STRING,
        comment: '首页显示banner图'
      },
      is_index_recommend: {
        type: Sequelize.TINYINT,
        comment: '是否在首页banner显示',
        defaultValue: 0
      },
      sort: {
        type: Sequelize.INTEGER,
        comment: '排序'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('goods')
  }
}
