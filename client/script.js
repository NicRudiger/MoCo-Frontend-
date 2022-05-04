async function tfTable() {
  const tfRequest = await fetch(`/api/tfrecs`);
  const tfData = await tfRequest.json();
  const tableBody = document.querySelector('.target');
  tableBody.innerHTML = '';
  tfData.forEach((rec) => {
    const tableData = document.createElement('tr');
    tableData.innerHTML = `
      <td>${rec.action_id}</td>
      <td>${rec.focus_area}</td>
      <td>${rec.tf_rec}</td>
      <td>${rec.action}</td>
      <td>${rec.parties}</td>
      <td>${rec.progress}</td>
      <td>${rec.timeline}</td>
      <td>${rec.priority}</td>
      <td>${rec.comments}</td>
      `;
    tableBody.append(tableData);
  });
}

tfTable()

