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
                }
            })
        } else {
            return res.render('dataentry', {
                message: {
                    type: 'error',
                    body: 'Failed'
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
        console.log("The id value is "+ id);
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