import jwt from 'jsonwebtoken';
import authJson from './auth.json';

export default (params = {}) => {
  return jwt.sign(params, authJson.secret, {
    expiresIn: 86400,
  });
}