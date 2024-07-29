const express = require("express");
const router = express.Router();
const { handleUserLogin, handleUserSignup } = require("../controllers/authController");

router.post("/login", handleUserLogin);
router.post("/signup", handleUserSignup);

module.exports = router;