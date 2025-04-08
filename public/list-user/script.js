const tbody = document.getElementById("table-body");

async function retrieveUserList() {
  const result = await fetch("/api/user-list");
  const userList = await result.json();

  writeToTable(userList);
}

function writeToTable(array) {
  let count = 1;
  for (const rowData of array) {
    const row = tbody.insertRow();

    const cell0 = row.insertCell();
    const cell1 = row.insertCell();
    const cell2 = row.insertCell();
    const cell3 = row.insertCell();
    const cell4 = row.insertCell();
    const cell5 = row.insertCell();
    
    cell0.textContent = count++;
    cell1.textContent = rowData["first_name"];
    cell2.textContent = rowData["middle_name"];
    cell3.textContent = rowData["last_name"];
    cell4.textContent = rowData["address"];
    cell5.textContent = rowData["email"];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  retrieveUserList();
});