const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()

router.get('/', async (ctx) => {
  ctx.body = "这是用户操作首页"
})

router.post('/register', async (ctx) => {
  //取得Model
  const User = mongoose.model('User')
  //把从前端接收的POST数据封装成一个新的user对象
  let newUser = new User(ctx.request.body)
  //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
  await newUser.save().then(() => {
    //成功返回code=200，并返回成功信息
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch(error => {
    //失败返回code=500，并返回错误信息
    ctx.body = {
      code: 500,
      message: error
    }
  })
})
/*登录的实践 */
router.post('/login', async (ctx) => {
  //得到前端传递过来的数据
  let loginUser = ctx.request.body
  let userName = loginUser.userName
  let password = loginUser.password
  //引入User的model
  const User = mongoose.model('User')
  //查找用户名是否存在，如果存在开始比对密码
  await User.findOne({ userName: userName }).exec().then(async (result) => {
    if (result) {
      //console.log(User)
      //当用户名存在时，开始比对密码
      let newUser = new User()  //因为是实例方法，所以要new出对象，才能调用
      await newUser.comparePassword(password, result.password)
        .then((isMatch) => {
          //返回比对结果
          ctx.body = { code: 200, message: isMatch }
        })
        .catch(error => {
          //出现异常，返回异常
          console.log(error)
          ctx.body = { code: 500, message: error }
        })
    } else {
      ctx.body = { code: 200, message: '用户名不存在' }
    }

  }).catch(error => {
    console.log(error)
    ctx.body = { code: 500, message: error }
  })
})

/*用户列表查询 */
router
  .get('/list', async (ctx) => {
    //引入User的model
    const User = mongoose.model('User')
    let totle = await User.count();//表总记录数
    //koa-bodyparser解析前端参数
    let reqParam = ctx.request.body;//
    let page = Number(reqParam.pageNo);//当前第几页
    let size = Number(reqParam.pageSize);//每页显示的记录条数
    //显示符合前端分页请求的列表查询
    let options = { "limit": size, "skip": (page - 1) * size };
    // let st = await User.find({});
    let st = await User.find({}, options);
    console.log(st)
    ctx.response.type = 'application/json';
    //返回给前端
    ctx.body = { data: st, totle: totle };
  })

module.exports = router;