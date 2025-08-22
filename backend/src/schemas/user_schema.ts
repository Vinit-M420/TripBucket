import { z } from "zod";

export const UserSignupSchema = z.object({
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

export const UserSigninSchema = UserSignupSchema.pick({
  email: true,
  password: true,
});