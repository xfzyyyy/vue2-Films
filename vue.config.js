// 此文件是vue项目的配置文件覆盖,更改了要重启服务

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  lintOnSave: false // 暂时关闭代码格式检查

  // 配置反向代理
  // devServer: {
  //   proxy: {
  //     '/fql': {
  //       target: 'https://i.maoyan.com',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/fql': ''
  //       }
  //     }
  //   }
  // },
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       assets: '@/assets',
  //       views: '@/views'
  //     }
  //   }
  // }
}
