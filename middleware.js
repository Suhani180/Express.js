const express = require ("express");

const app = express();

//app.use() takes only middleware as an input .

//app.use(express.json()); use means this middleware is going to be called everywhere.

app.use(calculateRequests)// now the middleware- calculateRequests will be used everywhere in every route after this.

app.listen(3001);

/*app.get("/health-checkup", function(req, res) {
    const userName = req.headers.userName;
    const password = req.headers.password;
    const kidneyId = req.query.kidneyId;
    
    if(userName != "Suhani" || password != "pass"){
        res.status(400).json({"msg" : "somethings wrong with the inputs"})
        return
    }

    if(kidneyId != 1 || kidneyId != 2) {
        res.status(400).json({"msg" : "Somethings wrong with your inputs"})
        return
    }
    //do something with kidneys here
    res.json({
        msg : "Your kidneys are fine !"
    })
});
// Above is an uly way of calling functions, below is the better way of doing so . */


/*app.get("/health-checkup", function(req,res, next) {
    console.log("hi from req1")
    next();
}, function(req, res) {
    console.log("hi from req2")
});
// In above first the function first will be called and then if everything goes fine then next is another function which will call the second function*/


// middleware are just functions which takes an argument just like next  , and they perform pre-checks and if everything is correct , they will return right there else they will call the next function after the first function .


function userMiddleware(req , res ,next) {
    if(username != "Suhani" && password != "pass") {
        res.status(403).json({
            msg : "Incorrect Inputs",
        });
    } else {
        next();
    }
};

function kidneyMiddleware (req , res , next) {
    if(kidneyId != 1 || kidneyId != 2) {
        res.status(403).json({
            msg : "Incorrect inputs",
        });
    }
    else {
        next();
    }
};

app.get("/health-checkup", userMiddleware, kidneyMiddleware , function(req , res) {
    // do something with the kidney here

    res.send("Your heart is healthy");
});

// Difference between res.send and res.json - res.send sends texts and res.json is for sending json , if we write something like res.json("abshhvmm") - it will show error. 

function rateLimiter() {
    // this function allows only specific no. of checks  and then we can pass this function as an argument in another function .
}

app.get("/kidney-check", userMiddleware , kidneyMiddleware, function (req, res) {
    // do something with the kidneys here

    res.send("Your heart is healthy");
});

let numberOfRequests = 0;
function calculateRequests(req, res, next) {
    numberOfRequests++;
    console.log(numberOfRequests);
    next();
}

app.use(express.json())


//we use req.body because body can be anything like text , html or anything so here we specify json. That means I am expecting json as input , please pass json as input.

app.post("/health-checkup", function(req, res) {
    console.log(req.body);
    res.json({
    msg : "Hi there"
})

});

app.get("/health-checkup", rateLimiter , function(req, res) {


});
