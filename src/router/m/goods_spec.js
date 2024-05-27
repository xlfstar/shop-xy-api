const express = require('express')
const router = express.Router()
const { goods_spec } = require('../../../models')

router.post('/create', async (req, res, next) => {
  let { name } = req.body
  try {
    let data = await goods_spec.create({
      name
    })
    if (data) {
      res.json({
        data,
        message: '商品规格创建成功',
        code: 200
      })
    } else {
      res.json({
        data,
        message: '商品规格创建失败',
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
    let data = await goods_spec.findOne({
      where: {
        id
      }
    })
    if (data) {
      await data.update({
        name,
        status
      })
      res.json({ data, message: '商品规格更新成功', code: 200 })
    } else {
      res.json({ data, message: '商品规格更新失败', code: 401 })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/delete', async (req, res, next) => {
  let { id } = req.body
  try {
    let data = await goods_spec.findOne({
      where: {
        id
      }
    })
    if (data) {
      await data.destroy()
      res.json({
        data,
        message: '商品规格删除成功',
        code: 200
      })
    } else {
      res.json({
        data,
        message: '无效的商品规格id',
        code: 401
      })
    }
  } catch (error) {
    next(error)
  }
})
router.get('/list', async (req, res, next) => {
  let { status = 1 } = req.query
  status = Number(status)
  try {
    let where = {}
    if (status === 0 || status === 1) {
      where = { status }
    }
    let data = await goods_spec.findAll({ where })
    res.json({ data, message: 'OK', code: 200 })
  } catch (error) {
    next(error)
  }
})

module.exports = router
