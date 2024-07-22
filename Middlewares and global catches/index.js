const express = require("express");

const app = express();

app.listen(3000);
// constraints - user needs to send a kidneyId as a query param which should be a no. from 1 to 2  , user should send a username and password in headers. 
// ugly way - no middlewares
/*app.get("/health-checkup", function(req, res) {
    const kidneyId = req.query.kidneyId;
    const username = req.headers.username;
    const password = req.headers.password;

    if (username!= "Suhani" && password != "pass" ){
        res.status(403).json({
            msg: "wrong inputs",  
        });
        return;
    }
    // do something with the kidneys here
    if(kidneyId == 1|| kidneyId ==2){
    res.json({
        msg: "Your kidney is healthy",
    }) }
})
app.listen(3000);

// introduce another route that does kidney replacement

app.get("/health-checkup", function (req, res) {
    // do something with the kidneys here
    const kidneyId = req.query.kidneyId;
    const username = req.headers.username;
    const password = req.headers.password;

    if(!(username == "suhani" && password == "pass")) {
        res.status(403).json({
            msg : " User doesn't exist",
        });
        return;
    }

    if(!(kidneyId ==1 || kidneyId == 2)) {
        res.status(411).json ({
            msg : "wrong inputs",
        });
        return;
    }
    // do something with kidneys here

    res.send("Your kidney is healthy!");
});

app.put("/replace-kidney", function (req, res) {
    const kidneyId = req.query.kidneyId;
    const username = req.headers.username;
    const password = req.headers.password;

    if(!(username == "suhani" || password == "pass")) {
        res.status(403).json({
            msg: "User doesn't exist",
        });
        return;
    }

    if(!(kidneyId == 1 || kidneyId == 2)) {
        res.status(411).json({
            msg : "wrong inputs",
        });
        return;
    }
    // do something with the kidneys here

    res.send("Your kidney is healthy");
}) */

function userMiddleware(req, res ,next) {
    if(username != "suhani" && password != "pass") {
        res.status(403).json({
            msg : "Incorrect inputs",
        });
    } else {
        next();
    }
};

function kidneyMiddleware(req, res, next) {
    if(kidneyId != 1 || kidneyId != 2) {
        res.status(403).json ({
            msg: "wrong inputs",
        });
    }
    else {
        next();
    }
};

app.get("/health-checkup", userMiddleware, kidneyMiddleware, function(req, res) {
    // do something with the kidneys here

    res.send("Your kidney is healthy");
});

app.get("/kidney-check", userMiddleware, kidneyMiddleware, function(req, res) {
    // do something with the kidneys here
    
    res.send("Your kidney is healthy");
});

app.get("heart-check", userMiddleware, function(req, res) {
    // do something with the user here

    res.send("Your heart is healthy");
});

let numberOfRequests = 0;
function calculateRequests(req, res, next) {
    numberOfRequests++;
    console.log(numberOfRequests);
    next();
}

app.use(calculateRequests)

app.use(express.json()); // the popular one , this returns a function itself

app.post("/health-checkup2", function (req, res) {
    res.json({
        msg: "Hi there"
    })
});