# JS Fetch and NodeJS API

### Node JS (Backend - API)
``` javascript
app.post("/api/get-user", (req, res) => {
  const { first_name, last_name } = req.body;
  // first_name - John Carlo
  // last_nme - Bascones
  res.json({
    type: "success",
    data: "Hello World!"
  });
})
```

### JavaScript (Frontend - &lt;script&gt;)
```javascript
const userInput = {
  first_name: "John Carlo",
  last_name: "Bascones"
};

const result = await fetch("/api/get-user", {
  method: "post", // You can change this to "get", "update" and "delete"
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(userInput)
});

const serverResponse = await result.json();
console.log(serverResponse); // JS Object {type: "success", data: "Hello World!"}
```

In the JavaScript code, the url must matched the url defined in the API. The `userInput` variable can be changed as well, you can add more properties to match the data sent by the user.

```javascript
// Node JS
app.post("/api/get-user", ...)

// <script>
fetch("/api/get-user", { method: "post" });
```

By using `fetch` function you are able to send data along with the request and receive data along with the response of the API.

## Sending Data using Fetch function (Frontend)

To send data into an API, you must use `fetch` function, you can also use `<form>` and `<input>` tags where users can enter their data.

### HTML
```html
<form onsubmit="handleSubmit(event)">
  <label>First name</label>
  <input type="text" name="user-fname" />

  <label>Last name</label>
  <input type="text" name="user-lname" />

  <input type="submit" />
</form>
```

### Script
```html
<script style="module">
  function handleSubmit(event) {
    event.preventDefault();

    const userData = new FormData(event.target);

    const fname = userData.get("user-fname");
    const lname = userData.get("user-lname");

    sendData({
      first_name: fname,
      last_name: lname
    });
  }

  async function sendData(data) {
    const result = await fetch("/api/save-user", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  }
</script>
```

## Receiving the Data (API - NodeJS)

For frontend able to send data to the API server, first you must create the API endpoint.

### NodeJS (index.js)
```javascript
app.post("/api/save-user", (req, res) => {
  const { first_name, last_name } = req.body;

  // In this part you can save the received data 
  // in the database

  res.json({
    type: "success",
    message: "Data successfully received"
  });
})
```