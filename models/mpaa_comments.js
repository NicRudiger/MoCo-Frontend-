/**
 * Model for 'mpaa_comments' table
 */

export default (sequelize, types) => {
  const mpaa_comments = sequelize.define('mpaa_comments', {
    comment_id: {
      type: types.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    mpaa_id: {
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

  return mpaa_comments;
};
