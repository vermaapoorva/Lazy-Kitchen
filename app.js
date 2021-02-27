const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/index");

const app = express();
app.set("views", __dirname+ "/views");

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({extended: true})) // parsing incoming requests with urlencoded based body-parser

// use router
app.use("/", apiRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));