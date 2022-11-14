/**
 * Model for 'tf_recs' table
 */

export default (sequelize, types) => {
  const tf_recs = sequelize.define('tf_recs', {
    rec_id: {
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

  return tf_recs;
};
