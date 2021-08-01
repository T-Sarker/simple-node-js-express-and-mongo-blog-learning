const blogAdd = require('../../server/models/blogadd')



exports.dataentry = async (req, res) => {
    try {
        const AllBlogs = await blogAdd.find()
        res.render('dataentry', {
            message: null,
            Blogs: {
                type: 'show',
                body: AllBlogs
            }
        })

    } catch (e) {

    }
}

exports.addBlogC = async (req, res) => {

    if (req.body.title == '' || req.body.details == '') {
        
        return res.render('dataentry', {
            message: {
                type: 'error',
                body: 'Fields must not be empty'
            },
            Blogs: null
        })
    }

    console.log(req.files);

    if (req.files.length > 0) {
        images = req.files.map((file) => {
          return file.filename
        });
      }

    // images = req.files.originalname
    console.log(images);
    try {
        const AllBlogs = await blogAdd.find()
        const addData = await blogAdd.create({
            title:req.body.title, // String is shorthand for {type: String}
            author:'tapos',
            images:images,
            details:req.body.details,
            comments: [],
            date: Date.now(),
        })

        return res.render('dataentry', {
                    message: {
                        type: 'success',
                        body: 'Succesfull'
                    },
                    Blogs: {
                        type: 'show',
                        body: AllBlogs
                    }
                })

        // const result = await addData.save()
        // if (result) {
        //     return res.render('dataentry', {
        //         message: {
        //             type: 'success',
        //             body: 'Succesfull'
        //         },
        //         Blogs: null
        //     })
        // } else {
        //     return res.render('dataentry', {
        //         message: {
        //             type: 'error',
        //             body: 'Failed'
        //         },
        //         Blogs: null
        //     })
        // }
    } catch (error) {
        console.log(error);
    }
}

exports.detailsBlog = async (req, res) => {

    try {
        const id = req.params.id
        console.log("The id value is " + id);
        const Ablogs = await blogAdd.findOne({
            _id: id
        })
        res.render('singleBlog', {
            message: null,
            Blog: {
                type: 'show',
                body: Ablogs
            }
        })

    } catch (e) {
        console.log(e);
    }

}
//**creating the urls for creating the edit and delete method */
exports.editBlog = async (req, res) => {
    const id = req.params.id
    try {
        const blog = await blogAdd.findById(id)
        return res.render('updateblog', {
            message: null,
            blog: blog
        })
    } catch (e) {
        return res.status(500).render('dataentry', {
            message: {
                type: 'error',
                body: 'Something went wrong!!'
            }
        })
    }

}


exports.updateBlog = async (req, res) => {

    const AllBlogs = await blogAdd.find()

    try {
        const id = req.body.id
        console.log(id);
        await blogAdd.findByIdAndUpdate(id, {
            $set: req.body
        }, {
            useFindAndModify: false
        }, () => {
            return res.redirect('/dataentry')
        })
    } catch (error) {
        return res.render('404', {
            message: null,
            Blogs:null
        })
    }
 
}

exports.deleteBlog = async (req, res) => {

    
    const id = req.params.id
    console.log(id);
    try {
        
        await blogAdd.findByIdAndDelete(id, () => {
            return res.redirect('/dataentry')
        })
    } catch (e) {
        return res.render('404', {
            message: null,
            Blogs: null
        })
    }
}