const DB_SCHEMA = process.env.DB_DATABASE;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_DIALECT = process.env.DB_DIALECT;

export default {
  development: {
    username: 'root',
    password: 'mysql',
    database: 'rps',
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql',
    define: {
      freezeTableName: true,
      timestamps: false,
    },
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_SCHEMA,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    define: {
      freezeTableName: true,
      timestamps: false,
    },
  },
};
