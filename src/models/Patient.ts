import Sequelize, { Model } from 'sequelize';

import database from '../database';

class Patient extends Model {
  public id!: number;
  public nome!: string;
  public cpf!: string;
  public rg!: string;
  public naturalidade!: string;
  public estado_civil!: string;
  public tipo_sanguineo!: string;
  public celular!: string;
  public whatsapp!: string;
  public convenio!: string;
  public plano!: string;
}

Patient.init({
  nome: Sequelize.STRING,
  cpf: Sequelize.STRING,
  rg: Sequelize.STRING,
  naturalidade: Sequelize.STRING,
  estado_civil: Sequelize.STRING,
  tipo_sanguineo: Sequelize.STRING,
  celular: Sequelize.STRING,
  whatsapp: Sequelize.STRING,
  convenio: Sequelize.STRING,
  plano: Sequelize.STRING,
}, {
  sequelize: database.connection,
  modelName: 'patient',
  freezeTableName: true,
  timestamps: false,
});

export default Patient;