const tf_recs = (sequelize, types) => {
  const tf_recs = sequelize.define(
    'tf_recs',
    {
      rec_id: {
        type: types.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      action_id: {
        type: types.INTEGER
      },
      focus_area: {
        type: types.STRING
      },
      tf_rec: {
        type: types.STRING
      },
      action: {
        type: types.STRING
      },
      parties_responsible: {
        type: types.STRING
      },
      progress: {
        type: types.STRING
      },
      timeline: {
        type: types.STRING
      },
      priority: {
        type: types.STRING
      }
    }
  );

  return tf_recs;
};

const tf_recs_history = (sequelize, types) => {
  const tf_recs_history = sequelize.define(
    'tf_recs_history',
    {
      history_id: {
        type: types.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      history_date: {
        type: types.DATE,
        allowNull: false
      },
      rec_id: {
        type: types.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      action_id: {
        type: types.INTEGER
      },
      focus_area: {
        type: types.STRING
      },
      tf_rec: {
        type: types.STRING
      },
      action: {
        type: types.STRING
      },
      parties_responsible: {
        type: types.STRING
      },
      progress: {
        type: types.STRING
      },
      timeline: {
        type: types.STRING
      },
      priority: {
        type: types.STRING
      }
    }
  );

  return tf_recs_history;
};

const tf_recs_comments = (sequelize, types) => {
  const tf_recs_comments = sequelize.define(
    'tf_recs_comments',
    {
      comment_id: {
        type: types.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      audit_id: {
        type: types.INTEGER,
        allowNull: false
      },
      body: {
        type: types.STRING
      },
      name: {
        type: types.STRING
      }
    }
  );

  return tf_recs_comments;
};

export { tf_recs, tf_recs_history, tf_recs_comments };
