const Task = require("../models/Task");
const User = require("../models/User");

async function handleCreateTask(req,res) { //TODO
    const { title, assignee, dueDate, priority, description  } = req.body;

    const creator = req.user._id;

    const assigneeUser = await User.findOne({email:assignee});

    
    const task = await Task.create({
        title,
        creator,
        assignee : assigneeUser._id,
        dueDate,
        priority,
        description,
        status: "Pending",
    });

    return res.redirect("/user/userHome")
}

async function handlePersonalTasks(req,res) {
    const myTasks = await Task.find({creator : req.user._id , assignee : req.user._id});
    return res.render("myTasks" , {
        user:req.user,
        tasks: myTasks,
    });
}

async function handleAssignedTasks(req,res) {
    const assignedTasks = await Task.find({assignee : req.user._id}).populate("creator");   
    return res.render("assignedTasks" , {
        user:req.user,
        tasks: assignedTasks,
    });
    
}

//TODO - add Tasks update delete endpoints
async function handleGetTaskDetails(req,res) {
    const taskId = req.params.id;
    const task = await Task.findById(taskId).populate("creator").populate("assignee");
    return res.render("task" , {
        task :task,
        user : req.user
    });
}

async function handleUpdateTaskStatusByAssignee(req,res) { //if provided only status as input
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    task.status = req.body.status;
    await task.save();
}



module.exports = {
    handleCreateTask,
    handlePersonalTasks,
    handleAssignedTasks,
    handleGetTaskDetails,
    handleUpdateTaskStatusByAssignee

}

