const emailSpan = document.getElementById("user_email");
  const tbody = document.getElementById("tbody");

  const fname = document.getElementById("fname");
  const mname = document.getElementById("mname");
  const lname = document.getElementById("lname");
  const address = document.getElementById("address");

  const url = new URL(location.href);
  const userEmail = url.searchParams.get("user_email");

  if (!userEmail) { // If the userEmail cannot be found, show an alert message
    alert("Invalid search parameter");
    throw new Error("Invalid search parameter");
  }

  emailSpan.textContent = userEmail;

  function handleSubmit(event) {
    event.preventDefault();

    const userInput = new FormData(event.target);

    const fname = userInput.get("fname");
    const mname = userInput.get("mname");
    const lname = userInput.get("lname");
    const addr = userInput.get("address");

    updateUserInfo({
      first_name: fname,
      middle_name: mname,
      last_name: lname,
      address: addr,
      email: userEmail
    });
  }

  async function retrieveUserInfo(email) {
    const result = await fetch("/api/user-info/?email=" + email);
    const response = await result.json();
    
    // if the user email cannot be found in the database
    if (!response.data) { // the following codes will execute
      alert("Email cannot be found in the database");
      return null;
    }

    const data = response.data;
    fname.value = data["first_name"];
    mname.value = data["middle_name"];
    lname.value = data["last_name"];
    address.value = data["address"];
  }

  async function updateUserInfo(userInfo) {
    const result = await fetch("/api/update-user-info", {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfo)
    });

    const response = await result.json();
    alert("User Successfull updated");
    location = location;
  }

  retrieveUserInfo(userEmail);