import { PrismaClient } from '@prisma/client';
import express from 'express';
import { env } from 'process';

const prisma = new PrismaClient();
const app = express();
// const port = 4000; // Specify the desired port number

app.get('/', async (req: any, res: any) => {
    try {
        const user = await prisma.user.create({ data: req.body });
        // console.log(req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send("rvrwv");
    }
});

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
});

// async function main(){
//     const user1= await prisma.user.create({data:{username:"frcdscsdcfdvdr"}})
//     console.log(user1)
// }
// main()
//     .catch(e =>{
//         console.error(e.message)
//     })
//     .finally(async() => {
//         await prisma.$disconnect()
//     })

