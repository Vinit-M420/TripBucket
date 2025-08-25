import express from "express";
import { ContentModel, TripModel } from "../db/db.js";
import { userAuth, type CustomRequest } from "../middleware/user_auth.js";
import { UserTripSchema } from "../schemas/trip_schema.js";
import { HttpStatusCode } from "../schemas/responses.js"

const router = express.Router(); 

router.get("/public/:shareId", async function (req, res){
    const trip = await TripModel.findOne({ shareId: req.params.shareId, isPublic: true });
    if (!trip){
        res.status(HttpStatusCode.Forbidden).json({
            message:"No trip found"
        })
    }
    else{
        const contents = await ContentModel.find({ tripId: trip._id })
        res.status(HttpStatusCode.Ok).json({ trip, contents })
    }
});

router.use(userAuth);

router.post("/", async function (req:CustomRequest, res) {
    const userId = req.userId;
    if (!userId) {
        return res.status(HttpStatusCode.Unauthorized).json({
            message: "User not authenticated"
        });
    }

    const parsedTrip= UserTripSchema.safeParse(req.body);
    if (!parsedTrip.success){
         return res.status(HttpStatusCode.Forbidden).json({
            message: "Incorrect format"
        })
    }

    const { destination, bucketlist, to_date, from_date, bannerURL } = req.body;
    let existingTrip = await TripModel.findOne({ userId, destination }); 
    if (existingTrip){
        return res.status(HttpStatusCode.Forbidden).json({
            message: "Trip to this destination already exists"
        })
    }

    try{
        const trip = await TripModel.create({
            userId , destination, bucketlist, to_date, from_date, bannerURL
        });

        if (!trip){
            res.status(HttpStatusCode.InputError).json({
                message: "Failed to create the trip"
            })
        }
        res.status(HttpStatusCode.Ok).json({ 
            message: "Trip created", 
            destination, userId
        })
    }
    catch(err){
        res.status(HttpStatusCode.InputError).json({ 
            message: "Wrong Details",
            error: err
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
            message: "No trip found"
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
        const editBody = req.body;
        const updatedResult = await TripModel.updateOne( {_id: id, userId: userId },
                                         editBody,
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
    } catch(err) {
        return res.status(HttpStatusCode.ServerError).json({
             error: "Server Error: Failed to update the trip"
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
            message: "Trip deleted",
            deletedTrip: deletedTrip
        })
    } catch(err){
        return res.status(HttpStatusCode.ServerError).json({
             error: "Server Error: Failed to delete the trip"
        })
    }
});

router.patch("/public/:id" , async function (req:CustomRequest, res) {
    const userId = req.userId;
    const { id } = req.params;

    const trip = await TripModel.findOne({ userId, _id: id });
    if (!trip) {
        return res.status(HttpStatusCode.Unauthorized).json({
            message: "No trip found"
        });
    }
    try{
        trip.isPublic = !trip.isPublic;
        await trip.save();
        res.status(HttpStatusCode.Ok).json({
            message: `Trip is now ${trip.isPublic ? "public" : "private"}`,
            trip
        });
    }catch{
        res.status(HttpStatusCode.ServerError).json({
            error: "Server Error: Error in changing the trip's access"
        })
    }
});

export default router;