const express = require("express");
const router = express.Router();
const { handleUserLogin, handleUserSignup } = require("../controllers/authController");

router.get("/login", (req,res) => {
    return res.render("login");
})
router.post("/login", handleUserLogin);

router.get("/signup", (req,res) => {
    return res.render("registration");
})
router.post("/signup", handleUserSignup);

router.get("/userHome", (req,res) => {
    return res.render("userHome");
})

module.exports = router;