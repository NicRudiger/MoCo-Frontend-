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