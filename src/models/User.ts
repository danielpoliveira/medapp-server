import Sequelize, { Model } from 'sequelize';

import database from '../database';

class User extends Model {
  public id!: number;
  public nome!: string;
  public email!: string;
  public password!: string;
}

User.init({
  nome: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
}, {
  sequelize: database.connection,
  modelName: 'recepcionista',
  freezeTableName: true,
  timestamps: false,
  defaultScope: {
    attributes: {
      exclude: ['password']
    }
  }
})



export default User;