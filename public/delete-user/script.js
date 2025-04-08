const tbody = document.getElementById("table-body");

  async function retrieveUserList() {
    const result = await fetch("/api/user-list");
    const userList = await result.json();

    writeToTable(userList);
  }

  function writeToTable(array) {
    let count = 1; // this variable will only display the sequence number of each entry
    for (const rowData of array) {
      // this code will add <tr></tr> element inside <tbody> element
      const row = tbody.insertRow(); // <tr></tr>

      // the following codes will add 7 <td></td> element in newly created <tr></tr>
      const cell0 = row.insertCell(); // <tr> <td></td> </tr>
      const cell1 = row.insertCell(); // <tr> <td></td> <td></td> </tr>
      const cell2 = row.insertCell(); // <tr> <td></td> <td></td> <td></td> </tr>
      const cell3 = row.insertCell(); // <tr> <td></td> <td></td> <td></td> <td></td> </tr>
      const cell4 = row.insertCell(); // <tr> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
      const cell5 = row.insertCell(); // <tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
      const cell6 = row.insertCell(); // <tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr>
      
      cell0.textContent = count++;
      cell1.textContent = rowData["first_name"];
      cell2.textContent = rowData["middle_name"];
      cell3.textContent = rowData["last_name"];
      cell4.textContent = rowData["address"];
      cell5.textContent = rowData["email"];

      const button = document.createElement("button"); // Creates an html button dynamically
      button.textContent = "Delete User";              // Equivalent to <button>Delete User</button>
      button.dataset.userEmail = rowData["email"]; // store the email of the user in the button data set
      button.onclick = handleDeleteAction; // invoking the handDeleteAction when user clicked the button

      cell6.appendChild(button); // adding the button to <td></td>
    }
  }

  // This function will handle the deletion of the user
  function handleDeleteAction(event) {
    const button = event.target; // retrieves the button that has been clicked, since multiple buttons shared a single function
    const userEmail = button.dataset.userEmail; // retrieves the stored user email from the clicked button

    deleteUserById(userEmail);
  }

  async function deleteUserById(userEmail) {
    const result = await fetch("/api/delete-user", {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_email: userEmail}) // send the user id to the API
    });

    const response = await result.text();
    console.log(response);

    alert("User was successfully deleted.");
    location = location; // refresh the web page
  }

  document.addEventListener("DOMContentLoaded", () => {
    retrieveUserList();
  });