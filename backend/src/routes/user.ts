import express from "express";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import { z } from "zod";
import  bcrypt from "bcrypt";
import { UserModel, TripModel } from "../db/db.js";
import { HttpStatusCode } from "../response.js"
import { userAuth, type CustomRequest } from "../middleware/auth.js";
dotenv.config();

const router = express.Router(); 
router.use(express.json());

const UserSignupSchema = z.object({
        firstName: z.string().min(3).max(20 , {message:"First name can't be empty"}),
        lastName: z.string().min(3).max(20).optional(),
        email: z.email().min(8).max(20, { message: "Invalid email format" }),
        password: z.string().min(8).max(20).refine((password) => {
                const hasUppercase = /[A-Z]/.test(password);
                const hasLowercase = /[a-z]/.test(password);
                const hasNumber = /[0-9]/.test(password);
                const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
                 return hasUppercase && hasLowercase && hasNumber && hasSpecialCharacter;
            },{
            message: "Password must contain at least one uppercase, lowercase, number, and special character"
        })
    })

const UserSigninSchema = UserSignupSchema.pick({
  email: true,
  password: true,
});

const UserTripSchema = z.object({
    destination: z.string().min(5).max(20, {message: "Destination is necessary"}),
    bucketlist: z.boolean(),
    to_date: z.date(),
    from_date: z.date()
}) 


router.post("/signup",  async function (req, res) {
    const parsedDataWithSuccess = UserSignupSchema.safeParse(req.body);
    if (!parsedDataWithSuccess){
        res.status(HttpStatusCode.UserAlreadyExist).json({
            message: "Incorrect format"
        })
        return
    }

    const { firstName, lastName, email, password } = req.body;
    
    let user = await UserModel.findOne({ email: email })
    if (user){
        res.status(403).json({
            message:"You are already signed up"
        })
    }

    try{
        const hashedPass = await bcrypt.hash(password, 5);
        await UserModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPass
        });
        res.status(200).json({
            message:"User created Successfully"
        })
    } catch(err){
        res.status(403).json( {
            message: "Error in signing up the user",
            error: err
        } )
    }  
} );

router.post("/signin",  async function (req, res) {
    const parsedDataWithSuccess = UserSigninSchema.safeParse(req.body)
    if (!parsedDataWithSuccess){
        res.status(403).json({
            message: "Incorrect format"
          
        })
        return
    }

    const email = req.body.email;
    const password = req.body.password;

    let user = await UserModel.findOne({ email: email })
    if (!user){
        res.status(403).json({
            message:"You are not signed up. Please sign up first"
        })
        return
    }

    try{
        const passMatch = await bcrypt.compare(password, user.password);
        if (passMatch){
            const token = jwt.sign( {id: user._id.toString( )} , process.env.JWT_SECRET  || '');
            res.status(HttpStatusCode.Ok).json({ token: token })
        }
    } catch(err){
        res.status(HttpStatusCode.InputError).json({
             message: "Invalid Password"
        })
    }
});

router.use(userAuth);

router.post("/trip", async function (req:CustomRequest, res) {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({
            message: "User not authenticated"
        });
    }

    const parsedTrip= UserTripSchema.safeParse(req.body);
    if (!parsedTrip){
         return res.status(403).json({
            message: "Incorrect format"
        })
    }

    const { destination, bucketlist, to_date, from_date, bannerURL } = req.body;
    let existingTrip = await TripModel.findOne({ userId, destination }); /// this any is a problem
    if (existingTrip){
        return res.status(HttpStatusCode.UserAlreadyExist).json({
            message: "Trip to this destination already exists"
        })
    }

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

router.get("/trips", async function (req:CustomRequest, res) {
    const userId = req.userId
    const trips = await TripModel.find({ userId })
    res.json({ trips })

});

export default router;