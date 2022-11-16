// Fetch data from API endpoint
async function getData(endpoint, options = {}) {
  const data = await fetch(endpoint, options);
  const json = await data.json();
  return json;
}
