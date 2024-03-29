const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

// parse application/json
app.use(bodyParser.json());

//Create Database Connection
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud",
});


// connect to database
conn.connect((err) => {
    if (err) throw err;
    console.log("MySQL connected");
});

// app.get("/", (req, res) => {
//     // const sql = "SELECT * FROM users";
//     let sql = "INSERT INTO users (name, location) VALUES ('Ali','Hyderabad');";
//     let query = conn.query(sql, (err, result) => {
//         // if (err) throw err;
//         // res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
//         res.send("Hello worldsssasd");
//     });
// })
// app.post("/api/create", (req, res) => {
//     // const data = { name: req.body.name, location: req.body.location };
//     let sql = "INSERT INTO users (name, location) VALUES ('Ali','Hyderabad');";
//     let query = conn.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
//     });
// });
app.post("/api/create", (req, res) => {
    let data = { name: req.body.name, location: req.body.location };
    let sql = "INSERT INTO users SET ?";
    // let sql = "INSERT INTO users (name, location) VALUES ('Arsalan','lahore3');";
    let query = conn.query(sql, data, (err, result) => {
        res.send("Hello worldsssd");
        if (err) throw err;
        res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));


    });
});

// creat a new Record
// app.post("/api/create", (req, res) => {
//     let data = { name: req.body.name, location: req.body.location };
//     let sql = "INSERT INTO users SET ?";
//     let query = conn.query(sql, data, (err, result) => {
//         if (err) throw err;
//         res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
//     });
// });

app.use(cors({
    origin: ['http://localhost:3001/api/view', 'http://localhost:3001/api/view']
}));
app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.use(cors({
    origin: '*'
}));
// app.get('/ingredients', cors(), (req, res, next) => {
//     res.send(ingredients);
// });
// show all records
app.get("/api/view", cors(), (req, res, next) => {
    let sql = "SELECT * FROM users";
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({ status: 200, error: null, response: result }));
    });
});
// app.get("/api/view", (req, res) => {
//     let sql = "SELECT * FROM users";
//     let query = conn.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(JSON.stringify({ status: 200, error: null, response: result }));
//     });
// });

// show a single record
// app.get("/api/view/:id", (req, res) => {
//     let sql = "SELECT * FROM users WHERE id=" + req.params.id;
//     let query = conn.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(JSON.stringify({ status: 200, error: null, response: result }));
//     });
// });

// delete the record
// app.delete("/api/delete/:id", (req, res) => {
//     let sql = "DELETE FROM users WHERE id=" + req.params.id + "";
//     let query = conn.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(JSON.stringify({ status: 200, error: null, response: "Record deleted successfully" }));
//     });
// });

// update the Record
// app.put("/api/update/", (req, res) => {
//     let sql = "UPDATE users SET name='" + req.body.name + "', location='" + req.body.location + "' WHERE id=" + req.body.id;
//     let query = conn.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(JSON.stringify({ status: 200, error: null, response: "Record updated SuccessFully" }));
//     });
// });

app.listen(3001, () => {
    console.log("server started on port 3001...");
});