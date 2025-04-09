# Web Application using Express and MongoDB

## API Creation (NodeJS)

Before you build your own API endpoint you must know the following JavaScript syntax:

### Arrow Function

Modern JavaScript introduced new syntax of function called Arrow Function which mostly has the same functionality with the plain function.

```javascript
const add = (num1, num2) => num1 + num2;

add(123, 456); // Output: 579
```

The defined code above is a one line arrow function, it is only used if the function will immediately return a value based on the given parameters. If the function has multiple codes or processes the following syntax must be used:

```javascript
const divide = (num1, num2) => {
  if (num2 == 0)
    return 0;
  
  return num1 / num2;
}

divide(123, 0); // Output: 0
divide(4, 2);   // Output: 2
```

### Syntaxes

```javascript
const divide = ...
```
To create an arrow function you must declare a variable that will hold the function, in this case the name of the variable is `divide`.

```javascript
= (num1, num2) => {
  ...
} 
```
This is the basic structure of the arrow function, there is no `function` keyword, just the parenthesis `()` and parameters inside, and immediately followed by the arrow `=>` which is the reason why it is called arrow function. If the content of the function is just one statement like `num1 + num2`, you can follow this statement immediately after the arrow `=>`. `(num1, num2) => num1 + num2`, the arrow symbol will act as the `return` keyword. But if the function contents has multiple line braces must be added after the arrow `(param1, param2) => { statement1; statement2; }`, with this approach, if a value must be returned you must use the `return` keyword inside these braces.

```javascript
(num1, num2) => {
  return num1 + num2;
}
```
---  
### Passing the Arrow function as an Argument

In JavaScript functions are also values that can be assigned to a variable and passed to function invocation as an argument.

```javascript
setTimeout(() => {
  console.log("Hello World!");
}, 1000);
```
`setTimeout` function is a JavaScript function used to execute a function after a specified time. 

```javascript
setTimeout(param1, param2);
```

The first parameter of this function must be a `function`, and the second argument must be a `number`, which is the time in milliseconds, this value will be the time must pass before the function will execute. As you can see from the code above, the arrow function is anonymous (no name), it is passed as an argument without declaring a variable. Functions in JavaScript can be passed as an argument even it is anonymous.

---
## API Endpoint

### 1. Install `express` library
In NodeJs you can create an API endpoint using `express` a JavaScript library that simplify the creation of APIs. The `express` library is not a built-in library and you must install it before you able to use it. To install the `express` library type the following code on the terminal of your vscode.

```npm
npm install express
```

By executing the above mentioned command, `node_modules` folder will automatically created inside your directory.

### 2. Create the entry point `index.js`

Create a file named `index.js` inside your directory and write the following JavaScript code.

```javascript
const express = require("express");

const app = express();
```

To use `express` library, you must import it first. By using the `require` function you are able to import all installed and built-in JavaScript library of NodeJS. The first line of the code declared a variable named `express` and followed by the invocation of the `require` function and a string value `"express"` as its argument. The value of this `express` variable is a function that will initialize the express application.

To Initialize `express`, you must invoke the `express` function and store the returned value in a variable as it is defined in the second line.

```javascript
const app = express();
```

Now that the express is now initialized, you are now able to create an API endpoint. But before you create one, you must know different types of API endpoint: `GET`, `POST`, `PUT`, and `DELETE`.

- `GET` - it is use for retrieval of data from the database.
- `POST` - it is use for creation of new record in the database.
- `PUT` - it is use for updating existing records in the database.
- `DELETE` - it is used remove a record from the database.

Now that you already know the 4 common type of API endpoint let's proceed on the actual creation.

### 3. API `GET` Endpoint (Data Retrieval)

To create a `GET` endpoint you need to use the `app` variable that you previously declared.


```javascript
app.get(param1, param2);
```

The first parameter of `.get` function is the url path that this API can be accessed, and the second parameter is the function (arrow or plain function) that will execute once the url was accessed by the client (browser). The following code is the simple implementation of a `GET` endpoint that will return a JSON (JavaScript Object Notation).

```javascript
app.get("/api/user-info", (req, res) => {
  res.json({
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@gmail.com"
  });
});
```

As you can see the arrow function that we passed as an argument has two parameters `req` and `res`. These parameters represents the `Request` and `Response` objects. 

The `Request` object contains all the information about the client (browser) such as the cookies, ip address and search queries sent by the client.

While the `Response` object is used to respond to the client (browser). You can send plain text, html and even a `JSON` to the client as the result of their request. 

Note: Remember every client `request` always has its own `response`. The following is the flow of data from client to api and vice-versa.

\
**Client Request**
```
(Client)                  (Server)
Browser  --- Request ---> API Endpoint
```

Once the API endpoint receives the request of the client, the API must respond with a data (plain text, html or JSON).

\
**Server Response**

```
(Server)                        (Client)
API Endpoint  --- Response ---> Browser
```

## 4. Server Listening Port

We already created our first API GET Endpoint, the express app must listen to a certain port, usually it is `3000`, the following code will make our express app to listen to port `3000`.

```javascript
app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});
```

---

## 5. Running the API Endpoint

After you created the `index.js` file and write the above mentioned code you can run the application using `node` command. The following is the command to run our NodeJS application. Open your terminal again of your vscode and type the following command.

```
node index.js
```
\
**Complete Code**

```javascript
const express = require("express");
const app = express();

app.get("/api/user-info", (res, req) => {
  res.json({
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@gmail.com"
  });
});

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
```

