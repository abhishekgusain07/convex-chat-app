import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
    args: { 
       userId: v.string(),
       email: v.string(),
       name: v.string(),
       createdAt: v.number(),
       profileImage: v.string(),
    },
    handler: async(ctx, args) => {
        try{

            const existingUser = await ctx.db
            .query("users")
            .filter(q => q.or(
                q.eq(q.field("userId"), args.userId),
                q.eq(q.field("email"), args.email),
            ))
            .collect();
            
            if(existingUser.length > 0){
                throw new Error("User already exists");
            }

            const newUser = await ctx.db.insert("users", {
                userId: args.userId,
                email: args.email,
                createdAt: args.createdAt,
                name: args.name,
                profileImage: args.profileImage
            });
            return newUser;
        }catch(error) {
            throw new Error("User information did not insert successfully");
        }
    }
});