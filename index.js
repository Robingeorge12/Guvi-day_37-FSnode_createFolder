const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());
const path = require("path");


app.get("/",(req,res)=>{

    res.send({message:"welcome To Node FS please, which provides =>/create-file==>path for create your file, for Reading any file , query as this format ?fileName=20_1_2024_23hour_17min_42sec"})
})


const folderPath = "./textFiles";

if(!fs.existsSync(folderPath)){

    fs.mkdirSync(folderPath)

}


app.post("/create-file", (req, res) => {
  try {
    const date = new Date();
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    const time = `${date.getTime()}`.padStart(2, "0");
    let TimeStamp = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}_${date.getHours()}hour_${date.getMinutes()}min_${date.getSeconds()}sec`;
    let fileName = `file_${TimeStamp}.txt`
    let filePath = path.join(folderPath,fileName)
    // console.log(TimeStamp)
 
    fs.writeFileSync(filePath, `${TimeStamp}- this is the file of Reading  Blogs`, (er) => {
      if (er) {
        return res.send({ msg: er });
      } else {
        console.log(TimeStamp)
       return res.send({ msg: "file has been created"});
      }
    });
   
  } catch (er) {
    console.log(er);
  } 


});





app.get("/read-file", (req, res) => {

    try{

        let fileName = req.query.fileName
        let filePath = path.join(folderPath, `${fileName}.txt`);
        if(!fileName){
           return res.send({ msg: "Enter a File Name !" });
        }
// console.log(fileName)
fs.readFile(filePath, 'utf8' , function (err, data) {
    if (err) {
       return console.error(err);
    }
    console.log( {content:data});
    res.send({msg: data });
 });

// let data = fs.readFileSync(filePath, 'utf8');

//      res.send({ content: data });

    }catch(er){
        res.send({"msg":er})
    }
})



app.listen(4600, () => {
  console.log("port");
});
