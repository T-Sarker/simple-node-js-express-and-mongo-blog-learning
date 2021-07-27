const blogAdd = require('../../server/models/blogadd')


exports.addBlogC = async (req, res) => {

    if (req.body.title=='' || req.body.details=='') {
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