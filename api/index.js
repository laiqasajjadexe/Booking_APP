import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

const app=express();
dotenv.config();

//api creation or sending the response to a request
app.get("/api/test/users", (req, res) => {
    res.send("Hello! This message is coming from the backend server!");
});

//making a connection between mongodb and backend
const connect= async () =>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDb");
      } catch (error) {
        throw error ;
      }
};

//Event handler(if mongodb disconnects)
mongoose.connection.on("disconnected",()=>{
    console.log("MongoDb disconnected")
});

/*Event handler(if mongodb is connected or reconnects)
mongoose.connection.on("connected",()=>{
    console.log("MongoDb connected again")
});*/

//middleware cause we can't directly send json object to json server
app.use(express.json());

//middlewares
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);


//start the express server and listens for the incoming requests
app.listen(8900, ()=>{
    connect();
    console.log("Connected to Backend!");
});