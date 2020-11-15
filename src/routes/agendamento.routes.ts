import { Router } from 'express';
import UserController from '../controllers/UserController';

const agendamentoRoutes = Router();

agendamentoRoutes.get('/all', UserController.index);
agendamentoRoutes.post('/new', UserController.create);
agendamentoRoutes.put('/edit', UserController.update);
agendamentoRoutes.delete('/remove/:id', UserController.destroy);

export default agendamentoRoutes;