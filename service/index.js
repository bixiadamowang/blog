const Koa = require('koa')
const app = new Koa()
const { connect, initSchemas } = require('./database/init.js');
const Router = require('koa-router')
let user = require('./api/User.js')
let photo = require('./api/Photo.js')
const bodyParser = require('koa-body')
const cors = require('koa2-cors')

app.use(require('koa-static')(__dirname + '/public/dist'))

app.use(bodyParser({
  multipart: true, // 支持文件上传
  encoding: 'gzip',
  // formidable: {
  //   uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
  //   keepExtensions: true,    // 保持文件的后缀
  //   maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
  //   onFileBegin: (name, file) => { // 文件上传前的设置
  //     // console.log(`name: ${name}`);
  //     // console.log(file);
  //   },
  // }
}));
app.use(cors());

let router = new Router();
app.use(router.routes())
app.use(router.allowedMethods());
router.use('/user', user.routes());
router.use('/photo', photo.routes());

//立即执行函数
(async () => {
  await connect();
  initSchemas()
})();

app.use(async (ctx) => {
  ctx.body = '<h1>body</h1>'
})

app.listen(9998, () => {
  console.log('服务已启动!')
})