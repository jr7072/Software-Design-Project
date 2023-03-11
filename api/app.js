
const Express = require('express');
const bodyParser = require('body-parser');
const args = require('args-parser')(process.argv);

// init app object
const app = Express();

let port = 3000;

if (args.port) {
    port = args.port;
}

// body parser middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("HELLO").status(200);
})

//start server
app.listen(port, () => {
    console.log(`starting server on port ${port}`)
});