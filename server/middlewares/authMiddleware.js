import { clerkClient } from "@clerk/express";
import jwt from 'jsonwebtoken'

export const protectEducator = async (req,res,next)=>{
    try {
        const userId = req.headers.authorization;
        const token = userId.split(' ')[1];
        const decodedtoken = jwt.decode(token);
        const response = await clerkClient.users.getUser(decodedtoken.sub);
    if (response.publicMetadata.role !== "educator") {
      return res.json({ success: false, message: "Unauthorised Access" });
    }
    next();

    } catch (error) {
        return res.status(503).json({ success: false, message: error.message });
    }
}