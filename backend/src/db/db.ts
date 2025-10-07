import mongoose from "mongoose"
import dotenv   from 'dotenv';
import {nanoid} from "nanoid";
dotenv.config(); /// loads all the variable from .env file

export default async function connectToDatabase() {
    try {
        const uri = process.env.MONGOOSE_URI;
        if (!uri) {
            throw new Error("MONGOOSE_URI is not defined in environment variables");
        }
        await mongoose.connect(uri);
        console.log("Database connected");
    }
    catch (err) {
        console.log("Error in connecting with the Database", err);
    }
};

const UserSchema = new mongoose.Schema({
    firstName: {type:String, required:true},
    lastName:  {type:String},
    email:     {type:String, unique:true, required:true},
    password:  {type:String, required:true},
    createdAt: {type:Date,   default: Date.now },
})

const TripSchema = new mongoose.Schema({
    userId:      {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    destination: {type:String, required:true},
    from_date:    Date,
    to_date:      Date,
    bannerURL:    String,
    isPublic:     {type:Boolean, default:false},
    shareId:      {type:String, unique: true, sparse: true},
    createdAt:    {type: Date, default: Date.now },
    updatedAt:    Date,
})

TripSchema.pre("updateOne", function (next) {
  const update = this.getUpdate() as any;
  
  if (update.$set?.isPublic && !update.$set.shareId) {
    update.$set.shareId = nanoid(10);
    this.setUpdate(update);

  } else if (update.isPublic && !update.shareId) {
    update.shareId = nanoid(10);
    this.setUpdate(update);
  }
  next();
});

TripSchema.pre("save", function (next) {
  if (this.isPublic && !this.shareId) {
    this.shareId = nanoid(10);
  }
  next();
});

// enum contentTypes { "image" | "link" | "string"};

const ContentSchema = new mongoose.Schema({
    userId:    {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tripId:    {type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true }, 
    type:      {type: String, enum: ["note", "image", "link", "video"], default: "note" },
    title:     {type: String},
    value:     {type: String},
    createdAt: {type: Date, default: Date.now },
})

export const UserModel = mongoose.model("user", UserSchema);
export const TripModel = mongoose.model("trip", TripSchema);
export const ContentModel = mongoose.model("content", ContentSchema);