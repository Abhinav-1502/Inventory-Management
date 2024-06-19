import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import registeredRouter from './routes/index.js'

const initialize = (app) =>{
    // Applying CORS middleware to allow cross-origin requests
    app.use(cors());

    // Middleware to parse JSON bodies in requests.
    app.use(express.json());

    // Middleware to parse URL-encoded bodies (form data)
    app.use(express.urlencoded({extended: true}));

    //Connect to MongoDB 
    mongoose.connect(process.env.MONGO_URI);

    // Register routes to app 
    registeredRouter(app);

}

export default initialize;