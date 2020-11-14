import express, { Request, Response } from 'express';
import cors from 'cors';

const PORT = process.env.PORT || 33333;

const app = express();

app.use(cors());

app.listen(PORT, () => console.log(`BACKEND is running on port ${PORT}`));


