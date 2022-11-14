const mcpd_audit = (sequelize, types) => {
  const mcpd_audit = sequelize.define(
    'mcpd_audit',
    {
      audit_id: {
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
      recommendations: {
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

  return mcpd_audit;
};

const mcpd_audit_history = (sequelize, types) => {
  const mcpd_audit_history = sequelize.define(
    'mcpd_audit_history',
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
      audit_id: {
        type: types.INTEGER,
        allowNull: false,
        unique: true,
      },
      action_id: {
        type: types.INTEGER
      },
      focus_area: {
        type: types.STRING
      },
      recommendations: {
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

  return mcpd_audit_history;
};

const mcpd_audit_comments = (sequelize, types) => {
  const mcpd_audit_comments = sequelize.define(
    'mcpd_audit_comments',
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

  return mcpd_audit_comments;
};

export { mcpd_audit, mcpd_audit_history, mcpd_audit_comments };
