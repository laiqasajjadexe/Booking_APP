import express from "express";
import { createHotel, updateHotel, deleteHotel, getHotel,getHotels } from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router =express.Router();

//create new hotel entry 
router.post("/",verifyAdmin, createHotel); 

//update
router.put("/:id",verifyAdmin, updateHotel);

//delete
router.delete("/:id",verifyAdmin, deleteHotel);

//get
router.get("/:id", getHotel);

//get all
router.get("/", getHotels);

export default router;