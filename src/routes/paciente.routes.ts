import {Router } from 'express';
import UserController from '../controllers/UserController';

const pacienteRoutes = Router();

pacienteRoutes.get('/all', UserController.getPatients);
pacienteRoutes.post('/new', UserController.addPatient);

export default pacienteRoutes;