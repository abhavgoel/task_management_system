const express = require("express");
const router = express.Router();

router.get("/createTask", (req,res) => {
    return res.render("createTask" , {
        user : req.user
    })
});

module.exports = router;