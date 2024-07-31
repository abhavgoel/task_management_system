const express = require("express");
const router = express.Router();
const { handleCreateTask, handlePersonalTasks, handleAssignedTasks,} = require("../controllers/taskController")

router.get("/createTask", (req,res) => {
    return res.render("createTask" , {
        user : req.user
    })
});

router.post("/createTask" , handleCreateTask);

router.get("/myTasks", handlePersonalTasks);

// router.post("/edit/:id",)

router.get("/assignedTasks",handleAssignedTasks)

module.exports = router;