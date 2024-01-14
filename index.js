// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  const inputDate = req.params.date;
  let date;
  let unixDate;
  let utcDate;
  if(!inputDate){
    date = new Date();
    unixDate = date.getTime();
    utcDate = date.toUTCString().replace(/(\d{2}):(\d{2}):(\d{2})/, '00:00:00');
    res.json({ unix: unixDate, utc: unixDate});
  }
  // Check if the input is a valid Unix timestamp
  if (!isNaN(inputDate) && isFinite(inputDate)) {
    unixDate = parseInt(inputDate);
    date = new Date(unixDate);
  } else {
    // If not a valid Unix timestamp, parse the input as a date string
    date = new Date(inputDate);
    unixDate = date.getTime();
  }
  if (!isNaN(date)) {
    const formattedString = date.toUTCString().replace(/(\d{2}):(\d{2}):(\d{2})/, '00:00:00');
    res.json({ unix: unixDate, utc: formattedString });
  } else {
    res.json({ error: "Invalid Date" });
  }
});



// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port 3000');
});

