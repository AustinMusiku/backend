const express = require('express');
const { getAllUsers, getUserById } = require('../controllers/userControllers');

const router = express.Router()

// get all users
router.get('/users', getAllUsers)
// get user by Id
router.get('/users/:id', getUserById)
// update user
// delete user
// forgot password
module.exports = router;