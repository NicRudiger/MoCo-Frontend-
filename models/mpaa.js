const mpaa = (sequelize, types) => {
  const mpaa = sequelize.define(
    'mpaa',
    {
      mpaa_id: {
        type: types.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      focus_area: {
        type: types.STRING
      },
      rps_rec: {
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

  return mpaa;
};

const mpaa_history = (sequelize, types) => {
  const mpaa_history = sequelize.define(
    'mpaa_history',
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
      mpaa_id: {
        type: types.INTEGER,
        allowNull: false,
      },
      focus_area: {
        type: types.STRING
      },
      rps_rec: {
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

  return mpaa_history;
};

const mpaa_comments = (sequelize, types) => {
  const mpaa_comments = sequelize.define(
    'mpaa_comments',
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

  return mpaa_comments;
};

export { mpaa, mpaa_history, mpaa_comments };
