class View {
  constructor(id, title, mapping, endpoint = null) {
    this.id = id;
    this.title = title;
    this.mapping = mapping;
    this.endpoint = endpoint === null ? `/api/${id}` : endpoint;
    this.CSSID = id.replace(/_/g, '-');
    this.data = [];
  }

  async load() {
    const resp = await fetch(this.endpoint);
    this.data = await resp.json();
  }

  async getHistory(id) {
    const resp = await fetch(`/api/mcpd_audit_history/1`);
    return await resp.json();
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

export { views };
