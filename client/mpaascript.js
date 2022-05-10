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

function tableFilter() {
var input, filter, table, tr, td, i, txtValue;
input = document.getElementById("myInput");
filter = input.value.toUpperCase();
table = document.getElementById("table");
tr = table.getElementsByTagName("tr");

for (i = 0; i < tr.length; i++) {
  td = tr[i].getElementsByTagName("td")[3];
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
  td = tr[i].getElementsByTagName("td")[7];
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