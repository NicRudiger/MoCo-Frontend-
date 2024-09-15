/**
 * Model for 'mcpd_audit' table
 */

export default (sequelize, types) => {
  const mcpd_audit = sequelize.define('mcpd_audit', {
    id: {
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
    recommendations: {
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

  return mcpd_audit;
};
