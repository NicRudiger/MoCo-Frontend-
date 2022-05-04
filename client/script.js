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

async function mpaaTable() {
  const mpaaRequest = await fetch(`/api/mpaa`);
  const mpaaData = await mpaaRequest.json();
  const tableBody = document.querySelector('.mpaa_target');
  tableBody.innerHTML = '';
  mpaaData.forEach((rec) => {
    const tableData = document.createElement('tr');
    tableData.innerHTML = `
      <td>${rec.mpaa_id}</td>
      <td>${rec.focus_area}</td>
      <td>${rec.rps_rec}</td>
      <td>${rec.action}</td>
      <td>${rec.parties_responsible}</td>
      <td>${rec.progress}</td>
      <td>${rec.timeline}</td>
      <td>${rec.priority_level}</td>
      <td>${rec.ssjc_comments}</td>
      `;
    tableBody.append(tableData);
  });
}

mpaaTable()

async function auditTable() {
  const auditRequest = await fetch(`/api/audit`);
  const auditData = await auditRequest.json();
  const tableBody = document.querySelector('.audit_target');
  tableBody.innerHTML = '';
  auditData.forEach((rec) => {
  const tableData = document.createElement('tr');
    tableData.innerHTML = `
    <td>${rec.audit_id}</td>
    <td>${rec.action_id}
    <td>${rec.focus_area}</td>
    <td>${rec.recommendations}</td>
    <td>${rec.action}</td>
    <td>${rec.parties_responsible}</td>
    <td>${rec.progress}</td>
    <td>${rec.timeline}</td>
    <td>${rec.priority_level}</td>
    <td>${rec.ssjc_comments}</td>
    `;
    tableBody.append(tableData);
  });
}

auditTable()

