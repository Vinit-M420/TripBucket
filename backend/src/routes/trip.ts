import express from "express";
import { TripModel } from "../db/db.js";
import { userAuth, type CustomRequest } from "../middleware/user_auth.js";
import { UserTripSchema } from "../schemas/trip_schema.js";
import { HttpStatusCode } from "../schemas/responses.js"

const router = express.Router(); 
router.use(userAuth);


router.post("/", async function (req:CustomRequest, res) {
    const userId = req.userId;
    if (!userId) {
        return res.status(HttpStatusCode.Unauthorized).json({
            message: "User not authenticated"
        });
    }

    const parsedTrip= UserTripSchema.safeParse(req.body);
    if (!parsedTrip){
         return res.status(HttpStatusCode.Forbidden).json({
            message: "Incorrect format"
        })
    }

    const { destination, bucketlist, to_date, from_date, bannerURL } = req.body;
    let existingTrip = await TripModel.findOne({ userId, destination }); /// this any is a problem
    if (existingTrip){
        return res.status(HttpStatusCode.Forbidden).json({
            message: "Trip to this destination already exists"
        })
    }
    // console.log('Request body:', req.body);
    // console.log('Schema validation result:', parsedTrip);

    try{
        const trip = await TripModel.create({
            userId , destination, bucketlist, to_date, from_date, bannerURL
        });
        res.status(HttpStatusCode.Ok).json({ message: "Trip created", destination, userId})
    }
    catch(err){
        res.status(HttpStatusCode.InputError).json({ 
            message: "Wrong Details"
        })
    }
});

router.get("/all", async function (req:CustomRequest, res) {
    const userId = req.userId
    const trips = await TripModel.find({ userId })
    res.json({ trips })
});


router.put("/edit/:id", async function (req:CustomRequest, res) {
    const userId = req.userId;
    const { id } = req.params;

    const trip = await TripModel.findOne({ userId, _id: id });
    if (!trip) {
        return res.status(HttpStatusCode.Unauthorized).json({
            message: "User not authenticated"
        });
    }

    const PartialTripSchema = UserTripSchema.partial();
    const parsedTrip= PartialTripSchema.safeParse(req.body);
    if (!parsedTrip.success){
         return res.status(HttpStatusCode.Forbidden).json({
            message: "Incorrect format"
        })
    }
   
    try{
        const { destination, bucketlist, to_date, from_date, bannerURL } = req.body;
        const updatedResult = await TripModel.updateOne( {_id: id, userId: userId },
                                         { destination, bucketlist, to_date, from_date, bannerURL },
                                        { runValidators: true })
        
        if (updatedResult.modifiedCount === 0){
            return res.status(HttpStatusCode.BadRequest).json({
                message: "No changes made or trip not found"
            });
        }                                        
                                         
        const updatedTrip = await TripModel.findOne({ userId, _id: id });
        return res.status(HttpStatusCode.Ok).json({
            message: "Trip updated", 
            trip: updatedTrip
            })
    } catch(err){
        //console.error('Update trip error:', err);
        return res.status(HttpStatusCode.ServerError).json({
             message: "Server Error: Failed to update the trip"
        })
    }
});

router.delete("/delete/:id", async function (req:CustomRequest, res) {
    const userId = req.userId;
    const { id } = req.params;

    const trip = await TripModel.findOne({ userId, _id: id });
    if (!trip){
        return res.status(HttpStatusCode.BadRequest).json({
            message: "Invalid Trip ID given to delete"
        })
    }
  
    try{
        const deletedTrip = await TripModel.deleteOne({ _id: id, userId: userId })
        if (deletedTrip.deletedCount === 0) {
            return res.status(HttpStatusCode.BadRequest).json({
                message: "Failed to delete trip"
            });
        }
        return res.status(HttpStatusCode.Ok).json({
            message: "Trip deleted"
        })
    } catch(err){
        return res.status(HttpStatusCode.ServerError).json({
             message: "Server Error: Failed to delete the trip"
        })
    }
});

export default router;