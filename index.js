require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");

//Routes import----------------------------------------
const userRoute = require("./routes/userRoutes");
const taskRoute = require("./routes/taskRoutes");
//----------------------------------------------
const connectToMongoDb = require("./dbConnection");
const {requestLogger} = require("./middlewares/requestLogger");
const { requireAuth } = require("./middlewares/authorization");

const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(requestLogger("serverlog.txt"));
app.use(express.static(path.resolve("./public")))
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


//view engine setup
app.set("view engine" , "ejs");
app.set("views", path.resolve("./views"));

//db connection
connectToMongoDb(process.env.MONGO_URL).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});


//landing page
app.get("/",requireAuth,(req,res) => {
    return res.render("landingPage" , {
        user : req.user
    });
});
 
//Route registration to paths
app.use("/user",userRoute)
app.use("/tasks" , requireAuth, taskRoute);

app.listen(PORT, () => {
    console.log("Server listening on PORT: " + PORT);
})