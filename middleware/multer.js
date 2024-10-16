import multer from 'multer'

const storage = multer.diskStorage({
    filename : function(req, file, cb){
        cb(null, file.filename)
    }
})
const upload = multer({storage})

export default upload