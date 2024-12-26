import express from "express";

const router =express.Router();

router.get("/", (req,res) =>{
    res.send("Hello,this is the Auth endpoint");
});
router.get("/registers", (req,res) =>{
    res.send("Hello,this is the Auth registers endpoint");
});
export default router;