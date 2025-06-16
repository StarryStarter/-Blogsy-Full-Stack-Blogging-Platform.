import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();

await connectDB()

//middleware

app.use(cors())
app.use(express.json())


//routes
app.get('/',(req,res)=>res.send("working af.."))
app.use('/api/admin',adminRouter)
app.use('/api/user', userRouter);
app.use('/api/blog',blogRouter)
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('server is running on ' + PORT)
})

export default app;