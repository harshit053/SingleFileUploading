const express    = require("express"),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      multer     = require("multer"),
      path       = require("path");


//Multer Configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads")
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });


const app = express();


var url = process.env.DATABASEURL || "mongodb://localhost/SingleFileUpload";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));


const File = require("./models/file");


app.get("/", (req, res) => {
    File.find({}, (err, files) => {
        if(err) {
            console.log(err)
        } else {
            res.render("index", {files: files});
        }
    });
});

app.post("/upload", upload.single("file"), (req, res, next) => {
    const file = req.file;

    if(!file) {
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return next(error);
    }

    //res.send(file);
    const fileName = file.originalname;
    const newFile = {name: fileName}
    File.create(newFile, (err, newfile) => {
        if(err) {
            console.log(err);
        } else {
            res.send(file);
        }
    });
});


app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Single File Uploader server started");
});