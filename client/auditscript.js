async function auditTable() {
    const auditRequest = await fetch(`/api/audit`);
    const auditData = await auditRequest.json();
    const tableBody = document.querySelector('.audit_target');
    tableBody.innerHTML = '';
    auditData.forEach((rec) => {
    const tableData = document.createElement('tr');
      tableData.innerHTML = `
      <td>${rec.audit_id}</td>
      <td>${rec.focus_area}</td>
      <td>${rec.recommendations}</td>
      <td>${rec.action}</td>
      <td>${rec.parties_responsible}</td>
      <td>${rec.progress}</td>
      <td>${rec.timeline}</td>
      <td>${rec.priority_level}</td>
      <td>${rec.ssjc_comments}</td>
      <td><input type="checkbox" id=${rec.audit_id}></td>
      `;
      tableBody.append(tableData);
    });
  }
  
auditTable()

function tableFilter() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function priFilter() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("priInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function checkFilter() {
  var table, tr, td, i;
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[9];
    if (td) {
      const check = document.getElementById(i);  
      if (check.checked == true) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}