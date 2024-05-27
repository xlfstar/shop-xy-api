const crypto = require('crypto')
const { SECRET_KEY } = require('../constant')

function md5(str) {
  const md5String = crypto.createHash('md5')
  const res = md5String.update(str).digest('hex')
  return res
}

function cryptoPassword(password) {
  const res = `password=${password}$key=${SECRET_KEY}`
  return md5(res)
}
module.exports = { cryptoPassword }
