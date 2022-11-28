/**
 * Model for 'tf_recs_comments' table
 */

export default (sequelize, types) => {
  const tf_recs_comments = sequelize.define('tf_recs_comments', {
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

  return tf_recs_comments;
};
