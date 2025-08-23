import express from "express";
import { TripModel, ContentModel } from "../db/db.js";
import { userAuth, type CustomRequest } from "../middleware/user_auth.js"
import { HttpStatusCode } from "../schemas/responses.js"
import { TripContentSchema } from "../schemas/content_schema.js";

const router = express.Router(); 
router.use(userAuth);

router.post('/:tripId', async function (req:CustomRequest, res) {
    const userId = req.userId;
    const { tripId } = req.params;

    const trip = await TripModel.find({ userId: userId, _id: tripId });
    if (!trip){
        return res.status(HttpStatusCode.InputError).json({
            error: "Trip Not Found"
        })
    }
    const parsedContent = TripContentSchema.safeParse(req.body);
        if (!parsedContent.success){
             return res.status(HttpStatusCode.Forbidden).json({
                message: "Incorrect format",
                error: parsedContent.error
            })
    }
    
    const { type, title, value } = parsedContent.data;
    try{
        const content = await ContentModel.create({ userId, tripId, type, title, value });
        return res.status(HttpStatusCode.Ok).json({ 
            message: "Content added to the trip", content: content
        })
    }
    catch(err){
        return res.status(HttpStatusCode.ServerError).json({
            message: "Server Error: Error in adding the content"
        })
    }
})

router.put("/:tripId/edit/:contentId", async function (req:CustomRequest, res) {
    const userId = req.userId;
    const { tripId, contentId } = req.params;
    const content = await ContentModel.findOne({ userId, tripId, _id: contentId });
    if (!content){
        return res.status(HttpStatusCode.InputError).json({
            error: "Content Not Found"
        })
    }

    const PartialContentSchema = TripContentSchema.partial();
    const parsedContent = PartialContentSchema.safeParse(req.body);
        if (!parsedContent.success){
             return res.status(HttpStatusCode.Forbidden).json({
                message: "Incorrect format",
                error: parsedContent.error
            })
    }
    const updateData = parsedContent.data;
    try{
        const content = await ContentModel.findOneAndUpdate({ _id: contentId, userId, tripId }, 
            updateData, { new: true, runValidators: true });
        
        if (!content) {
            return res.status(HttpStatusCode.InputError).json({
            error: "Content Not Updated"
            })
        }
        return res.status(HttpStatusCode.Ok).json({ 
            message: "Trip Content updated", content: content
        })
    }
    catch(err){
        return res.status(HttpStatusCode.ServerError).json({
            message: "Server Error: Error in updating the content"
        })
    }
})

router.delete("/:tripId/delete/:contentId", async function (req:CustomRequest, res) {
    const userId = req.userId;
    const { tripId, contentId } = req.params;
    const content = await ContentModel.findOne({ userId, tripId, _id: contentId });
    if (!content){
        return res.status(HttpStatusCode.InputError).json({
            error: "Content Not Found"
        })
    }

    try{
        const content = await ContentModel.findOneAndDelete({ _id: contentId, userId, tripId });
        
        if (!content) {
            return res.status(HttpStatusCode.InputError).json({
            error: "Content Not Deleted"
            })
        }
        res.status(HttpStatusCode.Ok).json({
            message: "Trip Content is deleted successfully",
            deletedContent: content
        })
    }
    catch(err){
        return res.status(HttpStatusCode.ServerError).json({
            message: "Server Error: Error in deleting the content"
        })
    }

});

router.get("/:tripId/all", async function (req:CustomRequest, res) {
    const userId = req.userId;
    const { tripId } = req.params;
    const trips =  await ContentModel.find({ userId: userId, tripId: tripId });
    if (trips.length === 0){
        return res.status(HttpStatusCode.Unauthorized ).json({
            error: "No Trip Content Not Found"
        })
    }

    res.status(HttpStatusCode.Ok).json({
            message: "Content Found",
            trips
    })
})

export default router;