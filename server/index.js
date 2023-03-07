const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const auth = require("./routes/AuthRoutes");
const Users = require("./routes/UserRoutes.js");
const verifyToken = require("./midleware/AuthMidleware.js");
const cors = require("cors");
const app = express();

const dotenv = require("dotenv");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
dotenv.config();
const server = http.createServer(app);
const uri = process.env.DB_CONNECTION;
const port = process.env.PORT;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    server.listen(port, () => console.log("server is run in port 5000 "))
  )
  .catch(() => console.log("cannot find server connection"));

app.use("/auth", auth);
app.use("/users", verifyToken, Users);
