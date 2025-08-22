import express from "express";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import  bcrypt from "bcrypt";
import { UserModel } from "../db/db.js";
import { HttpStatusCode } from "../schemas/responses.js"
import { UserSigninSchema, UserSignupSchema } from "../schemas/user_schema.js";
import { userAuth, type CustomRequest } from "../middleware/user_auth.js"
dotenv.config();

const router = express.Router(); 
router.use(express.json());

router.post("/signup",  async function (req, res) {
    const parsedDataWithSuccess = UserSignupSchema.safeParse(req.body);
    if (!parsedDataWithSuccess){
        res.status(HttpStatusCode.Forbidden).json({
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
});

router.post("/signin",  async function (req, res) {
    const parsedDataWithSuccess = UserSigninSchema.safeParse(req.body)
    if (!parsedDataWithSuccess){
        return res.status(403).json({
            message: "Incorrect format"
        })    
    }

    const email = req.body.email;
    const password = req.body.password;

    let user = await UserModel.findOne({ email: email })
    if (!user){
        return res.status(403).json({
            message:"You are not signed up. Please sign up first"
        })     
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


router.put("/update", userAuth, async function (req:CustomRequest, res) {
    const userId = req.userId;
    const { firstName, lastName } = req.body;
    try{
        await UserModel.updateOne({ firstName, lastName });
        res.json({ message: "Updated your name" })
    }
    catch(err){
        return res.status(HttpStatusCode.ServerError).json({
            message: "Error in updating the user's detail"
        })
    }
});

export default router;