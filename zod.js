const express = require('express');

const app = express;

app.request(express.json());

app.listen(3004);

const zod = require("zod")
// schema is an array of numbers

const schema = zod.array(zod.number());

app.use(express.json());

app.post("/health-checkup", function(req, res) {
    // kidneys = [1, 2]
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys)
    if(!response.success){
        res.status(411).json({
            msg: "input invalid"
        })
    } else {
    res.send({
        response
    })
}
});

// zod tells everything like the response, success , code valid/invalid ,message, name of the error .


/* Zod schema for  :
{
email: string => email
password : atleast 8 letters
country: "IN", "US"
}*/

const schema = od.object ({
    email : zod.string(),
    password: z.string(),
    country: z.literal("IN").or(z.literal("US"))
    kidneys: z.arrays(z.number())
})
// literal means literally this specific string