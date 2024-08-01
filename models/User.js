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
    },
    resetOtp : {
        type:String,
    },
    otpExpiry : {
        type:Date
    }

});

userSchema.pre("save", async function (next) {
    if(this.isModified("password")===false) {
        return next();
    }

    //using salt hash to encrppy user passwords
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
     let val = await bcrypt.compare(enteredPassword, this.password);
    //  console.log(val)
     return val;
};

const User = mongoose.model("User", userSchema);

module.exports = User;