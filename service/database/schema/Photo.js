const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型

//创建我们的用户Schema
const photoSchema = new Schema({
    file: Object,

}, {
    collection: 'photo'
})

//发布模型
mongoose.model('Photo', photoSchema)