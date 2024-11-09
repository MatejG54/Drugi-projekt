const express = require("express")
const cors = require("cors")
const {query} = require("./db")
const path = require("path")
require('dotenv').config();

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(express.static(path.join(__dirname, 'build')));

const corsOptions = {
    origin: 'https://frontend-5jus.onrender.com',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions))

app.get("/get", async (req, res) => {
    const getAll = `SELECT COUNT (*) from public.database;`;

    const result = await query(getAll, []);
    
    res.send(result);
    // console.log(process.env.DB_USER)

    // res.send({text: "hello its me"})
});

app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const isChecked = req.body.isChecked;
    // console.log(username)
    // console.log(password)

    if(isChecked === true) {
        const getUser = `SELECT * FROM public.database where username = '${username}' AND password = '${password}';`;
        const result = await query(getUser, []);
        res.send({res: result});

    } else {
        const getUser = `SELECT * FROM public.database WHERE username = $1 and password = $2;`
        const result = await query(getUser, [username, password]);

        res.send({res: result});
    }
});

app.post("/login2", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let wrongInput = 0;

    const getByUser = `SELECT * FROM public.database WHERE username = $1;`;
    const resUser = await query(getByUser, [username]);
    if(resUser.length === 0) {
        wrongInput = 1;
    }

    const getByPass = `SELECT * FROM public.database WHERE password = $1;`;
    const resPass = await query(getByPass, [password]);
    if(resPass.length === 0) {
        wrongInput = 2;
    }

    if(resUser.length === 0 && resPass.length === 0) {
        wrongInput = 3;
    }

    const getUser = `SELECT * FROM public.database WHERE username = $1 and password = $2;`
    const result = await query(getUser, [username, password]);

    res.send({res: result, input: wrongInput});
})

app.post("/recaptcha", async (req, res) => {
    const captchaValue = req.body.captchaValue;
    const username = req.body.username;
    const password = req.body.password;
    // console.log(captchaValue);

    const secretKey = process.env.SECRET_KEY;

    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaValue}`, {
        method: "POST",
    });

    const data = await response.json();
    // console.log(data)

    if (data.success === true) {
        const getUser = `SELECT * FROM public.database WHERE username = $1 and password = $2;`
        const result = await query(getUser, [username, password]);
        // console.log(result)

        res.send({text: 'CAPTCHA verified successfully!', res: result});
    } else {
        res.status(400).send({text: 'CAPTCHA verification failed.'});
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});