/**
 * Model for 'tf_recs_history' table
 */

export default (sequelize, types) => {
  const tf_recs_history = sequelize.define('tf_recs_history', {
    history_id: {
      type: types.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    history_date: {
      type: types.DATE,
      allowNull: false,
    },
    tf_recs_id: {
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
