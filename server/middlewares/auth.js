import { clerkClient } from "@clerk/express";
// Middleware to check userId and hasPremiumPlan


export const auth = async (req,res,next)=>{
    try {
        const {userId, has} = await req.auth();
        const hasPremiumPlan = await has({plan: 'subscription'});

        const user = await clerkClient.users.getUser(userId);

        const freeUsage = Number(user.privateMetadata.free_usage || 0);

        if(!hasPremiumPlan && freeUsage){
            req.free_usage = freeUsage
        } else{
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: 0
                }
            })
            req.free_usage = 0
        }

        req.plan = hasPremiumPlan ? 'subscription' : 'free';
        next()
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}