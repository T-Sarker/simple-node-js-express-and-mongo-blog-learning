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

    const AllBlogs = await blogAdd.find()

    if (req.body.title == '' || req.body.details == '') {
        
        return res.render('dataentry', {
            message: {
                type: 'error',
                body: 'Fields must not be empty'
            },
            Blogs: {
                type: 'show',
                body: AllBlogs
            }
        })
    }

    try {
        const addData = new blogAdd(req.body)
        const result = await addData.save()
        if (result) {
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
        } else {
            return res.render('dataentry', {
                message: {
                    type: 'error',
                    body: 'Failed'
                },
                Blogs: {
                    type: 'show',
                    body: AllBlogs
                }
            })
        }
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

    const AllBlogs = await blogAdd.find()
    const id = req.params.id
    console.log(id);
    try {
        const AllBlogs = await blogAdd.find()
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