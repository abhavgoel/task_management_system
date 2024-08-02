const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require('bcryptjs');
const { sendOtpNotification } = require("../utils/notify")
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
            return res.cookie("token", token).redirect("/user/userHome");
        } else {
            return res.render("login", { msg: "Incorrect email or password" });
        }
    } catch (error) {
        console.error(error);
        return res.render("login", { msg: "An error occurred. Please try again." });
    }
}

async function handleSendOtp(req,res) {
    const { email } = req.body;

    const otp = crypto.randomInt(100000,999999);
    const user = await User.findOne({email});

    if (!user) {
        return res.render("resetPassword", {
            userNotFoundMsg : "User not found!"
        })
    }

    user.resetOtp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000; //5 min expiry

    await user.save();

    await sendOtpNotification(email,user);

    return res.render("resetPassword", {
        otpSuccessfulMsg : "OTP sent to your mail",
        email: email
    });
}

async function handleVerifyOtpAndResetPassword(req, res) {
    const { email, otp, newPassword, confirmNewPassword } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.render("resetPassword", {
                userNotFoundMsg : "User not found!"
            })
        }

        // Check if OTP is expired
        if (Date.now() > user.otpExpiry) {
            return res.render("resetPassword", {
                email: email,
                otpExpiredMSg : "OTP has expired"
            })
        }

        // Check if OTP is correct
        if (user.resetOtp !== otp) {
            return res.render("resetPassword", {
                email : email,
                otpIncorrectMsg : "Incorrect OTP"
            })
        }

        // Check if new password and confirm password match
        if (newPassword !== confirmNewPassword) {
            return res.render("resetPassword", {
                email : email,
                passwordNotMatchMsg : "Passwrods do not match"
            })
        }

        // Update the user's password and clearing the otp from DB
        user.password = newPassword;
        user.resetOtp = undefined;
        user.otpExpiry = undefined; 

        await user.save();
        res.render("resetPassword", {
            passwordResetSuccessMsg : "Password reset successfully. You can login now."
        });
    } catch (error) {
        console.log(error);
        res.render("resetPassword", {
            passwordResetErrorMsg : "Error resetting password."
        });
    }
}


module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleSendOtp,
    handleVerifyOtpAndResetPassword
};
