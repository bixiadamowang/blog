const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()
const koaBody = require('koa-body')
const path = require('path');
const fs = require('fs');


router.post('/upload', async (ctx) => {
  const data = ctx.request.files.file;
  const savePath = path.join(`../files`, data.name)
  const reader = fs.createReadStream(data.path)
  const writer = fs.createWriteStream(savePath)
  console.log(reader + '------' + writer)

  const pro = new Promise((resolve, reject) => {
    var stream = reader.pipe(writer);

    stream.on('finish', function () {
      resolve(`http://localhost:9999/${data.name}`);
    });
  })

  ctx.response.body = await pro

})
module.exports = router;