export default (sequelize, types) => {
  const mpaa_history = sequelize.define('mpaa_history', {
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
    mpaa_id: {
      type: types.INTEGER,
      allowNull: false,
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

  return mpaa_history;
};
