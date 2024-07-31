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

    return res.redirect
}

async function handlePersonalTasks(req,res) {
    const myTasks = await Task.find({creator : req.user._id , assignee : req.user._id});
    return res.render("myTasks" , {
        myTasks,
    });
}

async function handleAssignedTasks(req,res) {
    const assignedTasks = await Task.find({assignee : req.user._id});
    

}

module.exports = {
    handleCreateTask,
    handlePersonalTasks,
    handleAssignedTasks,
    
}

