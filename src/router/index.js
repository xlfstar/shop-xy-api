const pubRouter = require('./login')

const mCategoryRouter = require('./m/category')
const mGoodsRouter = require('./m/goods')
const mUploadRouer = require('./m/upload')
const mGoodsSpecRouter = require('./m/goods_spec')
const mGoodsSpecValueRouter = require('./m/goods_spec_value')
const mGoodsSkusRouter = require('./m/goods_sku')
const mOrderRouter = require('./m/order')
const mPayMethodRouter = require('./m/paymentMethods')
const mBrandRouter = require('./m/brands')
const categoryRouter = require('./category')
const goodsRouter = require('./goods')
// const mUploadRouer = require('./m/upload')
const goodsSpecRouter = require('./goods_spec')
const goodsSpecValueRouter = require('./goods_spec_value')
const goodsSkusRouter = require('./goods_sku')
const orderRouter = require('./order')
const payMethodRouter = require('./paymentMethods')
const brandRouter = require('./brands')
const wxRouter = require('./wx/getAccessToken')
module.exports = {
  pubRouter,
  mCategoryRouter,
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
}
