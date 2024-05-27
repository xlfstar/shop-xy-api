const express = require('express')
const { sequelize } = require('../models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { SERVER_PORT } = require('./constant')

const app = express()
app.use(
  fileUpload({
    createParentPath: true
  })
)

app.use(express.static('uploads'))

app.use(cors())
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'content-type')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
/* 使用bodyParser处理请求参数*/
const bodyParser = require('body-parser')
app.use(express.json())
app.use(express.urlencoded())
app.use(bodyParser.urlencoded({ extended: true }))

const {
  mCategoryRouter,
  pubRouter,
  mGoodsRouter,
  mUploadRouer,
  mGoodsSpecRouter,
  mGoodsSpecValueRouter,
  mGoodsSkusRouter,
  mOrderRouter,
  mPayMethodRouter,
  mBrandRouter,
  categoryRouter,
  goodsRouter,
  goodsSpecRouter,
  goodsSpecValueRouter,
  goodsSkusRouter,
  orderRouter,
  payMethodRouter,
  brandRouter,
  wxRouter
} = require('./router')
app.use('/', pubRouter)
app.use('/m/category', mCategoryRouter)
app.use('/m/goods', mGoodsRouter)
app.use('/m/action', mUploadRouer)
app.use('/m/spec', mGoodsSpecRouter)
app.use('/m/attr', mGoodsSpecValueRouter)
app.use('/m/sku', mGoodsSkusRouter)
app.use('/m/order', mOrderRouter)
app.use('/m/payMethod', mPayMethodRouter)
app.use('/m/brand', mBrandRouter)
app.use('/category', categoryRouter)
app.use('/goods', goodsRouter)
app.use('/spec', goodsSpecRouter)
app.use('/attr', goodsSpecValueRouter)
app.use('/sku', goodsSkusRouter)
app.use('/order', orderRouter)
app.use('/payMethod', payMethodRouter)
app.use('/brand', brandRouter)
app.use('/wx', wxRouter)

const alter = false

if (alter) {
  sequelize
    .sync({ alter: true })
    .then(() => {
      app.listen(3001, () => {
        console.log('shop-xy服务器启动成功----:3001')
      })
    })
    .catch((error) => {
      console.error('Error: synchronizing database:', error)
    })
} else {
  app.listen(SERVER_PORT, () => {
    console.log('shop-xy服务器启动成功,端口:', SERVER_PORT)
  })
}
