const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken (email, id) {
    return jwt.sign({ id, email },  process.env.JWT_SECRET, { expiresIn : "30d" });
}

async function handleUserSignup(req,res) {
    const { name, email, password } = req.body;

    const isExistingUser = User.findOne({email});

    if(isExistingUser) {
        return res.status(400).json({msg : "User already exists. Login!"});
    }

    const user = await User.create({ name, email, password }); //our pre save function will handle the password hash

    if(user) {
        res.status(200).json({
            _id : user._id,
            email : user.email,
            name : user.name,
            token : generateToken(user.email, user._id),
        });
    } else {
        res.status(400).json({msg : "Failed to create user. Check data and signup again"});
    }


}

async function handleUserLogin(req,res) {
    const {email,password} = req.body;

    const user = await User.findOne({email});

    passwordMatches = await user.matchPassword(password);


    if(user && passwordMatches) {
        res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user.email,_id),
        });
    } else {
        res.status(401).json({
            msg : "Invalid email or password"
        })
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}