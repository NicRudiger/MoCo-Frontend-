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

// Get view from URL parameters
function getView() {
  return utils.getURLParams().get('v');
}

// Reload the page with the specified view
function setView(view) {
  location.search = `v=${view}`;
}

async function loadView(view, data = {}) {
  console.debug(`Loading view: ${view.label}`);
  // Update page heading to reflect current view
  const viewLabel = document.querySelector('#view-label');
  viewLabel.innerHTML = view.label;
  // Disable navigation button for current view
  const navButton = document.querySelector(`#${view.prefix}-nav`);
  navButton.setAttribute('disabled', '');
  // Populate html table with data
  const table = document.querySelector('#data');
  if (data.length == 0) {
    data = await utils.getData(view.endpoint);
  }
  utils.populateTableHeaders(table, view.columns);
  utils.populateTableBody(table, data);
}

async function main() {
  // Add click action to view navigation buttons
  Object.keys(views).forEach((key) => {
    const button = document.querySelector(`#${views[key].prefix}-nav`);
    button.addEventListener('click', () => setView(key));
  });

  // Load the requested view, falling back on the default if necessary
  let viewID = getView();
  if (Object.keys(views).indexOf(viewID) == -1) {
    viewID = default_view;
  }
  const view = views[viewID];
  const data = await utils.getData(view.endpoint);
  loadView(view, data);

  // Add search functionality to searchbar
  const table = document.querySelector('#data');
  const search = document.querySelector('#search');
  search.addEventListener('keypress', (e) => {
    const query = search.value;
    if (e.key == 'Enter') {
      console.debug(`Searching: '${query}'`);
      if (query.length > 0) {
        const cData = utils.searchRows(query, data);
        utils.populateTableBody(table, cData);
      } else {
        utils.populateTableBody(table, data);
      }
    }
  });
}

// When the page has finished loading, execute the main() function
document.addEventListener('DOMContentLoaded', async () => main());
