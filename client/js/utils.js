// Fetch data from API endpoint
export async function getData(endpoint, options = {}) {
  const resp = await fetch(endpoint, options);
  const data = await resp.json();
  return data;
}

// Get parameters from URL string
export function getURLParams() {
  return new URLSearchParams(window.location.search);
}

// Populate the headers of an HTML table with labels
export function populateTableHeaders(table, labels) {
  const headers = table.querySelector('thead > tr');
  headers.innerHTML = '';
  labels.forEach((item) => {
    headers.innerHTML += `<th>${item}</th>`;
  });
}

// Populate the body of an HTML with JSON data
export function populateTableBody(table, data) {
  const body = table.querySelector('tbody');
  data.forEach((row) => {
    const rowHTML = [];
    Object.keys(row).forEach((field) => {
      rowHTML.push(`<td>${row[field]}</td>`);
    });
    body.innerHTML += `<tr>${rowHTML.join(' ')}</tr>`;
  });
}

export function searchAll(data) {
  const results = [];
  data.forEach((row) => {
    console.debug(`Searching key: ${row}`);
    row.forEach((field) => {
      console.debug(`Searching field: ${field}`);
    });
  });
  return results;
}
