const Task = require("../models/Task");
const User = require("../models/User");
const path = require("path");
const fs = require("fs");


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

async function handleDeleteTask(req, res) {
    const taskId = req.params.id;
    try {
      await Task.findByIdAndDelete(taskId);
      const previousUrl = req.get('referer');
      res.redirect(previousUrl);
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).send('Internal Server Error');
    }
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
    return res.render("task", {
        task : task,
        user : req.user
    })
}

async function handleGetEditTaskByCreator(req,res) {
    const taskId = req.params.id;
    const task = await Task.findById(taskId).populate("assignee");
    // console.log(task)
    return res.render("editTask" , {
        task : task,
        user : req.user
    });
}
async function handleUpdateTaskByCreator(req,res) {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    task.title = req.body.title;
    task.assignee = await User.findOne({ email: req.body.assignee });
    task.dueDate = new Date(req.body.dueDate);
    task.priority = req.body.priority;
    task.description = req.body.description;

    // task = task.populate("assignee");
    await task.save();

    return res.render("editTask", {
        task:task,
        user:req.user,
        msg:"Task updated"
    })
}

async function handleGetTasksAssignedByUser(req,res) {
    const userId = req.user._id;
    const tasks = await Task.find({ creator: userId }).populate("assignee");
    return res.render("myAssignedTasks", {
        tasks: tasks,
        user: req.user
    });

}

async function handleAddAttachment (req,res) {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    let newAttachment = null;
    if (req.file) {
        newAttachment = {
            filename: req.file.filename,
            originalname: req.file.originalname
        }
    };
    task.attachments.push(newAttachment);
    await task.save();

    return res.redirect('back');
    
}

async function handleDeleteAttachment(req,res) {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);

    task.attachments = task.attachments.filter(attachment => attachment.filename !== req.params.filename);//update the task array removing the filename to be deleted
    let uploadPath = path.resolve("./uploads");
    uploadPath = path.join(uploadPath, req.params.filename);
    console.log(uploadPath)
    if (fs.existsSync(uploadPath)) {
        fs.unlinkSync(uploadPath);
    }
    await task.save();

    return res.redirect("back");
    
}

async function handleDownloadfile(req,res) {
    const uploadPath = path.resolve("./uploads")
    const filename = req.params.filename;
    const filePath = path.join(uploadPath, filename);

    res.download(filePath, filename, (err) => {
        if (err) {
          res.status(500).send('Error downloading file');
        }
    });
}




module.exports = {
    handleCreateTask,
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
    handleDownloadfile

}

