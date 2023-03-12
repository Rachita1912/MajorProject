const express = require("express");
const bodyParser = require("body-parser"); //data receive
const cors = require("cors");
const mongoose = require("mongoose"); //mongoDB -> better
const app = express();

app.use(express.static("public"));
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
const projectUrl =
  "mongodb+srv://rachita12:rachita12@cluster0.h4co6mv.mongodb.net/ProjectorBooking2?retryWrites=true&w=majority";

mongoose.set('strictQuery', false);

mongoose.connect(projectUrl,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

// structure of schema
const signUpSchema = new mongoose.Schema({
  Email: String,
  Password: String,
  cPassword:String,
  Emp_Id: String,
});

const loginSchema = new mongoose.Schema({
  Email: String,
  Password: String,
});

const signUp = mongoose.model("signUp", signUpSchema);
const login = mongoose.model("login", loginSchema);

// routing pages

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/page.html");
});

/*app.get("/#roadway", (req, res) => {
  res.sendFile(__dirname + "/Home.html#roadway");
});*/

// giving definition to the signUp schema

app.post("/signup", (req, res) => {
  const SignUp = new signUp({
    Email: req.body.email,
    Password:req.body.password,
    cPassword: req.body.cpassword,
    Emp_Id : req.body.emp_Id
  });

  console.log(req.body);

  //function which saves the data to the db
  SignUp.save(function (err) {    
    if (!err) {
      res.redirect("/");
    } else {
      console.log(err);
    }
  });
});

  app.post("/login", (req, res) => {
    const Login = new login({
      Email: req.body.email,
      Password:req.body.password,
    });

  console.log(req.body);

  Login.save(function (err) {
    if (!err) {
      res.redirect("/");
    } else {
      console.log(err);
    }
  });
});

  //Testing Purpose
  // console.log(req.body.user);

app.listen(3000, () => {
  console.log("Rachita's Server running on port 3000"); //3000 8000 5500
});
