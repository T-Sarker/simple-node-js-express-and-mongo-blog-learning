const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: 'Please enter your Title',
        trim: true
    }, // String is shorthand for {type: String}
    author:{
        type:String,
        default: "tapos"
    },
    details:{
        type: String,
        required: 'Please enter your Details',
        trim: true
    },
    status: { 
        type: Boolean,
        default: true
    },
    comments: [{
        type: String,
    }],
    date: {
        type: Date,
        default: Date.now
    },

}, {
    timestamps: true
});

const blogAdd = mongoose.model('addBlogData',blogSchema)


module.exports = blogAdd
