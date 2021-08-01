const express = require('express')
// const blogAdd = require('../server/models/blogadd')
const controller = require('../server/controller/blogController')
const blogAdd = require('../server/models/blogadd')
const upload = require("../server/middlewares/multer")

const router = express.Router()

router.get('/dataentry', controller.dataentry)

//**this is here to show ow to insert data from route page just a reference */
// router.post("/dataentry", async (req, res) => {
//     // res.send(req.body)

//     try {
//         const addData = new blogAdd(req.body)
//         console.log(addData);
//         const result = await addData.save()
//         if (result) {
//             return res.render('dataentry',{
//                 message:{
//                     type: 'success',
//                     body: 'Succesfull'
//                 }
//             })
//         } else {
//             return res.render('dataentry',{
//                 message:{
//                     type: 'error',
//                     body: 'Failed'
//                 }
//             })
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })

router.post('/dataentry',upload.array('images'),controller.addBlogC)

//**creating sigle blog route  */

router.get('/blog/:id', controller.detailsBlog)

// creating the routes for blog update and delete

router.get('/edit/:id',controller.editBlog)
router.post('/edit',controller.updateBlog)

router.get('/delete/:id',controller.deleteBlog)

module.exports = router