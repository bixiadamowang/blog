const mongoose = require('mongoose') //引入Mongoose
const Schema = mongoose.Schema //声明Schema

//创建我们的用户Schema
const blogSchema = new Schema({
    title: String,
    time: String,
    content: String

}, {
    collection: 'blog'
})

//发布模型
mongoose.model('Blog', blogSchema)