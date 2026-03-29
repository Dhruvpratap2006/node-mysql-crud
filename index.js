const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
require('dotenv').config();

app.set("view engine" , "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true}))
app.use(express.static("public"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD  // ✅ safe!
});

// functio to grnerate random data from faker 
let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
}

// Home Page Route
app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM user`;

  try {
  connection.query(q, (err, result) => {
  if(err) throw err;
  let count = result[0]["count(*)"]
  res.render("home.ejs" , { count }); // we use render when we want to send the entire ejs page
  })
} catch(err) {
  console.log(err);
  res.send("some error in DB")
}

  console.log("Welecome to home page")
})

// Show Data of DB Route
app.get("/user", (req, res) => {
  let q = `SELECT * FROM user`
  try{
    connection.query(q, (err, users) => {
      if(err) throw err;
      res.render("show_user.ejs", { users });
    })
  } catch(err) {
    console.log(err);
    res.send("some error in DB")
  }
})

// edit Route => sends form for edit the route
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params; // get id from URL e.g. /user/123/edit
  let q = `SELECT * FROM user WHERE id='${id}'` // findig that id and get user info through id in database
  try{
    connection.query(q, (err, result) => {
      if(err) throw err;
      let user = result[0]; // first row = our user
      res.render("edit.ejs", { user }); // send user data to form

    })
  } catch(err) {
    console.log(err);
    res.send("some error in DB")
  }
})

// update route => this will edit the username
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password:formPass , username: newWsername} = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try{
    connection.query(q, (err, result) => {
      if(err) throw err;
      let user = result[0];
      if(formPass != user.password) {
        res.send("wrong password!");
      } else {
        let q2 = `UPDATE user SET username='${newWsername}' WHERE id='${id}'`
        connection.query(q2, (err, result) => {
          if(err) throw err;
          res.redirect("/user");
        })
      }
    })
    
  } catch(err) {
    console.log(err);
    res.send("error found while fetching data from database");
  }
})

// add a user in database
// for this we have to create a form then we add all info of user in form and add it in db
// so first use get request to take the form in which we can fill the data of the user to add in database
app.get("/user/add", (req, res) => {
  res.render("add_user.ejs");
})

// now post request to add the data
app.post("/user", (req, res) => {
  // first take the user data from the form 
  let { id, username, email, password } = req.body;
  let q = `INSERT INTO \`user\` (id, username, email, password) VALUES (?, ?, ?, ?)`;
  try{
    connection.query(q, [id, username, email, password], (err, result) => {
    if(err) throw err;
    res.redirect("/user");
    })
  } catch(err) {
    console.log(err);
    res.send("Some error has occured in database");
  }
})

// delete the user from the data base if the entered id and password is correct otherwise not
  app.delete("/user/:id", (req, res) => {
  let { id } = req.params;  // ✅ req.params not req.body
  let q = `DELETE FROM \`user\` WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if(err) throw err;
      res.redirect("/user");
    })
  } catch(err) {
    console.log(err);
    res.send("some error has occured while deleting the user details");
  }
})

app.listen("8080", () => {
  console.log("server is listening on port 8080");
})



