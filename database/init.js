import Sequelize from 'sequelize';
import process from 'process';

import config from './config.js';
import models from '../models/index.js';

const env = process.env.ENVIRONMENT || 'development';
const opts = config[env];

const seq = new Sequelize(opts.database, opts.username, opts.password, opts);

// Construction dictionary of imported models
const db = Object.keys(models).reduce((collection, name) => {
  collection[name] = models[name](seq, Sequelize.DataTypes);
  return collection;
}, {});

db.Sequelize = Sequelize;
db.sequelize = seq;

export default db;
