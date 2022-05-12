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
      <td>${rec.ssjc_comments}</td>
      <td><input type="checkbox" id=${rec.action_id}></td>
      `;
    tableBody.append(tableData);
  });
}

tfTable()

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