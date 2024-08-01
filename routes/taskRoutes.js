const express = require("express");
const router = express.Router();
const { handleCreateTask,
    handlePersonalTasks,
    handleAssignedTasks,
    handleGetTaskDetails,
    handleUpdateTaskStatusByAssignee,
    handleUpdateTaskByCreator,
    handleGetEditTaskByCreator,
    handleGetTasksAssignedByUser,
    handleDeleteTask,
    handleAddAttachment,
    handleDeleteAttachment,
    handleDownloadfile } = require("../controllers/taskController")



//Multer setup -------------------------------------------------
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
  
const upload = multer({ storage: storage });
// -----------------------------------------------------------------

router.get("/createTask", (req, res) => {
    return res.render("createTask", {
        user: req.user
    })
});

//create task
router.post("/createTask", handleCreateTask);

//get self tasks
router.get("/myTasks", handlePersonalTasks);

//get tasks assigned to user
router.get("/assignedTasks", handleAssignedTasks);

//get task details
router.get("/updateStatus/:id", handleGetTaskDetails);

//update task status
router.post("/updateStatus/:id", handleUpdateTaskStatusByAssignee);

//get task creatoe wants to edit
router.get("/edit/:id", handleGetEditTaskByCreator);

//update task creator wants to update
router.post("/edit/:id", handleUpdateTaskByCreator);

//get tasks assigned by user
router.get("/myAssignedTasks", handleGetTasksAssignedByUser);

//delete a task
router.post("/delete/:id", handleDeleteTask)

//add attachment
router.post("/addAttachment/:id",upload.single('attachment'),handleAddAttachment);

//delete attachment
router.post("/deleteAttachment/:taskId/:filename", handleDeleteAttachment);

router.get("/attachments/:filename", handleDownloadfile)

module.exports = router;