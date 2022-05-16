import { Sequelize } from "sequelize";
import mysql from "mysql2/promise"

const host = "localhost";
const port = 3306;
const user = "root";
const password = "12345";
const database = "SPECTRUMMOONDB";
const dialect = "mysql";


(async () => {
  // create db if it doesn't already exist
  const connection = await mysql.createConnection({ host, port, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
})();
    
  const db = new Sequelize(database, user, password, {
    host,
    dialect,
  });

  export default db;