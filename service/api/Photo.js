const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()
const multer = require('koa-multer')
const { join } = require('path')

const storage = multer.diskStorage({
  // 存储的位置
  destination: join(process.cwd(), "/public/imgs"),
  // 文件名
  filename(req, file, cb) {
    const filename = file.originalname.split(".")
    cb(null, `${Date.now()}.${filename[filename.length - 1]}`)
  }
})

const upload = multer({ storage })
router.post('/upload', upload.single('file'), async ctx => {
  ctx.body = {
    filename: ctx.req.file.filename,//返回文件名
    img: 'http://' + ctx.request.header.host + '/imgs/' + ctx.req.file.filename,
  }
})

/*图片列表查询 */
router
  .get('/list', async (ctx) => {
    //引入User的model
    const Photo = mongoose.model('Photo')
    //koa-bodyparser解析前端参数
    let reqParam = ctx.request.body;//
    let page = Number(reqParam.pageNo);//当前第几页
    let size = Number(reqParam.pageSize);//每页显示的记录条数  
    //显示符合前端分页请求的列表查询
    let st = await Photo.find().limit(page).skip((page - 1) * size);
    let totle = st.length; //表总记录数
    ctx.response.type = 'application/json';
    //返回给前端
    ctx.body = { data: st, totle: totle };
  })
module.exports = router;