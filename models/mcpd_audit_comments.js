/**
 * Model for 'mcpd_audit_comments' table
 */

export default (sequelize, types) => {
  const mcpd_audit_comments = sequelize.define('mcpd_audit_comments', {
    comment_id: {
      type: types.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    audit_id: {
      type: types.INTEGER,
      allowNull: false,
    },
    body: {
      type: types.STRING,
    },
    name: {
      type: types.STRING,
    },
  });

  return mcpd_audit_comments;
};
