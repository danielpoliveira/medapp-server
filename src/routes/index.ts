import { Router } from 'express';

import authRoutes from './auth.routes';
import agendamentoRoutes from './agendamento.routes';
import pacienteRoutes from './paciente.routes';
import medicRoutes from './medic.routes';
import imageRoutes from './image.routes';

import authMiddleware from '../middlewares/auth';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/user/agendamentos', authMiddleware, agendamentoRoutes);
routes.use('/user/pacientes', authMiddleware, pacienteRoutes);
routes.use('/medics', authMiddleware, medicRoutes);

routes.use('/images', imageRoutes);

export default routes;
