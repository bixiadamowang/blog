const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()

router.get('/', async(ctx) => {
    ctx.body = "这是blog首页"
})

router.post('/insert', async(ctx) => {
        //取得Model
        const Blog = mongoose.model('Blog')
            //把从前端接收的POST数据封装成一个新的Blog对象
        let newBlog = new Blog(ctx.request.body)
            //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
        await newBlog.save().then(() => {
            //成功返回code=200，并返回成功信息
            ctx.body = {
                code: 200,
                message: '新增成功'
            }
        }).catch(error => {
            //失败返回code=500，并返回错误信息
            ctx.body = {
                code: 500,
                message: error
            }
        })
    })
    /*博客列表查询 */
router
    .get('/list', async(ctx) => {
        //引入User的model
        const Blog = mongoose.model('Blog')
            //koa-bodyparser解析前端参数
        let reqParam = ctx.request.body; //
        let page = reqParam.pageNo
        let limit = reqParam.pageSize || 10
        let st = await Blog.find({}).skip((page - 1) * parseInt(limit)).limit(parseInt(limit))
        let totle = st.length; //表总记录数
        ctx.response.type = 'application/json';
        // //返回给前端
        ctx.body = { data: st, totle: totle };
    })

module.exports = router;