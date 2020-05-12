//var http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const methodOverride = require("method-override");
//onst { ObjectID } = require("mongodb");
const signup = require("./routes/signup");
const login = require("./routes/login");
const newNote = require("./routes/newNote");
const userAuth = require("./middleware/userAuth");
const fetchNotes = require("./routes/fetchNotes");
const searchNotes = require("./routes/searchNotes");
const shareNotes = require("./routes/shareNotes");
const openSharedNotes = require("./routes/openSharedNotes");
const updateNotes = require("./routes/updateNotes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

MongoClient.connect(
  "mongodb+srv://testUser1:NavejJIIYGHYb6AU@testcluster-cgcxv.mongodb.net/test1?retryWrites=true&w=majority",
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      throw err;
    }
    console.log("databse connected");
    const db = client.db("test1");

    app.post("/signup", (req, res) => {
      signup.handleSignup(req, res, db);
    });
    app.post("/login", (req, res) => {
      login.handleLogin(req, res, db);
    });

    app.post("/newNote", userAuth, (req, res) => {
      newNote(req, res, db);
    });

    app.get("/fetchNotes", userAuth, (req, res) => {
      fetchNotes(req, res, db);
    });

    app.post("/searchNotes", userAuth, (req, res) => {
      searchNotes(req, res, db);
    });

    app.get("/shareNotes/:id", userAuth, (req, res) => {
      shareNotes(req, res, db);
    });

    app.get("/openSharedNotes/:token", userAuth, (req, res) => {
      openSharedNotes(req, res, db);
    });
    app.put("/updateNotes/:id", userAuth, (req, res) => {
      updateNotes(req, res, db);
    });
  }
);

//create a server object:
// http
//   .createServer(function(req, res) {
//     console.log("server listening");
//     //write a response to the client
//     res.end(); //end the response
//   })

//   .listen(8080); //the server object listens on port 8080
app.listen("5000", () => {
  console.log("server is listening!");
});
