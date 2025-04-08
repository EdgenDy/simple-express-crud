import path from "path";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";

// initialize the express
const app = express();

// make the json parsing supports in incoming request
app.use(express.json());

// serve all the html, css and js files inside the public folder
app.use(express.static(path.join(path.dirname("."), "public")));

// this variable will hold the database connection
let database = null;



/**
 * This function is used to connect to mongodb server
 * once this function was invoked, all proceeding invocation
 * will only return a single instance of MongoDB Database
 * 
 * You can just copy this function and use it to your project
 */
async function connectToDB() {
  // This condition ensures that this server will connect to the database once only
  // to prevent excessive usage of memory
  if (database)
    return database;

  // Initialization of MongoDB Client
  // you can change the "localhost" to ip address of the host 
  // e.g. mongodb://192.168.1.1:27017
  const client = new MongoClient("mongodb://localhost:27017/");
  // connecting to the mongodb server
  await client.connect();

  // Accessing the database, replace the name of your actual name of your database
  database = client.db("system-name");

  // return the database connection
  return database;
}


/**
 * An api that will register a user (save to database)
 * (req, res) => {} is equivalent to function(req, res) {}
 * This function is called arrow function (latest syntax of
 * JavaScript function)
 *
 * Client Requests can be in different methods 
 * There 4 common Client Request Method
 * 1. GET - use to retrieve data (e.g. app.get())
 * 2. POST - use to save and update data in the database (e.g. app.post())
 * 3. UPDATE - use to update the existing data in the database (e.e. app.update())
 * 4. DELETE - use to delete a record in the database (e.g. app.delete())
 *
 * app.get function requires two parameters Request and Response
 * req parameter contains all the information about the request
 * such as the queries that has been sent along with the url
 *
 * the function (req, res) => {} will be invoked automatically
 * by the express once the server detects client request at the
 * specified url "/api/user-register"
 * If the browser navigates to http://localhost:3000/api/user-register
 * all codes inside this function will execute
 */
app.post("/api/user-register", async (req, res) => {
  const db = await connectToDB();
  // connecting to the user_accounts collection (in mysql it is the table)
  const user_accounts = db.collection("user_accounts");

  // retrieving the information sent by the user through <input> tags
  const {fname, mname, lname, address, email} = req.body;

  const result = user_accounts.insertOne({
    first_name: fname, 
    middle_name: mname, 
    last_name: lname, 
    address: address, 
    email: email 
  });

  res.json({
    type: "success",
    inserted_id: result.insertedId
  });
});


app.get("/api/user-list", async (req, res) => {
  const db = await connectToDB();
  const users = db.collection("user_accounts");

  const userList = await users.find({}).toArray();

  res.json(userList);
});

app.delete("/api/delete-user", async (req, res) => {
  const db = await connectToDB();
  const users = db.collection("user_accounts");

  const {user_email} = req.body;
  
  const result = await users.deleteOne({email: user_email});
  console.log(result);
  res.json({
    type: "success"
  });
});

app.get("/api/user-info", async (req, res) => {
  const db = await connectToDB();
  const users = db.collection("user_accounts");

  const {email} = req.query;
  const info = await users.findOne({email: email});
  
  res.json({
    type: "success",
    data: info
  });
});

app.put("/api/update-user-info", async (req, res) => {
  const db = await connectToDB();
  const users = db.collection("user_accounts");

  const {email, first_name, middle_name, last_name, address} = req.body;

  await users.updateOne({ email: email }, {
    $set: {
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      address: address
    }
  });
  
  res.json({
    type: "success"
  });
});

app.listen(3000);