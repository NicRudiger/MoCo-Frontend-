/**
 * Model for 'mcpd_audit_comments' table
 */

export default (sequelize, types) => {
  const mcpd_audit_comments = sequelize.define('mcpd_audit_comments', {
    id: {
      type: types.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    fid: {
      type: types.INTEGER,
      allowNull: false,
    },
    name: {
      type: types.STRING,
    },
    body: {
      type: types.STRING,
    },
  });

  return mcpd_audit_comments;
};
