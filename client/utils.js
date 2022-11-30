// Fetch data from API endpoint
// export async function fetchJSON(endpoint, options = {}) {
//   const resp = await fetch(endpoint, options);
//   const data = await resp.json();
//   return data;
// }

export async function fetchJSON(endpoint, opts = {}) {
  const r = await fetch(endpoint, opts);
  return r.json();
}

/**
 * Check if localStorage API is accessible.
 * @returns
 */
export function checkLocalStorage() {
  const time = new Date().getTime();
  const key = `lsCheck-${time}`;
  try {
    window.localStorage.setItem(key, '');
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Copy text data to the user's clipboard, first attempting with the synchronous
 * clipboard API then falling back to the now deprecated execCommand().
 * @param {string} string Text intended for clipboard
 */
export function copyToClipboard(string) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(string);
  } else {
    const elem = document.createElement('textarea');
    elem.textContent = string;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
  }
  console.log(`Copied '${string}' to clipboard`);
}

export function buildTableHeader(table, mapping) {
  function createHeading(text) {
    const heading = document.createElement('th');
    heading.textContent = text;
    return heading;
  }

  const head = table.querySelector('thead');
  const headFrag = document.createDocumentFragment();
  const row = document.createElement('tr');
  row.appendChild(createHeading('Selected'));
  Object.keys(mapping).forEach((id) => {
    row.appendChild(createHeading(mapping[id]));
  });
  headFrag.appendChild(row);
  head.textContent = '';
  head.appendChild(headFrag);
}

export function buildTableBody(table, mapping, data) {
  const body = table.querySelector('tbody');
  const bodyFrag = document.createDocumentFragment();
  data.forEach((entry) => {
    const row = document.createElement('tr');
    row.setAttribute('data-result-id', entry.id);
    // Add checkbox to beginning of row
    const checkboxCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkboxCell.appendChild(checkbox);
    // Don't load details page when checkbox is clicked
    checkboxCell.onclick = (e) => {
      e.stopPropagation();
    };
    row.appendChild(checkboxCell);
    // Add cells and data according to view mapping
    Object.keys(mapping).forEach((id) => {
      // Add event to load details page when row is left clicked
      row.onclick = () => {
        window.location.href = `/details?v=null&r=null`;
      };
      const cell = document.createElement('td');
      cell.textContent = entry[id];
      row.appendChild(cell);
    });
    bodyFrag.appendChild(row);
  });
  body.textContent = '';
  body.appendChild(bodyFrag);
}

// TODO: Remove unneeded sleep() function
/**
 * Sleep async execution for the specified duration.
 * @param {int} value Sleep duration in seconds
 */
export async function sleep(value) {
  await new Promise((r) => setTimeout(r, value));
}
