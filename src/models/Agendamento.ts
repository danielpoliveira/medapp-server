import Sequelize, { Model } from 'sequelize';

import database from '../database';
import Medic from './Medic';
import Patient from './Patient';

class Agendamento extends Model {
  public id!: number;
  public fk_id_paciente!: number;
  public fk_id_medico!: number;
  public datetime!: string;
}

Agendamento.init({
  fk_id_paciente: Sequelize.NUMBER,
  fk_id_medico: Sequelize.NUMBER,
  datetime: Sequelize.STRING,
}, {
  sequelize: database.connection,
  modelName: 'agendamento',
  freezeTableName: true,
  timestamps: false,
});

Agendamento.belongsTo(Medic, { foreignKey: 'fk_id_medico'});
Agendamento.belongsTo(Patient, { foreignKey: 'fk_id_paciente'});

export default Agendamento;