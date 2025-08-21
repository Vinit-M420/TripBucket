import  jwt, { type JwtPayload }  from "jsonwebtoken";
import dotenv from "dotenv";
import { HttpStatusCode } from "../response.js";
import type { Request, Response, NextFunction } from "express";
dotenv.config();

export interface CustomRequest extends Request {
    userId?: string | number;
}

export function userAuth(req: CustomRequest, res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if(!header){
        return res.status(HttpStatusCode.Unauthorized).json({
            message: "Authorizations Headers missing"
        })
    }
    
    try{
        const token = header;
        
        jwt.verify(token, process.env.JWT_SECRET || '' , 
            (err: jwt.VerifyErrors | null, user: string | jwt.JwtPayload | undefined) => {
            if (err){
                return res.status(HttpStatusCode.Unauthorized).json({
                    message: "Forbidden: Invalid User"
                })
            }
            req.userId = (user as jwt.JwtPayload).id;
            next();
            
        })
    } catch(err){
        return res.status(HttpStatusCode.ServerError).json({
            message:"Server Error during authentication"
        })
    }
};