const multer = require("multer");
const path = require("path");

// Set Storage 
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        const uploadPath = path.join(__dirname,"..","public","uploads");
        cb(null,uploadPath);
    },
    filename:function(req,file,cb){
        cb(
            null,
            file.fieldname + "-"+Date.now() + path.extname(file.originalname)
        )
    },
});

// upload 
const upload = multer({
    storage,
    limits:{fileSize:999999999999999},
    fileFilter(req,file,cb){
        checkFileTypes(file,cb)
    }
});

// check file types
function checkFileTypes(file,cb){
    // Video file extensions (you can add more if needed)
    const filetypes = /mp4|mkv|avi|mov|flv|wmv/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
        cb(null,true)
    }
    else{
        cb(new Error(`only video (${filetypes}) are allowed!`))
    }
}

module.exports = upload;