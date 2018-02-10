const todoModel = require('../models/todo.js');

class todoController {


static createTodo (req, res) {
  
  todoModel.create({
    owner: req.headers.userid,
    title: req.body.title,
    description: req.body.description
  })
    .then(newtodo => res.send({message: 'new todo has been created!', details: newtodo}))
    .catch(err => res.status(500).send({message: "error creating new todo", details: err}))


}

static myTodo (req, res) {
  
  todoModel.find({
    owner: req.headers.userid
  })
    .then(todolist => res.send({message: 'this is your todolist!', details: todolist}))
    .catch(err => res.status(500).send({message: "error fetching your todos", details: err}))


}

static findById (req,res) {

  todoModel.find({
    owner: req.headers.userid,
    _id: req.params.id
  })
    .then(todo => res.send({message: "this is your queried todo", details: todo}))

}



static deleteTodo (req, res) {
  
  todoModel.remove({
    owner: req.headers.userid,
    _id: req.params.id
  })
    .then(deleted => {
      deleted.n == 1 ? res.send({message: "anda berhasil menghapus data ini!", id: req.params.id }) : 
      res.send({message:'data yang anda cari tidak dapat ditemukan, atau anda bukan owner data tersebut~!'})
    })
}


static toggleTodo (req,res) {
  todoModel.findOne({
    owner: req.headers.userid,
    _id: req.params.id
  })
    .then(todo => {
      if (todo) {
        todo.done = !todo.done
        todoModel.update({owner: req.headers.userid, _id: req.params.id}, {$set: {done: todo.done}})
          .then(data => res.send({message: 'your data have been updated!', details: todo}))
      } else {
        res.send({message: 'anda tidak memiliki akses atau todo tidak ada!'})
      }
    })
}


static editTodo (req,res) {
  todoModel.findOne({
    owner: req.headers.userid,
    _id: req.params.id
  })
    .then(todo => {
      if (todo) {
        todo.title = req.body.title
        todo.description = req.body.description

        todoModel.update({owner: req.headers.userid, _id: req.params.id}, {$set :{title: todo.title, description: todo.description}})
          .then(data => res.send({message: 'your data have been updated!', details: todo}))
      } else {
        res.send({message: 'anda tidak memiliki akses atau todo tidak ada!'})
      }
    })
}



}

module.exports = todoController;