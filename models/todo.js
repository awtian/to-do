const mongoose = require('mongoose');
const Schema = mongoose.Schema

const todoSchema = Schema({
  owner : {type: Schema.Types.ObjectId, ref: 'User'},
  todo: [{status: Boolean, desc: String}] 
})

module.exports = mongoose.model('Todo', todoSchema)