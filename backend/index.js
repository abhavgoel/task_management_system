require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const userRoute = require("./routes/userRoutes");
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



app.get("/",requireAuth,(req,res) => {
    return res.render("landingPage");
});
app.use("/user",userRoute)

app.listen(PORT, () => {
    console.log("Server listening on PORT: " + PORT);
})