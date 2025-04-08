function handleSubmit(event) {
  event.preventDefault();

  const userData = new FormData(event.target);

  const fname = userData.get("user-fname"); 
  const mname = userData.get("user-mname"); 
  const lname = userData.get("user-lname"); 
  const address = userData.get("user-address"); 
  const email = userData.get("user-email"); 

  registerUser({
    fname: fname, 
    mname: mname,
    lname: lname,
    address: address,
    email: email
  });

  event.target.reset();
}

async function registerUser(data) {
  const result = await fetch("/api/user-register", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const response = await result.text();
  alert("User successfull registered");
}