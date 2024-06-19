import express from 'express';
import dotenv from 'dotenv';
import initialize from './app/app.js';
import http from 'http';

const app = express();
const server = http.createServer(app)
dotenv.config();

initialize(app);

const port = process.env.PORT;
server.listen(port, () => console.log(`Server is listening to port ${port}`));