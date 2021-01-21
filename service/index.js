const Koa = require('koa')
const app = new Koa()
const { connect, initSchemas } = require('./database/init.js');
const mongoose = require('mongoose');
const Router = require('koa-router')
let user = require('./api/User.js')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

app.use(require('koa-static')(__dirname + '/public/dist'))

app.use(bodyParser());
app.use(cors());

let router = new Router();
app.use(router.routes())
app.use(router.allowedMethods());
router.use('/user',user.routes());

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