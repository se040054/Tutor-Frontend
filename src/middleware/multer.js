const multer = require('multer')
const upload = multer({ dest: 'public/upload' })

// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })

module.exports = upload
