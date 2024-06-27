const express = require('express');

const app = express();

app.use(express.json()); // as we are using it for body


app.post("/health-checkup", function (req, res) {
    //do something with the kidneys here

    const kidneys = req.body.kidneys;
    const kidneyLength = kidneys.length;

    res.send("Your kidney length is " + kidneyLength);
})

app.listen(3002);

// The problem with this middleware is that anyone can read the error in the backend in the server 

