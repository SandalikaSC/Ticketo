const { PrismaClient } = require('@prisma/client');
const express = require('express');
const env = require('process').env;

const prisma = new PrismaClient();
const app = express();

app.get('/', async (req, res) => {
    // Uncomment this code block if you want to use Prisma
    // try {
    //     const user = await prisma.user.create({ data: req.body });
    //     // console.log(req.body);
    //     // res.status(200).json(user);
    //     console.log("awaaaa");
    // } catch (err) {
    //     res.status(500).send("rvrwv");
    // }

    res.send("rvrwv");
});

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
});

// Uncomment this code block if you want to use Prisma
// async function main(){
//     const user1= await prisma.user.create({data:{username:"frcdscsdcfdvdr"}})
//     console.log(user1)
// }

// Uncomment this code block if you want to use Prisma
// main()
//     .catch(e =>{
//         console.error(e.message)
//     })
//     .finally(async() => {
//         await prisma.$disconnect()
// });
