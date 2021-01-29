const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()
const multer = require('koa-multer')
const { join } = require('path')
const path = require('path');
const mime = require('mime-types')
const fs = require('fs');

const storage = multer.diskStorage({
  // 存储的位置
  destination: join(process.cwd(), "img"),
  // 文件名
  filename(req, file, cb) {
    const filename = file.originalname.split(".")
    cb(null, `${Date.now()}.${filename[filename.length - 1]}`)
  }
})

const upload = multer({ storage })
router.post('/upload', upload.single('file'), async ctx => {

  let file = null;
  file = fs.readFileSync(ctx.req.file.path); //读取文件

  let mimeType = mime.lookup(ctx.req.file.path); //读取图片文件类型
  ctx.set('content-type', mimeType); //设置返回类型
  //取得Model
  const Photo = mongoose.model('Photo')
  //把从前端接收的POST数据封装成一个新的user对象
  let photo = new Photo({file:file});
  await photo.save().then(() => {
    //成功返回code=200，并返回成功信息
    ctx.body = {
      filename: ctx.req.file.filename.split('.')[0],//返回文件名
      img: file,
    }
  }).catch(error => {
    //失败返回code=500，并返回错误信息
    ctx.body = {
      code: 500,
      message: error
    }
  })
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