import {Router } from 'express';
import UserController from '../controllers/UserController';

import multer from 'multer';

var upload = multer({ dest: 'public/uploads/' }); 

const pacienteRoutes = Router();

pacienteRoutes.get('/all', UserController.getPatients);
pacienteRoutes.post('/new', upload.single('photo'), UserController.addPatient);

export default pacienteRoutes;