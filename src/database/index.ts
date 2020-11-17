import dotenv from 'dotenv';
dotenv.config();

import Sequelize from 'sequelize';
import dbConfig from '../config/database';

const isProduction = process.env.NODE_ENV === 'production';


class Database {
  public connection: any;

  constructor() {
    this.init();
  }

  init(): void {
    this.connection = new Sequelize.Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      protocol: "postgres",
      port: 5432,
      
    });

    //this.connection = new Sequelize.Sequelize(dbConfig);
  }
}

const database: Database = new Database();

export default database;