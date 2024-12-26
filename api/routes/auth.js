//file for authentication , will include cookies, json tokens etc
import express from "express";

const router =express.Router();

//route for handling the get request at auth endpoint
router.get("/", (req,res) =>{
    res.send("Hello,this is the Auth endpoint");
});

//route for handling the get request at auth/registers endpoint
router.get("/registers", (req,res) =>{
    res.send("Hello,this is the Auth registers endpoint");
});

export default router;