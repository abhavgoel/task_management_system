require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const authRoute = require("./routes/authRoutes");
const connectToMongoDb = require("./dbConnection");
const {requestLogger} = require("./middlewares/requestLogger");
const { checkAuthorization } = require("./middlewares/authorization");

const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(requestLogger("serverlog.txt"));
app.use(express.static(path.resolve("./public")))
app.use(express.urlencoded({extended: false}));


//view engine setup
app.set("view engine" , "ejs");
app.set("views", path.resolve("./views"));

//db connection
connectToMongoDb(process.env.MONGO_URL).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});




app.use("/user",authRoute)

app.listen(PORT, () => {
    console.log("Server listening on PORT: " + PORT);
})