Once this application is running, our server is accessible using the url `http://localhost:3000`.

## Accessing the API Endpoint

Now that our API Endpoint is running in our server, you can now able to access it using your browser, by typing `http://localhost:3000` to your browser. Usually the browser receives the data from the web server in a form of HTML, but this time our API endpoint didn't respond an HTML instead it respond JSON (JavaScript Object Notation). The output that you will see on your browser is the JSON that was responded by our API endpoint.

```
{"first_name": "John",last_name: "Doe","email": "johndoe@gmail.com"}
```

When you see this output rendered by your browser, it means that we successfully created our API GET endpoint.  

---

### 1. Serve static files using Express

Express has many use, such as an API endpoints and serving static file (e.g. `.html`, `.js` and `.css`). In your current directory create a folder named `public`, all static files that we want to serve by the express will be created here. 

**1. Create `index.html`**

Inside the `public` folder, create `index.html` file and write the following code.

```html
<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Simple Express Crud</title>
  </head>
  <body>
    <h2>Simple Express CRUD</h2>
  </body>
  <script src="./script.js"></script>
</html>
```

\
**2. Create `script.js`**

At the same folder, create the `script.js` file and write the following script.

```javascript
console.log("Hello World!");
```

**3. Express Serve**

To make the express app to serve static files, the following script must be added to our `index.js`.

```javascript
import path from "path";

app.use(express.static(path.join(path.dirname("."), "public")));
```

Import the `path` library, it is use to join paths. Using `app.use` function we can add a middleware in our case `express.static` middleware. Middleware in express is a function that executes once the client connect to the server, it is executed before all API endpoints. The second line of our code commands our express app to serve static files located in `public` folder.



### JavaScript Fetch Function 

Browser can be usefull if we want to test our API endpoint but this is not the proper way, instead we need to use the `fetch` function of JavaScript.

\
***Note:** JavaScript is the programming language used by our browser (Client), it is also the language used by our NodeJs (Server). Both our Server and Client used the same language, but they are different to each other.*

The `fetch` function is used inside the `<script>` tag or in an external JavaScript file (`.js`). It means that we need an HTML where we must execute our `fetch` function. The following code is an example of accessing our API endpoint.

\
**Syntax:**
```
fetch(url, options)

options = {
  method: "post|get|put|delete",
  headers: {},
  body: ""
};
```

The first parameter of `fetch` function must be the url defined in our API endpoint, otherwise we will unable to connect to our API. 

The second parameter is an object that contains the method, headers and body of the request.

**Option `method`** 
* The `method` property defines what method of request we want to send to our API. Our API is a `get` endpoint therefore the method we need to define in `method` of our `fetch` options is also `get`. If the `method` we used in our `fetch` function does not matched the method used by our API endpoint, we will also unable to connect. 

**Option `headers`**
* The `headers` property contains all the information that we want to add to our request to the Server (API). If we want to send user data to the API in JSON format, we need to customized the `Content-Type` of our request body, we need to set it to `application/json`.  

```javascript
...
headers: {
  "Content-Type": "application/json"
}  
...
```

This option is necessary, this will tell our API that the data that being received is in JSON format.

**Option `body`**

* The `body` option contains all the data that we may send to our API such as the user inputs and other related data that is needed by our API. JSON formatted data are usually assigned to this option.

```javascript
  ...
  body: JSON.stringify({
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@gmail.com"
  })
  ...
```

You may wonder what are these code! Why there is a `JSON.stringify` in the code! Let me explain it to you, all data written in JSON format is a string, but if we want to use object instead, we can use `JSON.stringify` to convert JavaScript Objects to JSON formatted string. 

You may wonder also, if the data sent to our API is a string formatted as JSON, how can we now convert it back to JavaScript Object? We can use `JSON.parse` function to convert JSON formatted string to a JavaScript Object.

```javascript
JSON.parse('{"first_name": "John", "last_name": "Doe"}');
```

**Note:** The data formatted in JSON must be in a string state if we want to send it to our API or sent to the client from our API, and once the JSON formatted string received by the client or our API, we need to convert it back to JavaScript Object.


**Complete Example:**
```html
<script>
  async function retrieveUserInfo() {
    const result = await fetch("/api/user-info", {
      method: "get"
    });

    const response = await result.json();
  }
</script>
```

As you see to our sample code, we didn't use `headers` and `body` options, because we need only retrieve data therefore, we dont need to send additional JSON formatted data. You can also omit the `method` option because it is the default value of this option. You can type the code like the following:

```html
<script>
  async function retrieveUserInfo() {
    const result = await fetch("/api/user-info");
    const response = await result.json();
  }
</script>
```

We created a function (not an arrow function) but you can see that there is an `async` keyword before the `function` keyword, what does it mean? The `async` keyword must be prepend to a function (plain or arrow function) if we want to use the `await` keyword because it only can be used inside an asynchronous function. The `fetch` function must be used with `await` keyword to properly organized the flow of statement inside the function.

The first line in our sample code is just connecting to our API endpoint but it does not yet retrieve the response of the API. The second line does the job of retrieving the API response. The value of `response` variable is now a JSON object. By using `.json()` function on `result` variable the data received by our fetch is automtically parse as JSON data. 



## JS Fetch and NodeJS API

### Node JS (Backend - API)
``` javascript
app.post("/api/get-user", (req, res) => {W
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