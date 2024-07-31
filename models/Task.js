const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title : {
        type: String,
        required:true
    }, 
    creator : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    assignee : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true,

    },
    dueDate : {
        type: Date,
        required : true
    },
    priority : {
        type:String,
        requiured : true
    },
    status : {
        type: String,
        enum : ['Pending' , 'Completed'],
        default : "Pending"
    },
    description : {
        type : String,

    },
    attachments: [{
        filename: String,
        originalname: String
    }]
}, {timestamps : true});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;