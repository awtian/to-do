const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const FB = require('fb');
const jwt = require('jsonwebtoken');



const userSchema = mongoose.Schema({
  name: String,
  email: String,
})

userSchema.statics.findOneOrCreate = function (token, cb) {
  const self = this
  FB.setAccessToken(token);


  FB.api('/me', { fields: 'name, email' })
    .then(data => {
      
      let userdata = {name: data.name, email: data.email}

      self.findOne( userdata )
        
        .then(result => {
          if (result) { 
            jwt.sign({name: result.name, email: result.email}, 'testkey', (err, tok) => {
              cb(tok, result)
            })
          }
          else {
            self.create(userdata)
              .then(cresult => {
                let jwtoken = jwt.sign({name: cresult.name, email: cresult.email}, 'testkey')
                cb(jwtoken, cresult)
              })
          }
        })

        .catch(err => cb({msg: 'error on find one / creating', err}))
        
    
    .catch(err => cb({msg: 'error on API', err}))

    })
  

}


module.exports = mongoose.model('User', userSchema)