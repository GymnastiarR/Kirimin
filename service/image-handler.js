import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/image')
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.');

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext[ext.length - 1]);
    }
})
  
export const upload = multer({ storage: storage })