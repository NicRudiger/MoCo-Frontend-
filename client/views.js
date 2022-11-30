import * as utils from './utils.js';

class View {
  constructor(id, title, mapping) {
    this.id = id;
    this.title = title;
    this.mapping = mapping;
    this.tag = id.replace(/_/g, '-');
    this.cacheKey = `com.ssjc.cache.${id}`;
  }

  async getData(useCache = false) {
    let data = null;
    if (useCache === true) data = this.getCache();
    if (data === null) data = await utils.fetchJSON(`/api/${this.id}`);
    return data;
  }

  // async getHistory(id, useCache = false) {
  //   let data;
  //   if (useCache === true) data = this.getCachedData();
  //   if (data === null) {
  //     data = await utils.fetchJSON(`/api/${this.id}_history/${id}`);
  //   }
  //   return data;
  // }

  // async getComments(id, useCache = false) {
  //   let data;
  //   if (useCache === true) data = this.getCachedData();
  //   if (data === null) {
  //     data = await utils.fetchJSON(`/api/${this.id}_comments/${id}`);
  //   }
  //   return data;
  // }

  cache(data, ttl = 10000) {
    const date = new Date();
    const cache = {
      expiry: date.getTime() + ttl,
      value: data,
    };
    window.localStorage.setItem(this.cacheKey, JSON.stringify(cache));
  }

  refreshCache(force = false) {
    const date = new Date();
    const cache = this.getCache();
    if (cache !== null && (date.getTime() >= cache.expiry || force === true)) {
      window.localStorage.removeItem(this.cacheKey);
    }
  }

  getCache() {
    const cache = window.localStorage.getItem(this.cacheKey);
    return cache === null ? null : JSON.parse(cache);
  }
}

const views = {
  tf_recs: new View('tf_recs', 'RPS Task Force Recommendations', {
    action_id: 'Action ID',
    focus_area: 'Focus Area',
    tf_recs: 'RPS TF Recommendation',
    action: 'Action',
    parties_responsible: 'Parties Responsible',
    progress: 'Progress',
    timeline: 'Timeline',
    priority: 'Priority',
  }),
  mpaa: new View('mpaa', 'Maryland Police Accountability Act', {
    focus_area: 'Focus Area',
    rps_recommendation: 'RPS Recommendation',
    action: 'Action',
    parties_responsible: 'Parties Responsible',
    progress: 'Progress',
    timeline: 'Timeline',
    priority: 'Priority',
  }),
  mcpd_audit: new View('mcpd_audit', 'MCPD Audit', {
    action_id: 'Action ID',
    focus_area: 'Focus Area',
    recommendations: 'Recommendations',
    action: 'Action',
    parties_responsible: 'Parties Responsible',
    progress: 'Progress',
    timeline: 'Timeline',
    priority: 'Priority',
  }),
};

const historyViews = {
  tf_recs_history: new View(
    'tf_recs_history',
    'RPS Task Force Recommendations',
    {
      history_date: 'Date of Change',
      action_id: 'Action ID',
      focus_area: 'Focus Area',
      tf_recs: 'RPS TF Recommendation',
      action: 'Action',
      parties_responsible: 'Parties Responsible',
      progress: 'Progress',
      timeline: 'Timeline',
      priority: 'Priority',
    }
  ),
  mpaa_history: new View('mpaa_history', 'Maryland Police Accountability Act', {
    history_date: 'Date of Change',
    focus_area: 'Focus Area',
    rps_recommendation: 'RPS Recommendation',
    action: 'Action',
    parties_responsible: 'Parties Responsible',
    progress: 'Progress',
    timeline: 'Timeline',
    priority: 'Priority',
  }),
  mcpd_audit_history: new View('mcpd_audit_history', 'MCPD Audit', {
    history_date: 'Date of Change',
    action_id: 'Action ID',
    focus_area: 'Focus Area',
    recommendations: 'Recommendations',
    action: 'Action',
    parties_responsible: 'Parties Responsible',
    progress: 'Progress',
    timeline: 'Timeline',
    priority: 'Priority',
  }),
};

const commentsViews = {
  tf_recs_comments: new View(
    'tf_recs_comments',
    'RPS Task Force Recommendations',
    {
      name: 'Name',
      body: 'Body',
    }
  ),
  mpaa_comments: new View(
    'mpaa_comments',
    'Maryland Police Accountability Act',
    {
      name: 'Name',
      body: 'Body',
    }
  ),
  mcpd_audit_comments: new View('mcpd_audit_comments', 'MCPD Audit', {
    name: 'Name',
    body: 'Body',
  }),
};

export { views, historyViews, commentsViews };
