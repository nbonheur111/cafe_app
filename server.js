const express = require('express')
const path = require('path');
//logs the differenct requests to our server
const logger = require('morgan');
const cors = require('cors')//cross origin access management(are you allowed to request to the server)
require('dotenv').config();
require('./config/database');
const bcrypt = require('bcrypt') // hide password. cant' be undone
// MODELS //
const User = require('./models/user');
const category = require('./models/category')
const Item = require('./models/item')


//Passport//
const passport = require('passport')
const session = require('express-session')
const initializePassport = require('./config/passport-config.js')



const app = express()
app.use(cors({
    origin: "*"
}));

// logs the different requests to our server
app.use(logger('dev'))

//parse stringified objects(JSON objects)
app.use(express.json())
// server build folder
app.use(express.static(path.join(__dirname, 'build')));

app.get('/get_categories', async (req, res) => {
    let arrayofCategories = await category.find();
    console.log(arrayofCategories)
    res.json(arrayofCategories)
})

initializePassport(
    passport,
    async email => {
        let user = User.findOne({email: email})
        return user;
    },
    async id => {
        let user = User.findById(id)
        return user;
    },
)
app.use(session({
    secure: true,
    secret:process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        originalMaxAge: 360000 //how long a session is allowed in milliseconds
    }
}))





app.get('/get_categories', async (req, res) => {
    let arrayOfCategories = await Category.find();
    console.log(arrayOfCategories);
    res.json(arrayOfCategories)
})

app.get('/get_items', async (req, res) => {
    let arrayOfItems = await Item.find();
    console.log(arrayOfItems);
    res.json(arrayOfItems)
})

app.get('/session-info', (req, res) => {
    res.json({
        session: req.session
    })
})

app.get("/user", (req, res) => {
    res.send("user router!")
})

app.get('/test_route', (req, res) => {
    res.send("good route")

});

app.post('/users/signup', async(req, res) => {

    let hashedPassword = await bcrypt.hash(req.body.password, 10)
    console.log("hashed password is", hashedPassword)
    console.log(req.body);

    let userFromCollection = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: hashedPassword
    })
    console.log(userFromCollection)
    res.json("Good route")
})

app.put('/users/login', async (req, res, next) => {
    console.log(req.body)
    //passport authenticate
    //define which authentication method to use

    passport.authenticate("local", (err, user) =>{
        if(err) throw err;
        if(!user){
            res.json({
                message: "login failed",
                user: false

            })
        }else{
            req.logIn(user, err => {
                res.json({
                    message: "sucessfully authenticated",
                })
            })
        }

    }) (req, res, next)
})
//catch all route
//should be last router to avoid hit it before other routes
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(5000, () => {
    console.log(`Server is Listening on 5000...`)
})