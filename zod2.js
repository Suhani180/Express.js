const express = require (express);

const z = zod;

const app = express;

app.use(express.json());

app.listen(3002);

const mySchema = z.string();

mySchema.parse("tuna");
mySchema.parse(12);

mySchema.safeParse("tuna");
mySchema.safeParse(12);

const user = z.object({
    username: z.string(),
});

user.parse({ username: "Laila"});

type user = z.infer<typeof user>;

const schema = z.schema(z.number());

app.post("/health-checkup", function (req, res) {
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys);
    const kidneyLength = kidneys.length;

    if(!response.success) {
        res.status(411).json({
            msg: "input is invalid"
        })
    } else {
        res.send( {
            response
        })
    } 
});

/* { 
    email: string => email
    password : atleast 8 letters
    country : "IN", "US"
}*/

const Schema = z.object({
    email: z.string(),
    password: z.string(),
    country : z.literal("IN").or(z.literal("US")),
    kidneys : z.array(z.number())
})

function validateInput(arr) {
    // if this is an array of number with atleast 1 input, return true ,else return false
    if(typeof arr == "object" && arr.length >= 1 && arr[0] == "number") {
        const schema = z.array(z.number());

        const response = schema.safeParse(arr);
        console.log(response);
    }

    validateInput(["1", 2, 3]);
}

app.post("/login", function(req, res) {
    const response  = validateInput(req.body)
    if(!response.success) {
        res.json({
            msg: "Your inputs are invalid"
        })
        return;
    }
})