import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.get('/', (req, res) => {
    res.send("Hello from Node API Server Updated");
});

mongoose.connect('mongodb+srv://admin:userPassword1234@backenddb.8dwv4kq.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB')
    .then(() => {
        console.log('Connected to the database!');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(() => {
        console.log("Connection failed")
    });
