const express = require('express');
const {signIn, signUp, signOut} = require('../controllers/authenticationControllers');

const router = express.Router()

// sign up
router.post('/signup', signUp);

// sign in
router.post('/signin', signIn);

// sign out
router.post('/signout', signOut)

module.exports = router;