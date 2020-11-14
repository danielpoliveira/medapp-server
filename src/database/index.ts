import Sequelize from 'sequelize';
//import dbConfig from '../config/database';

class Database {
  public connection: any;

  constructor() {
    this.init();
  }

  init(): void {
    this.connection = new Sequelize.Sequelize({
      database: 'medapp',
      username: 'me',
      password: '12345',
      dialect: 'postgres',
      host: 'localhost',
      define: {
        timestamps: true,
        underscored: true,
      }
    });
  }
}

const database: Database = new Database();

export default database;