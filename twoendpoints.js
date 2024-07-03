// functions needed are for encoding and verifying

const express = require('express');
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());

app.listen(3000);

const ALL_USERS =[
    {
        username : "suhani@gmail.com",
        password : "12345678",
        name : "Suhani Sengar",
    },
    {
        username : "abhi@gmail.com",
        password: "1234",
        name: "Abhijeet Sengar",
    },
    {
        username : "shiv@gmail.com",
        password : "2345",
        user : "Shiv Singh",
    },
];

function userExists (username, password) {
    // write logic to return true or false if the user exists 
    // in ALL_USERS array
    // hard todo - try to use the fund function in js. 
    let userExists = false;
    for (let i =0 ; i<ALL_USERS.length; i++) {
        if(ALL_USERS[i].username == username && ALL_USERS[i].password == password) {
            userExists = true;
        }
    }
    return userExists;
}

    app.post("/signin", function(req, res) {
        const username = rew.body.username;
        const password= req.body.password;

        if(!userExists(username, password)) {
            return res.status(403).json({
                msg: "User Doesn't exist in our memory db."
            });
        }

        var token = jwt.sign({ username : username}, jwtPassword);
        return res.json ({
            token,
        });
    });

app.get("/users", function (req, res) {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;

    //return a list of users other than this username
    res.json({
        users : ALL_USERS.filter(function(value) {
            if(value.username == username) {
                return false
            } else {
                return true;
            }
        })
    })
});