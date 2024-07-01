// is this is an array of strings with atleast 1 input, return true, else return false 
function validateInput (arr) {
    if (typeof arr == "object" && arr.length >= 1 && typeof arr[0] == "number") {
console.log("this is valid input")
    }
    else {
        console.log("input invalid")
    }
}

validateInput([1, 2, 3]);
// if we were supposed to use zod , then 

// if this is an array of number with atleast 1 input , return true , else return false

function validate (arr){
const zod = require("zod")

const schema  = zod.array(zod.number())

const response = schema.validate(arr);
console.log(response);
}

// zod can be used without express also , you just have to input and validate a schema 

validate(["1", 2, 3]);

// some of the functions in which zod can be used is - z.string().max(n), z.string().mail(), z.string().url(), etc.

function validateInput(obj) {
    const schem = zod.object({
        email: zod.string().email,
        password: zod.string().min(8)
    })
    const response = schem.safeParse(obj);
    console.log(response);

}

validateInput({
    email: "suhani18@gmail.com",
    password: "nkgsadgcdjbdjb"
});

app.post("/login", function(req, res) {
    const response = validateInput(req.body)
    if(!response.success) {
        res.json({
        msg: "Your inputs are valid"
        })
        return;
    }
})