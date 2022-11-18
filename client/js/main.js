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
function loadView(view) {
  location.search = `v=${view}`;
}

async function main() {
  const search = document.querySelector('#search');
  const table = document.querySelector('#data');

  /**
   * Populate HTML template with current view
   */
  // Use requested view, falling back on the default if necessary
  let viewID = getView();
  if (Object.keys(views).indexOf(viewID) == -1) {
    viewID = default_view;
  }
  const view = views[viewID];
  // Update page heading to reflect current view
  const viewLabel = document.querySelector('#view-label');
  viewLabel.innerHTML = view.label;
  // Disable navigation button for current view
  const navButton = document.querySelector(`#${view.prefix}-nav`);
  navButton.setAttribute('disabled', '');
  // Populate HTML table with data
  const data = await utils.getData(view.endpoint);
  utils.populateTableHeaders(table, view.columns);
  utils.populateTableBody(table, data);

  /**
   * Add functionality to view navigation buttons
   */
  Object.keys(views).forEach((key) => {
    const button = document.querySelector(`#${views[key].prefix}-nav`);
    button.addEventListener('click', () => loadView(key));
  });

  /**
   * Add filtering functionality to search bar.
   * The search logic is as follows:
   *   1. If query is blank return the entire dataset, as we want all rows in
   *      dataset to be displayed.
   *   2. If query is a substring of the previous query (e.g., 'th' -> 'the')
   *      the new results must be a subset of the previous results.
   *   3. If either of the above conditions are true, search the entire dataset,
   *      as there is no way to narrow down the results list prior to actually
   *      searching it.
   */
  let pQuery = '';
  let results = data;
  search.addEventListener('keyup', () => {
    const query = search.value;
    if (query == '') {
      results = data;
    } else if (query.includes(pQuery) && pQuery != '') {
      results = utils.searchRows(query, results);
    } else {
      results = utils.searchRows(query, data);
    }
    pQuery = query;
    utils.populateTableBody(table, results);
  });
}

// When the page has finished loading, execute the main() function
document.addEventListener('DOMContentLoaded', async () => main());
