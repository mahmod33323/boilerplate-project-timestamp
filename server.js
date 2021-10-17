// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();
const util = require("util");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.use((req, res, n) => {
  console.log(
    `${req.method} ${req.path} / ${req.ip}\n-----------\n${req}\n-----------`
  );
  n();
});
// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

app.get("/api", (req, res) => {
  res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() });
});
app.get("/api/:date", (req, res) => {
  let { date } = req.params;
  const r = /^\d+$/;
  if (r.test(date)) date = Number(date);
  const unixd = new Date(date).getTime();
  const utcd = new Date(date).toUTCString();
  unixd
    ? res.json({ unix: unixd, utc: utcd })
    : res.json({ error: "Invalid Date" });
});
