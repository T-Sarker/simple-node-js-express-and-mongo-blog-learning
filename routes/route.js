const express = require('express')
// const blogAdd = require('../server/models/blogadd')
const controller = require('../server/controller/blogController')

const router = express.Router()

router.get('/dataentry', (req, res) => {
    res.render('dataentry', {
        message: null
    })
})
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

router.post('/dataentry',controller.addBlogC)

module.exports = router