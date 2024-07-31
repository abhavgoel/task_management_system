const express = require("express");
const router = express.Router();
const { handleCreateTask, 
        handlePersonalTasks, 
        handleAssignedTasks,
        handleGetTaskDetails,
        handleUpdateTaskStatusByAssignee,
        handleUpdateTaskByCreator,
        handleGetEditTaskByCreator} = require("../controllers/taskController")

router.get("/createTask", (req,res) => {
    return res.render("createTask" , {
        user : req.user
    })
});

router.post("/createTask" , handleCreateTask);

router.get("/myTasks", handlePersonalTasks);

// router.post("/edit/:id",)

router.get("/assignedTasks",handleAssignedTasks);

router.get("/updateStatus/:id", handleGetTaskDetails);

router.post("/updateStatus/:id",handleUpdateTaskStatusByAssignee );

router.get("/edit/:id", handleGetEditTaskByCreator);

module.exports = router;