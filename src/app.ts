import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import './database';

import routes from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(routes);



export default app;