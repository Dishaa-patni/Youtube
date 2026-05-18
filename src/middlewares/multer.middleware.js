// What is multer ? -> It is an npm package that is used to handle file uploads in a node.js application.

// what was the issue without multer ? -> Normally Express understands: JSON , JSON  ,plain text , normal form fields but it does not understand file uploads.

// what multer does is -> reads multipart/form-data extracts uploaded file , creates usable req.file object

import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

  // this will return the local path
  
  export const upload = multer({ storage })