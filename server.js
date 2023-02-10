const express = require('express')
const path = require('path');
//logs the differenct requests to our server
const logger = require('morgan');
const cors = require('cors')//cross origin access management(are you allowed to request to the server)

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



app.get("/user", (req, res) => {
    res.send("user router!")
})

app.get('/test_route', (req, res) => {
    res.send("good route")

})
//should be last router to avoid hit it before other routes
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(5000, () => {
    console.log(`Server is Listening on 5000...`)
})