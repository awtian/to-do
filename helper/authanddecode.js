const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  jwt.verify(req.headers.token, process.env.SECRET_KEY, (err, decoded) => {
    if (decoded !== undefined) {
      req.headers.userid = decoded._id
      req.headers.email = decoded.email
      req.headers.name = decoded.name
      next()
    }  else {
      res.send({message: 'kami tidak mengenali token anda! :( mungkin anda belum login? hhe'})
    }
  })
}