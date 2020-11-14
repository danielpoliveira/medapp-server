import Sequelize, { Model } from 'sequelize';

import database from '../database';
import Agendamento from './Agendamento';

class Medic extends Model {
  public id!: number;
  public nome!: string;
}

Medic.init({
  nome: Sequelize.STRING,
}, {
  sequelize: database.connection,
  modelName: 'medic',
  freezeTableName: true,
  timestamps: false,
})

//Medic.hasMany(Agendamento, { foreignKey: 'fk_id_medico', as: 'agendamento' } )

//Agendamento.hasOne(Medic, { foreignKey: 'fk_id_medico', as: 'id_medico' });

//Medic.hasMany(Agendamento,  { foreignKey: 'fk_id_medico', as: 'id_medico' });
//Medic.belongsTo(Agendamento, { foreignKey: 'fk_id_medico' })
export default Medic;