const express = require('express')
const router = express.Router()
const { goods_spec_value } = require('../../../models')
const { Op } = require('sequelize')

router.post('/create', async (req, res, next) => {
  let { name, spec_id } = req.body
  try {
    let data = await goods_spec_value.create({
      spec_id,
      name
    })
    if (data) {
      res.json({
        data,
        message: '规格属性创建成功',
        code: 200
      })
    } else {
      res.json({
        data,
        message: '规格属性创建失败',
        code: 401
      })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/update', async (req, res, next) => {
  let { id, name, status } = req.body

  try {
    let data = await goods_spec_value.findOne({
      where: {
        id
      }
    })
    if (data) {
      await data.update({
        name,
        status
      })
      res.json({ data, message: '规格属性更新成功', code: 200 })
    } else {
      res.json({ data, message: '规格属性更新失败', code: 401 })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/delete', async (req, res, next) => {
  let { id } = req.body
  try {
    let data = await goods_spec_value.findOne({
      where: {
        id
      }
    })
    if (data) {
      await data.destroy()
      res.json({
        data,
        message: '删除成功',
        code: 200
      })
    } else {
      res.json({
        data,
        message: '无效的id',
        code: 401
      })
    }
  } catch (error) {
    next(error)
  }
})
router.get('/list', async (req, res, next) => {
  let { status, spec_id, ids } = req.query
  status = Number(status)
  spec_id = Number(spec_id)
  try {
    let where = {}
    if (status === 0 || status === 1) {
      where = Object.assign({ status }, spec_id && { spec_id }, ids && { [Op.in]: ids })
    } else {
      where = Object.assign(spec_id && { spec_id }, ids && { [Op.in]: ids })
    }
    let data = await goods_spec_value.findAll({ where })
    res.json({ data, message: 'OK', code: 200 })
  } catch (error) {
    next(error)
  }
})

module.exports = router
