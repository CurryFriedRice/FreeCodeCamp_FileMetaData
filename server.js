require('dotenv').config()
var express     = require('express');
var cors        = require('cors');
var multer      = require('multer');
var upload      = multer();
var app         = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single('upfile'), function(req,res){
    console.log("==ANALYZING==");
    console.log(req.file);
    
    res.json({
      name : req.file.originalname, 
      type : req.file.mimetype, 
      size : req.file.size
    });
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});


//a function that will take all files and then extract the data
/*
function getFileMetaData(fileList)
{
  for(const file of fileList)
  {
      const name = file.name ? file.name : "NOT SUPPORTED";
      const type = file.type ? file.type : "NOT SUPPORTED";
      const size = file.size ? file.size : "NOT SUPPORTED";
      console.log("File Data | " + name + " | " + type + " | " + size);
  }
}
*/