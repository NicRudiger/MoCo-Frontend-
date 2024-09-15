/**
 * Model for 'tf_recs_history' table
 */

export default (sequelize, types) => {
  const tf_recs_history = sequelize.define('tf_recs_history', {
    id: {
      type: types.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    history_date: {
      type: types.DATE,
      allowNull: false,
    },
    fid: {
      type: types.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    action_id: {
      type: types.INTEGER,
    },
    focus_area: {
      type: types.STRING,
    },
    tf_rec: {
      type: types.STRING,
    },
    action: {
      type: types.STRING,
    },
    parties_responsible: {
      type: types.STRING,
    },
    progress: {
      type: types.STRING,
    },
    timeline: {
      type: types.STRING,
    },
    priority: {
      type: types.STRING,
    },
  });

  return tf_recs_history;
};
