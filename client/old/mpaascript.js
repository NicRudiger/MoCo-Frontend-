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
        <td><input type="checkbox" id=${rec.mpaa_id}></td>
        <td id="comment${rec.mpaa_id}" style="display:none">${rec.ssjc_comments}</td>
        `;
      tableBody.append(tableData);
    });
  }
  
mpaaTable()

function queryHandle() {
  const query_select = document.querySelector('input[name="query"]:checked').value;
  if (query_select == "Focus") {
    focusFilter()
  } else if (query_select == "Action") {
    actionFilter()
  } else if (query_select == "Timeline"){
    timeFilter()
  } else if (query_select == "Priority"){
    priFilter()
  } else if (query_select == "Comments"){
    comFilter()
  }
}

function focusFilter() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
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

function actionFilter() {
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

function timeFilter() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[6];
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
  input = document.getElementById("myInput");
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

function comFilter() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[9];
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
    td = tr[i].getElementsByTagName("td")[8];
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

function viewComments() {
  const password = "SSJC@2022";
  const user_pass = prompt("Enter your password to view comments");
  if (user_pass == password) {
    const tr = table.getElementsByTagName("tr");
    document.querySelector("#commentA").style.display = null;
    document.querySelector("#commentB").style.display = null;
    for (i = 1; i < tr.length-1; i++) {
        document.querySelector(`#comment${i}`).style.display = null;
    }
  }else{
    alert("Incorrect password. Please try again");
  }
}