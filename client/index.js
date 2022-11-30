import * as utils from './utils.js';
import { views } from './views.js';

function hideCheckedRows(table) {
  const ids = [];
  const body = table.querySelector('tbody');
  const rows = body.querySelectorAll('tr[data-result-id]');
  rows.forEach((row) => {
    const checkbox = row.querySelector('td > input[type="checkbox"');
    if (checkbox.checked) {
      ids.push(row.dataset.resultId);
    } else {
      row.setAttribute('hidden', '');
    }
  });
  return ids;
}

function unhideRows(table) {
  const body = table.querySelector('tbody');
  const rows = body.querySelectorAll('tr[data-result-id][hidden]');
  rows.forEach((row) => {
    row.removeAttribute('hidden');
  });
}

function checkRows(table, ids) {
  if (ids.length > 0) {
    const body = table.querySelector('tbody');
    const rows = body.querySelectorAll('tr[data-result-id]');
    rows.forEach((row) => {
      if (ids.includes(row.dataset.resultId)) {
        const checkbox = row.querySelector('td > input[type="checkbox"]');
        checkbox.checked = true;
      }
    });
  }
}

function searchRows(data, mapping, query) {
  const results = [];
  data.forEach((row) => {
    Object.keys(mapping).every((id) => {
      if (String(row[id]).includes(query)) {
        results.push(row);
        return false;
      }
      return true;
    });
  });
  return results;
}

async function main() {
  /**
   * Define table views, establishing a mapping between table columns and their
   * human-readable labels. The other in which these mappings are defined is the
   * order in which they will appear in the results table. Omitted columns will
   * not be shown.
   */
  const defaultViewID = 'tf_recs';
  const viewParam = 'v';
  const queryParam = 'q';
  const selectParam = 's';

  const URLParams = new URLSearchParams(window.location.search);
  // Set active view, falling back to the default if not specified in URL params
  let viewID = URLParams.get(viewParam);
  if (!Object.keys(views).includes(viewID)) viewID = defaultViewID;
  // TODO: Use URL-safe encoding for view parameter
  const view = views[viewID];

  // Set page title
  document.title = `SSJC - ${view.title}`;

  // Configure view label
  const viewLabel = document.querySelector('#js-view-label');
  viewLabel.textContent = view.title;

  // Configure view navigation buttons
  Object.keys(views).forEach((key) => {
    const viewTag = views[key].tag;
    const id = `#js-view-nav__${viewTag}`;
    const navButton = document.querySelector(id);
    // Disable button if it's for the active view
    if (view.tag == viewTag) navButton.setAttribute('disabled', '');
    navButton.textContent = views[key].title;
    navButton.addEventListener('click', () => {
      const newParams = new URLSearchParams();
      newParams.set(viewParam, key);
      window.location.search = newParams;
    });
  });

  // Load data from API
  const cacheSupported = utils.checkLocalStorage();
  if (cacheSupported === true) view.refreshCache();
  const data = await view.getData();
  if (cacheSupported === true && view.getCache() === null) view.cache(data);

  // Populate table with view data
  const resultsTable = document.querySelector('#js-results-table');
  utils.buildTableHeader(resultsTable, view.mapping);
  utils.buildTableBody(resultsTable, view.mapping, data);

  // Hide spinner element
  const spinner = document.querySelector('#js-results-spinner');
  spinner.style.display = 'none';

  // Configure search bar
  const searchBar = document.querySelector('#js-table-search');
  let initialQuery = URLParams.get(queryParam);
  let query = '';
  let prevSearchQuery = '';
  let results = data;
  searchBar.addEventListener('keyup', () => {
    query = searchBar.value;
    if (query == '') {
      // If the query is empty, skip running the actual search
      results = data;
    } else if (query.includes(prevSearchQuery) && prevSearchQuery != '') {
      /**
       * If the previous query is a substring of the current query, our results
       * must then be a subset of the previous query's results. This means we
       * can save some time by searching the previous result set rather than the
       * entire data set.
       */
      results = searchRows(results, view.mapping, query);
    } else {
      /**
       * If neither of the above conditions are true, we can't make any useful
       * assumptions about our result set and must search through the entire
       * dataset to find matching rows.
       */
      results = searchRows(data, view.mapping, query);
    }
    // Don't rebuild the table if our query hasn't actually changed
    if (query != prevSearchQuery) {
      utils.buildTableBody(resultsTable, view.mapping, results);
    }
    prevSearchQuery = query;
  });
  // Load query from URL parameters, otherwise clear search bar contents
  if (initialQuery !== null) {
    initialQuery = decodeURIComponent(initialQuery);
    searchBar.value = initialQuery;
    searchBar.dispatchEvent(new Event('keyup'));
  } else {
    searchBar.value = '';
  }

  /**
   * Configure "Show Selected" button.
   */
  let initialSelected = URLParams.get(selectParam);
  let selected = [];
  const showSelected = document.querySelector('#js-show-selected');
  showSelected.addEventListener('click', () => {
    if (showSelected.classList.contains('is-outlined')) {
      selected = hideCheckedRows(resultsTable);
      showSelected.classList.remove('is-outlined');
      searchBar.setAttribute('disabled', '');
    } else {
      unhideRows(resultsTable, selected);
      selected = [];
      showSelected.classList.add('is-outlined');
      searchBar.removeAttribute('disabled');
    }
  });
  if (initialSelected !== null) {
    selected = JSON.parse(decodeURIComponent(initialSelected));
    checkRows(resultsTable, selected);
    showSelected.dispatchEvent(new Event('click'));
  }

  // Configure share button
  const shareButton = document.querySelector('#js-share-url');
  shareButton.addEventListener('click', () => {
    const shareURL = new URL(window.location.origin);
    shareURL.searchParams.set(viewParam, view.id);
    if (selected.length === 0) {
      if (query !== '') {
        shareURL.searchParams.set(queryParam, encodeURIComponent(query));
      }
    } else {
      shareURL.searchParams.set(
        selectParam,
        encodeURIComponent(JSON.stringify(selected))
      );
    }
    utils.copyToClipboard(shareURL);
  });
}

document.addEventListener('DOMContentLoaded', async () => main());
