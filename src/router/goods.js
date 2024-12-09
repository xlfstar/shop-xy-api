const express = require('express')
const router = express.Router()
const { goods } = require('../../models')
const { Op } = require('sequelize')

router.post('/create', async (req, res, next) => {
  let { price, cost_price, ...values } = req.body
  values = {
    ...values,
    ...{ price: price * 100, cost_price: cost_price * 100 }
  }

  try {
    let data = await goods.create(values)
    console.log('---------------------------',data);
    if (data) {
      res.json({
        data,
        message: '创建成功',
        code: 200
      })
    } else {
      res.json({
        data,
        message: '创建失败',
        code: 401
      })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/update', async (req, res, next) => {
  let { id, price, cost_price, ...updateFields } = req.body
  let params = { price: price * 100, cost_price: cost_price * 100 }
  Object.entries(updateFields).forEach(([key, value]) => {
    if (value !== undefined) {
      params[key] = value
    }
  })
  try {
    let data = await goods.update(params, {
      where: {
        id
      }
    })
    if (data) {
      res.json({ data, message: '商品更新成功', code: 200 })
    } else {
      res.json({ data, message: '商品更新失败', code: 401 })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/delete', async (req, res, next) => {
  let { id } = req.body
  try {
    let data = await goods.findOne({
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
  let { title, page = 1, limit = 20, status, orderby, cate_id } = req.query
  let { field = 'updatedAt', direction = 'DESC' } = orderby || {}
  console.log('---status',status,'----cate_id',cate_id);
  status = Number(status)
  page = Number(page)
  limit = Number(limit)
  cate_id = Number(cate_id)
  try {
    let where = Object.assign(
      {},
      (status === 0 || status === 1) && { status },
      title && {
        title: { [Op.substring]: title }
      },
      cate_id && { cate_id }
    )
    if (page < 1) page = 1
    const offset = (page - 1) * limit

    let { rows, count } = await goods.findAndCountAll({
      where,
      order: [[field, direction]],
      offset,
      limit
    })
    if (rows) {
      res.json({
        count,
        data: rows,
        message: 'OK',
        code: 200
      })
    } else {
      res.json({
        data,
        message: '服务器出错',
        code: 401
      })
    }
  } catch (error) {
    next(error)
  }
})

router.get('/findOne/:id', async (req, res, next) => {
  let { id } = req.params
  try {
    let data = await goods.findOne({ where: { id } })
    if (data) {
      res.json({
        data,
        message: 'OK',
        code: 200
      })
    } else {
      res.json({
        data,
        message: '商品id不存在',
        code: 401
      })
    }
  } catch (error) {
    next()
  }
})

router.get('/banner/list', async (req, res, next) => {
  // let { field = 'updatedAt', direction = 'DESC' } = orderby || {}
  try {
    let data = await goods.findAll({
      where: { status: 1, is_index_recommend: 1 },
      order: [['updatedAt', 'DESC']]
    })
    if (data) {
      res.json({
        data: data,
        message: 'OK',
        code: 200
      })
    } else {
      res.json({
        data,
        message: '服务器出错',
        code: 401
      })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
