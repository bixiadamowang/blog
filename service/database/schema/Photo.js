const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型

//创建我们的用户Schema
const photoSchema = new Schema({
    photoId: ObjectId,
    title: String,
    file: String,
    createAt: { type: Date, default: Date.now() },
    lastLoginAt: { type: Date, default: Date.now() }

}, {
    collection: 'photo'
})

//发布模型
mongoose.model('Photo', photoSchema)