import 'dotenv/config';
import express, { Response } from 'express';
import mongoose from 'mongoose';
import router from './routes/product.route.js';
import 'reflect-metadata';

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/products", router);

app.get('/', (res: Response) => {
    res.send("Hello from Node API Server Updated");
});


// database connection
mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => {
        console.log('Connected to the database!');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((error) => {
        console.log("Connection failed", error)
    });
