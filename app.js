const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs');
const path = require('path');
const con = require('./database');

const home = fs.readFileSync('login.html');

const port = 8000 || process.env.port;

const options = {
    hostname: 'localhost',
    port: port,
    path: '/',
    method: 'GET',
    headers: {'Content-Type': 'application/json',
    },
};

app.use(express.static(path.join(__dirname, 'public')));


// const server = http.createServer((req, res)=>{
//     console.log(req.url);
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
//     res.end('home');
// });

//Middleware to get data from API end points
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


const request = http.request(options);

//API endpoints

app.get("/", (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, "login.html"));
});

app.get("/home", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "home.html"));
});


app.post("/login", (req, res)=>{
    const {fluxID, password} = req.body;
    //Logic for verification (To be added)
    if(fluxID && password){
        res.status(200).json({message: "Login successful"});
    }
    else{
        res.status(400).json({message: "Invalid credentials"});
    }
});

app.get("/pay", (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, "pay.html"));
});

app.post("/sendMoney", (req, res)=>{
    const {sender_id, recipient_id, bank_account, amount, pin, date} = req.body;

    let sql = `UPDATE user_credentials SET balance = balance + ? WHERE gateway_id = ?`;

    con.query(sql, [amount, recipient_id], (err, result)=>{
        if(err){
            console.error("Error in payment: ", err);
            return;
        }
        console.log("Money Received");
    });

    sql = `UPDATE user_credentials SET balance = balance - ? WHERE gateway_id = ?`;

    con.query(sql, [amount, sender_id], (err, result)=>{
        if(err){
            console.error("Error in payment: ", err);
            return;
        }
        console.log("Money sent");
    });

    //Generate a transaction id using python
    let transaction_id = 1001;
    let senderID = String(sender_id);

    sql = `INSERT INTO transactions VALUES(?,?,?,?,?,?,?)`;
    
    //Find how to get sender ip and receiver ip
    let sender_ip = "192.222.168.191"
    let receiver_ip = "168.161.222.190"
    
    con.query(sql, [transaction_id, senderID, recipient_id, amount, date, sender_ip, receiver_ip], (err, result)=>{
        if(err){
            console.error("Transaction Failed!", err);
            return;
        }
        console.log("Transaction Successful");
    });

});

app.get("/signUp", (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, "signUp.html"));
});


app.post("/signUpDetails", (req, res)=>{
    const {firstName, lastName, pin, email, bank_acc, phoneNumber, dob, gender, gateway_id, password_hash, last_login} = req.body;
    //Execute sql query to fill in the details for new user in the database
    //Send data to database
    
    const sql = `
        INSERT INTO user_credentials 
        (gateway_id, bank_acc_no, firstName, lastName, PIN, email, password_hash, phone_no, dob, gender, last_login) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [gateway_id, bank_acc, firstName, lastName, pin, email, password_hash, phoneNumber, dob, gender, last_login];

    con.query(sql, values, (err)=>{
        if(err){
            return console.log("Couldn't enter data into database!", err);
        }
        res.status(200).send({ message: "User successfully added!" });
    });
});

app.get("/getBalance", async(req, res)=>{
    const user_id = req.body;
    const sql = `SELECT balance from user credentials WHERE gateway_id = ?`;
    let results = []

    try{
        results = await con.query(sql, [user_id]);
        console.log(results[0]);
    }
    catch(err){
        return console.log(err);
    }
    query_results = results[0];
});

//To start the server
app.listen(port, ()=>{
    console.log(`The application successfully started on port ${port}`);
});

module.exports = app;