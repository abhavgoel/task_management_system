const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name : {
        type : String , 
        required:true,

    },

    email : {
        type: String,
        required : true,
        unique : true
    },

    password : {
        type:String, 
        required : true
    },
    group : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Group'
    }

});

userSchema.static("matchPassword", async (enteredPassword) => {
    return await bcrypt.compare(enteredPassword, this.password);
});

const User = mongoose.model("User", userSchema);

module.exports = User;