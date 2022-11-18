/**
 * This script imports all other models into a single namespace. This means other
 * scripts only have to import this script to access all of the below models.
 *
 * Sequelize models are an abstraction which maps the tables of a SQL database
 * to specific JavaScript objects, producing a standard syntax for executing
 * queries.
 *
 * For technical information, see the Sequelize documentation:
 * https://sequelize.org/docs/v6/core-concepts/model-basics/
 */

import mcpd_audit from './mcpd_audit.js';
import mcpd_audit_comments from './mcpd_audit_comments.js';
import mcpd_audit_history from './mcpd_audit_history.js';

import mpaa from './mpaa.js';
import mpaa_comments from './mpaa_comments.js';
import mpaa_history from './mpaa_history.js';

import tf_recs from './tf_recs.js';
import tf_recs_comments from './tf_recs_comments.js';
import tf_recs_history from './tf_recs_history.js';

export default {
  mcpd_audit,
  mcpd_audit_comments,
  mcpd_audit_history,
  mpaa,
  mpaa_comments,
  mpaa_history,
  tf_recs,
  tf_recs_comments,
  tf_recs_history,
};
