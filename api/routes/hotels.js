import express from "express";
import { createError } from "../utils/error.js";
import Hotel from "../models/hotel.js"; 
import { createHotel, updateHotel, deleteHotel, getHotel,getHotels } from "../controllers/hotelController.js";

const router =express.Router();

//create new hotel entry 
router.post("/", createHotel); 

//update
router.put("/:id", updateHotel);

//delete
router.delete("/:id", deleteHotel);

//get
router.get("/:id", getHotel);

//get all
router.get("/", getHotels);

export default router;