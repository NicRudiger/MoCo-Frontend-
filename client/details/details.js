import * as utils from '../utils.js';
import { views } from '../views.js';

function buildHistoryHeader(table, mapping) {
  function createHeading(text) {
    const heading = document.createElement('th');
    heading.textContent = text;
    return heading;
  }

  const head = table.querySelector('thead');
  const headFrag = document.createDocumentFragment();
  const row = document.createElement('tr');
  Object.keys(mapping).forEach((id) => {
    row.appendChild(createHeading(mapping[id]));
  });
  headFrag.appendChild(row);
  head.textContent = '';
  head.appendChild(headFrag);
}

function buildHistoryBody(table, mapping, data) {
  const body = table.querySelector('tbody');
  const bodyFrag = document.createDocumentFragment();
  data.forEach((entry) => {
    const row = document.createElement('tr');
    Object.keys(mapping).forEach((id) => {
      const cell = document.createElement('td');
      let value = entry[id];
      if (id == 'history_date') {
        value = utils.localTimestamp(value);
      }
      cell.textContent = value;
      row.appendChild(cell);
    });
    bodyFrag.appendChild(row);
  });
  body.textContent = '';
  body.appendChild(bodyFrag);
}

function buildComments(container, data) {
  const containerFrag = document.createDocumentFragment();
  Object.keys(data).forEach((index) => {
    const commentData = data[index];
    const comment = document.createElement('article');
    const body = document.createElement('div');
    const signature = document.createElement('em');
    comment.classList.add('message');
    comment.classList.add('is-dark');
    body.classList.add('message-body');
    body.classList.add('force-word-wrap');
    body.textContent = commentData.body;
    signature.textContent = `— ${commentData.name}, ${utils.localTimestamp(
      commentData.date
    )}`;
    body.appendChild(document.createElement('br'));
    body.appendChild(signature);
    comment.appendChild(body);
    containerFrag.appendChild(comment);
  });
  container.textContent = '';
  container.appendChild(containerFrag);
}

async function main() {
  const initialHistoryLimit = 3;
  const initialCommentsLimit = 2;

  const viewParam = 'v';
  const rowIDParam = 'r';

  // Parse URL parameters
  const URLParams = new URLSearchParams(window.location.search);
  const viewID = URLParams.get(viewParam);
  const rowID = URLParams.get(rowIDParam);
  console.debug(`viewID=${viewID}`);
  console.debug(`rowID=${rowID}`);

  const view = views[viewID];
  // Set view label
  const viewLabel = document.querySelector('#js-view-label');
  viewLabel.textContent = `${view.title} - Item #${rowID}`;

  // Load current view
  const historyData = await view.getHistoricalData(rowID);

  // Populate history table with data
  const historyTable = document.querySelector('#js-history-table');
  buildHistoryHeader(historyTable, view.historyMapping);
  buildHistoryBody(
    historyTable,
    view.historyMapping,
    historyData.slice(0, initialHistoryLimit)
  );

  // Hide history table spinner element
  const historySpinner = document.querySelector('#js-history-spinner');
  historySpinner.style.display = 'none';

  // Cconfigure history table reveal button
  const historyReveal = document.querySelector('#js-history-reveal');
  const hiddenHistoryRows = historyData.length - initialHistoryLimit;
  if (hiddenHistoryRows > 0) {
    historyReveal.textContent = `Load ${hiddenHistoryRows} More Rows`;
    historyReveal.style.display = 'block';
    historyReveal.addEventListener('click', () => {
      buildHistoryBody(historyTable, view.historyMapping, historyData);
      historyReveal.style.display = 'none';
    });
  }

  // Populate comments section
  const commentsContainer = document.querySelector('#js-comments');
  const commentsData = await view.getCommentsData(rowID);
  buildComments(commentsContainer, commentsData.slice(0, initialCommentsLimit));

  // TODO: Add display condition for when there are no comments
  // Configure comments reveal button
  const commentsReveal = document.querySelector('#js-comments-reveal');
  const hiddenComments = commentsData.length - initialCommentsLimit;
  if (hiddenComments > 0) {
    commentsReveal.textContent = `Load ${hiddenComments} More Comments`;
    commentsReveal.style.display = 'block';
    commentsReveal.addEventListener('click', () => {
      buildComments(commentsContainer, commentsData);
      commentsReveal.style.display = 'none';
    });
  }

  // Configure comment submission form
  const commentForm = document.querySelector('#js-comment-form');
  const commentName = commentForm.querySelector('[name="name"]');
  const commentBody = commentForm.querySelector('[name="body"]');
  const commentSubmit = commentForm.querySelector('button[type="submit"]');
  commentSubmit.addEventListener('click', () => {
    view.newComment(rowID, commentName.value, commentBody.value);
    commentName.value = '';
    commentBody.value = '';
  });
}

document.addEventListener('DOMContentLoaded', async () => main());
