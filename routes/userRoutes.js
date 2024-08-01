const express = require("express");
const router = express.Router();
const { handleUserLogin, handleUserSignup } = require("../controllers/authController");
const { requireAuth } = require("../middlewares/authorization")
const Task = require("../models/Task")

router.get("/login", (req, res) => {
    return res.render("login");
});
router.post("/login", handleUserLogin);

router.get("/signup", (req, res) => {
    return res.render("registration");
});

router.post("/signup", handleUserSignup);


// Fetch tasks that are due within the next 7 days to show them on the user home screen
router.get("/userHome", requireAuth, async (req, res) => {
    // console.log(req.user);
    const userId = req.user._id;
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    try {
        const tasksNearDueDate = await Task.find({
            assignee: userId,
            dueDate: { $gte: today, $lte: nextWeek },
            status: { $ne: 'Completed' } // Exclude tasks with status "completed"
        }).populate("assignee", "name")
            .populate("creator", "name");

        return res.render("userHome", {
            user: req.user,
            tasks: tasksNearDueDate
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
})

router.get("/resetPassword", (req,res) => {
    return res.render("resetPassword");
});

router.post("")

module.exports = router;