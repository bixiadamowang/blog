/**
 * 配置该文件可以参考:
 * https://cli.vuejs.org/zh/config/#%E7%9B%AE%E6%A0%87%E6%B5%8F%E8%A7%88%E5%99%A8
 *
 */
// const url = 'http://39.109.114.126:3000/mock/15'
const url = 'http://localhost:9998'

// 基础路径，发布前修改这里,当前配置打包出来的资源都是相对路径
let publicPath = '/'
module.exports = {
  configureWebpack: {
    externals: {
    }
  },
  publicPath: publicPath,
  // eslint校验
  lintOnSave: false,
  productionSourceMap: false,
  // 配置转发代理
  devServer: {
    proxy: {
      '': {
        target: url,
        ws: true,
        pathRewrite: {
          '^': ''
        }
      },
    }
  }
}
