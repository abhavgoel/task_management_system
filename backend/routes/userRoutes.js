const express = require("express");
const router = express.Router();
const { handleUserLogin, handleUserSignup } = require("../controllers/authController");
const { requireAuth } = require("../middlewares/authorization")

router.get("/login", (req,res) => {
    return res.render("login");
})
router.post("/login", handleUserLogin);

router.get("/signup", (req,res) => {
    return res.render("registration");
})
router.post("/signup", handleUserSignup);

router.get("/userHome", requireAuth, (req,res) => {
    // console.log(req.user);
    return res.render("userHome", {
        user: req.user
    });
});

router.get("/logout", (req,res) => {
    res.clearCookie("token").redirect("/");
})

module.exports = router;