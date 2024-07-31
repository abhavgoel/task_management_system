const express = require("express");
const router = express.Router();
const { handleCreateTask } = require("../controllers/taskController")

router.get("/createTask", (req,res) => {
    return res.render("createTask" , {
        user : req.user
    })
});

router.post("/createTask" , handleCreateTask);

module.exports = router;