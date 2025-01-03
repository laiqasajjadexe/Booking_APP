import express from "express";
import { updateUser, deleteUser, getUser, getUsers } from "../controllers/userController.js";
import {verifyToken, verifyUser, verifyAdmin} from "../utils/verifyToken.js";

const router =express.Router();

//authentication
router.get("/checkauthentication", verifyToken, (req,res,next)=>{
    res.send("Hello User! You are logged in");
});

//verify user
router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
   res.send("hello user, you are logged in and you can delete your account");
 });

 //verify admin
router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
      res.send("hello admin, you are logged in and you can delete all accounts");
});

//update
router.put("/:id",verifyUser, updateUser);

//delete
router.delete("/:id", verifyUser, deleteUser);

//get
router.get("/:id",verifyUser, getUser);

//get all
router.get("/",verifyAdmin, getUsers);

export default router;