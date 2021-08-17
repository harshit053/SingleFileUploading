const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose");

var url = process.env.DATABASEURL || "mongodb://localhost/SingleFileUpload";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

const File = require("./models/file");

app.get("/", (req, res) => {
    res.render("index");
})




app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Single File Uploader server started");
})