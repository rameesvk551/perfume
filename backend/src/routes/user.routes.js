const express = require('express');
const router = express.Router();
const { authUser, registerUser, getUserProfile, getUsers } = require('../controllers/user.controller');
const { protect, admin } = require('../middleware/auth.middleware');

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);

module.exports = router;
