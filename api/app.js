
const express = require('express');
const bodyParser = require('body-parser');
const args = require('args-parser')(process.argv);

//routers
const users = require('./routes/UserRouter');
const fuelquote = require('./routes/FuelQuoteRouter')
const login = require('./routes/LoginRouter')

// init app object
const app = express();

let port = 3080;

if (args.port) {
    port = args.port;
}

// body parser middleware
app.use(bodyParser.json());

//home routes
app.get("/", (req, res) => {
    res.send("HELLO").status(200);
})

// any other home routes here

// routers here
app.use('/login', login);
app.use('/fuelquote', fuelquote);
app.use('./users', users);


//start server
app.listen(port, () => {
    console.log(`starting server on port ${port}`)
});