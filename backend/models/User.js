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

userSchema.pre("save", async (next) => {
    if(this.isModified("password")===false) {
        next();
    }

    //using salt hash to encrppy user passwords
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.static("matchPassword", async (enteredPassword) => {
    return await bcrypt.compare(enteredPassword, this.password);
});

const User = mongoose.model("User", userSchema);

module.exports = User;