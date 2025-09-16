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

    const { firstName, lastName, email, password } = req.body;
    
    let user = await UserModel.findOne({ email: email })
    if (user){
        res.status(403).json({
            message:"You are already signed up"
        })
    }

    const parsedDataWithSuccess = UserSignupSchema.safeParse(req.body);

    if (!parsedDataWithSuccess.success){
        return res.status(400).json({
            message: "Email or Password has incorrect format",
            errors: parsedDataWithSuccess.error,
        });
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

router.post("/login",  async function (req, res) {
    const parsed = UserSigninSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(HttpStatusCode.Forbidden).json({ 
            message: "Incorrect format" 
        });
    }

    const { email, password } = parsed.data;

    let user = await UserModel.findOne({ email: email })
    if (!user){
        return res.status(HttpStatusCode.Forbidden).json({
            message:"You are not signed up. Please sign up first"
        })     
    }

    try{
        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch){
            return res.status(HttpStatusCode.InputError).json({ message: "Invalid email or password" });
        }
        else{
            const token = jwt.sign({
                id: user._id.toString( )} , 
                process.env.JWT_SECRET  || '', 
                { expiresIn: "7d"});
                
            return res.status(HttpStatusCode.Ok).json({ token: token })
        }
    } catch(err){
        return res.status(HttpStatusCode.ServerError).json({ 
            message: "Server error while signing in" });
    }
});


router.put("/update", userAuth, async function (req:CustomRequest, res) {
    const userId = req.userId;
    const { firstName, lastName, email, password } = req.body;
    
    try{
        await UserModel.updateOne({ firstName, lastName, email, password });
        res.json({ message: "Updated your user details" })
    }
    catch(err){
        return res.status(HttpStatusCode.ServerError).json({
            message: "Error in updating the user's detail"
        })
    }
});

router.get("/get", userAuth, async function (req:CustomRequest, res) {
    const userId = req.userId;

    try{
        const response = await UserModel.findOne({ _id: userId });
        res.json({ response })
    }
    catch(err){
        return res.status(HttpStatusCode.ServerError).json({
            message: "Error in finding the user's detail"
        })
    }
});

export default router;