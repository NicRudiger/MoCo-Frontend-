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

export function localTimestamp(string) {
  return new Date(string).toLocaleString();
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
