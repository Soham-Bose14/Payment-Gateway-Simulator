const express = require('express');
const app = express();
const http = require('http');
const con = require('./database');

const port = 8000 || process.env.port;

const options = {
    hostname: 'localhost',
    port: port,
    path: '/',
    method: 'GET',
    headers: {'Content-Type': 'application/json',
    },
};

const request = http.request(options);

app.get('/', (request, res)=>{
    res.status(200).json({
        message: "Application started successfully on localhost",
    })
});

//To start the server
app.listen(port, ()=>{
    console.log(`The application successfully started on port ${port}`);
});

module.exports = app;