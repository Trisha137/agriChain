import express from "express";
import cors from "cors";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = process.env.PORT || 4000;
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

const userInputSchema = z.object({
    name:z.string(),
    phone:z.string(),
    hash:z.string(),
    crop:z.string(),  
    quality:z.string(),
    quantity:z.number(),
    message:z.string(),
    batch_num:z.string()
});

type userInputType = z.infer<typeof userInputSchema>;

app.post('/api/v1',async (req,res)=>{
    const parsed = userInputSchema.safeParse(req.body);
    if(!parsed.success){
        console.log("Invalid syntax");
        return res.status(411).json({Error : "Invalid input format."});
    }
    const {name,phone,hash,crop,quality,quantity,message,batch_num} :userInputType = parsed.data;
    
    try {
        const user = await prisma.retailers.create({
            data:{
                name,
                phone,
                hash,
                crop,
                quality,
                quantity,
                message
            }
        });
        console.log(user);
        return res.status(200).json({
            message: "Retailer Successfully created.",
            Token: batch_num
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({Error:"We've encountered an internal server error , kindly check back later."})
    }
});

app.get('/api/v1/retailers', async (_req, res) => {
    try {
        const allRetailers = await prisma.retailers.findMany();
        return res.status(200).json(allRetailers);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            Error: "Unable to fetch retailers. Please try again later."
        });
    }
});


app.listen(port,()=>{console.log(`[-] Live on port ${port}`)})
