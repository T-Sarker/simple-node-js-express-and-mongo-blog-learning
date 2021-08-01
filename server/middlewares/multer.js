const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.')
        cb(null, ext[0] +'-' + Date.now()+'.'+ext[1])
    }
})

const upload = multer({
    storage: storage
})

module.exports = upload