/**
 * Model for 'mpaa_comments' table
 */

export default (sequelize, types) => {
  const mpaa_comments = sequelize.define('mpaa_comments', {
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

  return mpaa_comments;
};
