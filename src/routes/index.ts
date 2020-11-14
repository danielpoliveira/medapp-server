import express from 'express';
import AuthController from '../controllers/AuthController';

import UserController from '../controllers/UserController';

const routes = express.Router();

routes.post('/auth/login', AuthController.login);
routes.post('/auth/signUp', AuthController.signUp);

routes.get('/user/agendamentos/all',    UserController.index);
routes.post('/user/agendamentos/new',   UserController.create);
routes.put('/user/agendamentos/edit',   UserController.update);
routes.delete('/user/agendamentos/remove/:id', UserController.destroy);

export default routes;
