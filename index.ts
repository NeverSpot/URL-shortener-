import "reflect-metadata";
import "./container.js";
import dotenv from "dotenv";
import express from 'express';
import {urlRoute} from './Routes/url.Route.js';

dotenv.config();

const app=express();
const PORT = Number(process.env.PORT) || 3001;

app.use(express.json());

app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.use('/', urlRoute);

app.listen(PORT,()=>console.log(`Server Started on port ${PORT}`));

