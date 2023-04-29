const express = require('express');
const bodyParser = require('body-parser');
const args = require('args-parser')(process.argv);
const cors = require('cors');

//routers
const users = require('./routes/UserRouter');
const fuelquote = require('./routes/FuelQuoteRouter')
const fuelhistory = require('./routes/FuelHistoryRouter');
const login = require('./routes/LoginRouter');
const registration = require('./routes/RegistrationRouter');

// init app object
const app = express();

let port = 3080;

if (args.port) {
    port = args.port;
}

//cors middleware
app.use(cors())

// body parser middleware
app.use(bodyParser.json());

//home routes
app.get("/", (req, res) => {
    res.send("HELLO").status(200);
})

// any other home routes here

// routers here
app.use('/login', login);
app.use('/registration', registration);
app.use('/fuelquote', fuelquote);
app.use('/users', users);
app.use('/fuelhistory', fuelhistory);


//start server
app.listen(port, () => {
    console.log(`starting server on port ${port}`)
});