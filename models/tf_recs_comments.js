export default (sequelize, types) => {
  const tf_recs_comments = sequelize.define('tf_recs_comments', {
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

  return tf_recs_comments;
};
