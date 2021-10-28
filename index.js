let express = require("express");
let app = express()
app.use(express.json())
let db = require("./db");
let cors = require("cors");

const arman_secret = "hello this is SDE arman nakhwa";

let PORT=process.env.PORT || 10;



app.use(cors())
//middleware for generate token
const jwt = require('jsonwebtoken');
function generateAccessToken(email) {
    return jwt.sign(email, arman_secret);
}

//middleware for checking if the user is valid or not #arman nakhwa
const authenticate = (req, res, next) => {
    try {
        const token = req.header("auth-token");
       // console.log(token)
        let data = jwt.verify(token, arman_secret);
        
        req.email = data.email;
        next();
    }
    catch (e) {
        res.json({ error: "invalid token" });
    }
}


app.get("/", (req, res) => {
    res.send("hello this is backend trawanders");
})


app.post("/register", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    db.query("insert into register (email, password) values(?,?)", [email, password], function (err, result) {
        if (err) {

            res.json({ error: email + " this email id is already exist" });
        }
        else {
            res.json({ msg: "user is register successfully" });


        }
    })
})

app.post("/login", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(email)
    if (email && password) {

        db.query("SELECT * FROM register WHERE email = ? AND password = ?", [email, password], function (err, result) {
            if (result.length > 0) {
                console.log(result)
                const token = generateAccessToken({ email });
                res.json({ authtoken: token });
            }
            else {
                res.json({ error: "Incorrect email and/or Password!" });
            }

        })
    }
    else {
        res.json({ error: "Please enter email and Password!" });

    }
})

app.post("/booking", authenticate, (req, res) => {
    let email = req.email;
    let {sfrom,dto,Customer_Name,Customer_Address,Customer_Mobile,cclass,Type,TypeName,Quantity,price,date } = req.body;
    db.query("insert into bookings (email,sfrom,dto,Customer_Name,Customer_Address,	Customer_Mobile,cclass,Type,TypeName,Quantity,price,date) values(?,?,?,?,?,?,?,?,?,?,?,?)", [email,sfrom,dto,Customer_Name,Customer_Address,Customer_Mobile,cclass,Type,TypeName,Quantity,price,date], function (err, result) {
        if (err) {
            console.log(err);
            res.json({ err: "error in booking try again" });
        }
        else {
            res.json({ msg: "booking successfully" });

        }
    })
})


app.post("/cancelbooking/:id", authenticate, (req, res) => {
    let email = req.email;
    let id = req.params.id;
    console.log(email)
    console.log(id)
    db.query("DELETE FROM bookings WHERE id = ? AND email=?", [id,email], function (err, result) {
        if (err) {
            res.json({ err: "error in booking cancellation try again"});
            console.log(err)
        }
        else {
            res.json({ msg: "booking cancel successfully" });

        }
    })
})


app.post("/printbooking/:id", authenticate, (req, res) => {
    let email = req.email;
    let id = req.params.id;
    console.log(email)
    console.log(id)
    db.query("SELECT * from bookings WHERE id = ? AND email=?", [id,email], function (err, result) {
        if (err) {
            res.json({ err: "error in booking printing try again"});
            console.log(err)
        }
        else {
            res.json(result);

        }
    })
})

app.post("/fetchbooking", authenticate, (req, res) => {
    let email = req.email;
    console.log(email)
    db.query("SELECT * FROM bookings WHERE email = ? order by id desc", [email], function (err, result) {
        if (result) {
            res.json(result);
        }
    })

})

app.listen(PORT, () => {
    console.log("server is running")
})