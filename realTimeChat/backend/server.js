import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path'

import authRoute from '../backend/routes/auth.route.js';
import messageRoute from '../backend/routes/message.route.js';
import userRoute from '../backend/routes/user.route.js';

import connect from './db/connection.js';
import { app, server } from './socket/socket.js';
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
dotenv.config();

app.use(express.json()); // to use req.body
app.use(cookieParser());

app.use('/api/auth',authRoute)
app.use('/api/message',messageRoute)
app.use('/api/user',userRoute)

app.use(express.static(path.join(__dirname,'/frontend/dist')))

app.get('*' ,(req,res)=>{
    res.sendFile(path.join(__dirname,'frontend','dist','index.html'))
})

server.listen(PORT,()=>{
    console.log(`hi you start  at ${PORT} \n welcome to realTime chat`);
    connect();
})