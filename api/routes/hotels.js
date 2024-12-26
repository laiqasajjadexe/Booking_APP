import express from "express";
import Hotel from "../models/hotel.js"; 
const router =express.Router();

//create new hotel entry in database
router.post("/", async (req,res)=>{ //async makes sure that other tasks continue while saving the new entry in database in the background instead of blocking the entire application

    const newHotel= new Hotel (req.body);//new hotel entered by the admin
    try{
        const savedHotel= await newHotel.save(); //adding the new hotel to database, 'await' makes sure to wait until the promise is resolved
        res.status(200).json(savedHotel); // positive response OK
    }catch(err){ //handles the error Internal Server Error
        res.status(500).json(err);
    }
});
//update

//delete

//get

//get all


export default router;