import Hotel from "../models/hotel.js"; 
 
 //create
 export const createHotel= async (req,res,next) =>{
    const newHotel= new Hotel (req.body);//new hotel entered by the admin
    try{
        const savedHotel= await newHotel.save(); //adding the new hotel to database, 'await' makes sure to wait until the promise is resolved
        res.status(200).json(savedHotel); // positive response OK and .json is sending the response as json to send the savedhotel in db
    }catch(err){ //handles the error Internal Server Error
        next(err);
    }

 };

 //update
 export const updateHotel= async (req,res,next) =>{
     try{
            const updatedHotel= await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body}, {new:true}); //mongodb method,operator used
            res.status(200).json(updatedHotel);
        }catch(err){ 
            next(err);
        }
 };

 //delete
export const deleteHotel= async (req,res,next) =>{
    try{
           await Hotel.findByIdAndDelete(req.params.id); //mongodb method
           res.status(200).json("The Hotel has been deleted");
       }catch(err){ 
           next(err);
       }

 };

 //get hotel
 export const getHotel= async (req,res,next) =>{
     try{
            const hotel= await Hotel.findById(req.params.id); //mongodb method
            res.status(200).json(hotel);
        }catch(err){ 
            res.status(500).json(err);
        }

 };

 //get all hotels
 export const getHotels= async (req,res,next) =>{
    try{
            const hotels= await Hotel.find(); //mongodb method
            res.status(200).json(hotels);
        }catch(err){ 
         next(err);
        }

 };