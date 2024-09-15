import * as utils from './utils.js';

class View {
  constructor(id, title, mapping) {
    this.id = id;
    this.title = title;
    this.mapping = mapping;
    this.historyMapping = Object.assign(
      { history_date: 'Date of Change' },
      this.mapping
    );
    this.tag = id.replace(/_/g, '-');
    this.cacheKey = `com.ssjc.cache.${id}`;
  }

  async getData(useCache = false) {
    let data = null;
    if (useCache === true) {
      const cache = this.getCache();
      if (cache !== null) data = cache.value;
    }
    if (data === null) data = await utils.fetchJSON(`/api/${this.id}`);
    return data;
  }

  async getHistoricalData(fid) {
    return await utils.fetchJSON(`/api/${this.id}_history/${fid}`);
  }

  async getCommentsData(fid) {
    return await utils.fetchJSON(`/api/${this.id}_comments/${fid}`);
  }

  async newComment(fid, name, body) {
    const opts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fid: fid,
        name: name,
        body: body,
      }),
    };
    return await utils.fetchJSON(`/api/${this.id}_new_comment`, opts);
  }

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
    tf_rec: 'RPS TF Recommendation',
    action: 'Action',
    parties_responsible: 'Parties Responsible',
    progress: 'Progress',
    timeline: 'Timeline',
    priority: 'Priority',
  }),
  mpaa: new View('mpaa', 'Maryland Police Accountability Act', {
    focus_area: 'Focus Area',
    rps_rec: 'RPS Recommendation',
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

export { views };
