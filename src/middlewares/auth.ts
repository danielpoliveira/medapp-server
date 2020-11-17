import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import authJson from '../config/auth.json';

export default (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'No token provided' });
  }

  const parts = authHeader.split(' ');

  if (!(Number(parts.length) === 2))
    return res.status(401).send({ error: 'Token error' });

  const [bearer, token] = parts;

  if (!/^Bearer$/i.test(bearer))
    return res.status(401).send({ error: 'Token malformatted' });

  jwt.verify(token, authJson.secret, function (err: any, decoded: any) {
    if (err)
      return res.status(401).send({ error: 'Token invalid' });

    req.userId = decoded.id;
    next();
  });
}