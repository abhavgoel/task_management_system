const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(email, id) {
    return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

async function handleUserSignup(req, res) {
    const { name, email, password, confirmPassword  } = req.body;

    if(confirmPassword!==password){
        return res.render("registration" ,{msg : "Password do not match"})
    }
    try {
        const isExistingUser = await User.findOne({ email });

        if (isExistingUser) {
            return res.render("registration", { msg: "User already exists. Please log in." });
        }

        const user = await User.create({ name, email, password }); // our pre save function will handle the password hash
        // console.log(user)
        if (user) {
            // const token = generateToken(user.email, user._id);
            return res.render("login", { msg: "User created. You can login now." });
        } else {
            return res.render('registration', { msg: "Failed to create user. Check data and signup again." });
        }
    } catch (error) {
        console.error(error);
        return res.render('registration', { msg: "An error occurred. Please try again." });
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.render("login", { msg: "Incorrect email or password" });
        }

        const passwordMatches = await user.matchPassword(password);
        

        if (passwordMatches) {
            const token = generateToken(user.email, user._id);
            return res.cookie("token", token).redirect("/");
        } else {
            return res.render("login", { msg: "Incorrect email or password" });
        }
    } catch (error) {
        console.error(error);
        return res.render("login", { msg: "An error occurred. Please try again." });
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin
};
