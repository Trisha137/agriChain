"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const userInputSchema = zod_1.z.object({
    name: zod_1.z.string(),
    phone: zod_1.z.string(),
    hash: zod_1.z.string(),
    crop: zod_1.z.string(),
    quality: zod_1.z.string(),
    quantity: zod_1.z.number(),
    message: zod_1.z.string(),
    batch_num: zod_1.z.string()
});
app.post('/api/v1', async (req, res) => {
    const parsed = userInputSchema.safeParse(req.body);
    if (!parsed.success) {
        console.log("Invalid syntax");
        return res.status(411).json({ Error: "Invalid input format." });
    }
    const { name, phone, hash, crop, quality, quantity, message, batch_num } = parsed.data;
    try {
        const user = await prisma.retailers.create({
            data: {
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
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ Error: "We've encountered an internal server error , kindly check back later." });
    }
});
app.listen(port, () => { console.log(`[-] Live on port ${port}`); });
//# sourceMappingURL=index.js.map