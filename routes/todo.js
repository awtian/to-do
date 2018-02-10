const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo')
const authAndDecode = require('../helper/authanddecode')

/* GET home page. */
router.get('/', authAndDecode, todoController.myTodo)
router.post('/', authAndDecode, todoController.createTodo);
router.get('/:id', authAndDecode, todoController.findById)
router.patch('/:id', authAndDecode, todoController.toggleTodo)
router.put('/:id', authAndDecode, todoController.editTodo)
router.delete('/:id', authAndDecode, todoController.deleteTodo)

module.exports = router;
