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