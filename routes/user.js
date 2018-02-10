const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')


/* GET users listing. */
router.post('/', userController.findOrCreate);

module.exports = router;
