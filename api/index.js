import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();

//api creation or sending the response to a request
app.get("/api/test/users", (req, res) => {
    res.send("Hello! This message is coming from the backend server!");
});

//making a connection between mongodb and backend
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDb");
    } catch (error) {
        throw error;
    }
};

//Event handler(if mongodb disconnects)
mongoose.connection.on("disconnected", () => {
    console.log("MongoDb disconnected")
});

/*Event handler(if mongodb is connected or reconnects)
mongoose.connection.on("connected",()=>{
    console.log("MongoDb connected again")
});*/
app.use(cors());
app.use(cookieParser()); //middlewar for cookie

//middleware cause we can't directly send json object to json server
app.use(express.json());

//middlewares used to reach the requests and send back response before sending anything to user
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });

});

//start the express server and listens for the incoming requests
app.listen(8000, () => {
    connect();
    console.log("Connected to Backend!");
});