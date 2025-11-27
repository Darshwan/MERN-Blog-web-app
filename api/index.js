import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import postsRoutes from './routes/posts.route.js'
import cookieParser from 'cookie-parser';
dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("DataBase connected succesfully")
}).catch((err) => {
    console.log(err);
})
const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())

export default app;

if (import.meta.url === `file://${process.argv[1]}`) {
    app.listen(3000, () => {
        console.log('Server is runnning on port 3000');
    });
}

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/posts', postsRoutes)
app.use((err, req, res, next) => {
    const statusCode = err.StatusCode || 500;
    const message = err.message;
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})
