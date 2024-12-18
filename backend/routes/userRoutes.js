const express = require("express");
const { registerUser, getUserProfile} = require("../controllers/user");
const router = express.Router();

router.route('/').post(registerUser);

router.route('/profile').post(protect, getUserProfile);

module.exports = router;    