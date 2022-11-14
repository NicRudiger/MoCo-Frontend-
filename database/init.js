import Sequelize from 'sequelize';

import config from './config.js';
import models from '../models/index.js';

const env = process.env.ENVIRONMENT || 'development';
const opts = config[env];

const sequelize = new Sequelize(
  opts.database,
  opts.username,
  opts.password,
  opts
);

// Construction dictionary of imported models
const db = Object.keys(models).reduce((collection, name) => {
  collection[name] = models[name](sequelize, Sequelize.DataTypes);
  return collection;
}, {});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
