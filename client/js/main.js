import * as utils from './utils.js';

const default_view = 'tf_recs';
const views = {
  mcpd_audit: {
    label: 'MCPD Audit',
    prefix: 'mcpd-audit',
    endpoint: '/api/mcpd_audit',
    columns: [
      'ID',
      'Action ID',
      'Focus Area',
      'Recommendations',
      'Action',
      'Parties Responsible',
      'Progress',
      'Timeline',
      'Priority',
    ],
  },
  mpaa: {
    label: 'Maryland Police Accountability Act',
    prefix: 'mpaa',
    endpoint: '/api/mpaa',
    columns: [
      'ID',
      'Focus Area',
      'RPS Recommendation',
      'Action',
      'Parties Responsible',
      'Progress',
      'Timeline',
      'Priority',
    ],
  },
  tf_recs: {
    label: 'RPS Task Force Recommendations',
    prefix: 'tf-recs',
    endpoint: '/api/tf_recs',
    columns: [
      'ID',
      'Action ID',
      'Focus Area',
      'RPS TF Recommendation',
      'Action',
      'Parties Responsible',
      'Progress',
      'Timeline',
      'Priority',
    ],
  },
};

function getView() {
  return utils.getURLParams().get('v');
}

function setView(view) {
  location.search = `v=${view}`;
}

async function loadView(view) {
  console.debug(`Loading view: ${view.label}`);
  // Update page heading to reflect current view
  const viewLabel = document.querySelector('#view-label');
  viewLabel.innerHTML = view.label;
  // Disable navigation button for current view
  const navButton = document.querySelector(`#${view.prefix}-nav`);
  navButton.setAttribute('disabled', '');
  // Populate html table with data
  const table = document.querySelector('#data');
  const data = await utils.getData(view.endpoint);
  utils.populateTableHeaders(table, view.columns);
  utils.populateTableBody(table, data);
}

async function main() {
  // Add click action to view navigation buttons
  Object.keys(views).forEach((key) => {
    const button = document.querySelector(`#${views[key].prefix}-nav`);
    button.addEventListener('click', () => setView(key));
  });

  let view = getView();
  if (Object.keys(views).indexOf(view) == -1) {
    view = default_view;
  }
  loadView(views[view]);
}

// When the page has finished loading, execute the main() function
document.addEventListener('DOMContentLoaded', async () => main());
