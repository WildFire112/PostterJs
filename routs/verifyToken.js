const jwt = require('jsonwebtoken')
const User = require('../models/User')


module.exports = async (req, res, next) => {
  const token = req.header('auth-token')
  if (!token) return res.status(401).send('Access Denied')

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    const id = await User.findById(verified._id)
    if (id) {
      req.user = verified
      next()
    }
    else res.status(400).send('User is missing')
  } catch (err) {
    res.status(400).send('Invalid Token')
  }
}
