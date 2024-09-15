/**
 * Model for 'mpaa' table
 */

export default (sequelize, types) => {
  const mpaa = sequelize.define('mpaa', {
    id: {
      type: types.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    focus_area: {
      type: types.STRING,
    },
    rps_rec: {
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

  return mpaa;
};
