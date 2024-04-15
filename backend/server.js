const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database: "crud"
})

app.get("/",(req,res) => {
    const sql = "SELECT * FROM student"
    db.query(sql, (err,data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})


app.post('/create', (req, res) => {
    const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?, ?)";
    
    const values = [
        req.body.name,
        req.body.email
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json("Error inserting data");
        }
        console.log("Data inserted successfully:", data);
        return res.json(data);
    });
});

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE student SET `Name` = ?, `Email` = ? WHERE ID = ?";
    
    const values = [
        req.body.name,
        req.body.email
    ];
    const id = req.params.id; // Use req.params.id to access route parameters

    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            console.error("Error updating data:", err);
            return res.status(500).json("Error updating data");
        }
        console.log("Data updated successfully:", data);
        return res.json(data);
    });
});


app.delete('/student/:id', (req, res) => {
    const sql = "delete from student where id = ?";
    const id = req.params.id; // Use req.params.id to access route parameters

    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error("Error updating data:", err);
            return res.status(500).json("Error updating data");
        }
        console.log("Data updated successfully:", data);
        return res.json(data);
    });
});

app.listen(8081, () => { // port number and function to say it is listening
    console.log("listening")
})

