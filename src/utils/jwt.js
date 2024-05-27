const jwt = require('jsonwebtoken')

const jwtKey = 'xlfstar'

const jwtSign = (data) => {
  const token = jwt.sign(data, jwtKey, { expiresIn: 60 * 60 * 24 * 7 })
  console.log(token)
  return token
}

const jwtCheck = (req, res, next) => {
  const token = req.headers.token
  jwt.verify(token, jwtKey, (err, data) => {
    if (err) {
      res.send({
        code: '401',
        message: '无效的token'
      })
    } else {
      req.jwtInfo = data
      console.log({ data })
      next()
    }
  })
}

module.exports = { jwtSign, jwtCheck }
