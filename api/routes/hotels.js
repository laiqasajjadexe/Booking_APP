import express from "express";
import Hotel from "../models/hotel.js"; 
const router =express.Router();

//create new hotel entry in database, post is used for creating and uploading a new entry
router.post("/", async (req,res)=>{ //async makes sure that other tasks continue while saving the new entry in database in the background instead of blocking the entire application

    const newHotel= new Hotel (req.body);//new hotel entered by the admin
    try{
        const savedHotel= await newHotel.save(); //adding the new hotel to database, 'await' makes sure to wait until the promise is resolved
        res.status(200).json(savedHotel); // positive response OK and .json is sending the response as json to send the savedhotel in db
    }catch(err){ //handles the error Internal Server Error
        res.status(500).json(err);
    }
});

//update
router.put("/:id", async (req,res)=>{ //put is used for updating a entry, url will be like http://localhost:8900/api/hotels/123

    try{
        const updatedHotel= await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body}, {new:true}); //mongodb method,operator used
        res.status(200).json(updatedHotel);
    }catch(err){ 
        res.status(500).json(err);
    }
});

//delete
router.delete("/:id", async (req,res)=>{ 
    try{
        await Hotel.findByIdAndDelete(req.params.id); //mongodb method
        res.status(200).json("The Hotel has been deleted");
    }catch(err){ 
        res.status(500).json(err);
    }
});

//get
router.get("/:id", async (req,res)=>{ //get is used to retrieve some data or info
    try{
        const hotel= await Hotel.findById(req.params.id); //mongodb method
        res.status(200).json(hotel);
    }catch(err){ 
        res.status(500).json(err);
    }
});


//get all
router.get("/", async (req,res)=>{ 
    try{
        const hotels= await Hotel.find(); //mongodb method
        res.status(200).json(hotels);
    }catch(err){ 
        res.status(500).json(err);
    }
});

export default router;