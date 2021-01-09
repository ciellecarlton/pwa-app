require ("dotenv").config();
const db = require("./config/");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const PORT = 3000;

const app = express();


db().then((connection) => {
  app.use(
    expressSession({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: { secure: true },
      store: new MongoStore({ mongooseConnection: connection }),
    })
  );
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}





app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/budget", {
  useNewUrlParser: true,
});

// routes
app.use(require("./routes/api.js"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App running on port ${PORT}!`);
});




