import { Request, Response } from 'express';
import generateToken from '../config/generateToken';

import User from '../models/User';

export default {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        errors: 'Email or password Empty',
      });
    }

    const user = await User.findOne({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      return res.status(400).send({ errors: 'email or password invalids' });
    }

    return res.send({ user, token: generateToken({ id: user.id }) });
  },

  async signUp(req: Request, res: Response) {
    const { nome, email, password } = req.body;

    if (!nome || !email || !password) {
      return res.status(400).send({
        errors: 'nome, email or password Empty',
      });
    }

    let user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).send({
        errors: 'email already exists',
      });
    }

    user = await User.create({ nome, email, password });

    return res.send({ user, token: generateToken({ id: user.id }) });
  },
}