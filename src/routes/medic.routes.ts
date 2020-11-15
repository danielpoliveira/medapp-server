import { Router } from 'express';
import UserController from '../controllers/UserController';

const medicRoutes = Router();

medicRoutes.get('/all', UserController.getMedics);

export default medicRoutes;