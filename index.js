const express = require("express");
const app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
var cors = require("cors");

var con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "db_api",
  insecureAuth: true,
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register", (req, res) => {
  const { email, password, username } = req.body;

  console.log(username);

  const sqlInsert =
    "INSERT INTO user_details( email, password, username) VALUES (?,?,?);";

  con.query(sqlInsert, [email, password, username], (err, result) => {
    if (err) {
      res.send("Duplicate  Data ");
    }
  });
});

app.post("/api/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const sqlQuery = "SELECT * FROM user_details WHERE email =? and password = ?";

  con.query(sqlQuery, [email, password], (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      console.log(result[0]);
      res.send(result[0]);
    }
  });
});

app.post("/api/register", (req, res) => {
  const { company, address, email, password } = req.body.userDetails;

  const query =
    "INSERT INTO user_details( company, address, email, password) VALUES (?,?,?,?);";

  con.query(query, [company, address, email, password], (err, result) => {
    if (err) {
      res.send(err);
    }
  });
});

app.get("/api/orders", (req, res) => {
  const query = "SELECT * FROM order_details";
  con.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/api/edit_order", (req, res) => {
  let id = req.query.id;

  const sqlQuery = "SELECT * FROM order_details WHERE id =? ";

  con.query(sqlQuery, [id], (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      console.log(result[0]);
      res.send(result[0]);
    }
  });
});

app.listen(8080, () => {
  console.log("running on port 3030, happy coding");
});
