// Fetch data from API endpoint
// export async function fetchJSON(endpoint, options = {}) {
//   const resp = await fetch(endpoint, options);
//   const data = await resp.json();
//   return data;
// }

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

// TODO: Remove unneeded sleep() function
/**
 * Sleep async execution for the specified duration.
 * @param {int} value Sleep duration in seconds
 */
export async function sleep(value) {
  await new Promise((r) => setTimeout(r, value));
}
