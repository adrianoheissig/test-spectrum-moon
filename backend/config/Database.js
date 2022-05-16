import { Sequelize } from "sequelize";

const db = new Sequelize("SPECTRUMMOONDB", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
