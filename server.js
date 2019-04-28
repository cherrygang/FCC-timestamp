// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser')
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


//conver timestamp input to date
app.get("/api/timestamp/:date_string", function(req,res) {
  var inp = req.params.date_string
  if (inp==null) {console.log("request null")}
  //if nondigit set to integer
  if (/^\d+$/.test(inp)) {
    var inp = parseInt(inp)*1000
  }
  //date
  var date = new Date(inp)
  //setup json
  var unix = date.getTime()
  var UTC = date.toUTCString() 
  
  res.json({unix: unix, utc: UTC})
})

//if no input use current time
app.get("/api/timestamp/",function(req,res) {
  var date = new Date()
  res.json({unix: date.getTime(), utc: date.toUTCString()})
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

