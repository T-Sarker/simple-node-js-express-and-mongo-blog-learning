const express = require('express')
const db = require('./server/database/dbconfig')
const blog = require('./server/models/blogadd')

//**adding the router file  */

const router = require('./routes/route')

const app = express()




//**other dafinations for to work on express */

app.use(express.urlencoded({extended:true}))

app.use(express.static("public")) 

app.set('view engine','ejs')

///**creating a server for node js with a port 3000  */

app.listen(3000,()=>{
    console.log('server is running');
})

//**now calling the database function for connection */

db()

// routing 
app.use('/',router)

app.get('/',async (req,res)=>{
    const allBlog = await blog.find()
    res.render('index',{'blogs':allBlog})
})