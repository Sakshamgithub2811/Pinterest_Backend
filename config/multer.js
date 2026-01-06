const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path  = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname,"../upload");
console.log(__dirname,"directory name");

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    
    destination :   function (req,file,cd){
        cd(null,uploadDir);
    },
    filename:function(req,file,cd){
        const unique = uuidv4();
        cd(null,unique + path.extname(file.originalname));
    }
});

const upload = multer({storage});

module.exports = upload;