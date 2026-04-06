import "reflect-metadata";
import "./container.js"; // 👈 ADD THIS LINE

import express from 'express';
import {urlRoute} from './Routes/url.Route.js';

const app=express();


app.use(express.json());

app.use('/', urlRoute);

app.listen(3001,()=>console.log("Server Started"));