/*
 * @Author: maolele02
 * @Date: 2022-11-20 22:08:13
 * @LastEditTime: 2023-02-07 20:11:37
 * @LastEditors: maolele02
 * @Description: 
 * @FilePath: \beidou\vue.config.js
 */
const { defineConfig } = require('@vue/cli-service')

module.exports = {

  transpileDependencies: true,
  lintOnSave:false, // 关闭语法检查
  publicPath: './',
  outputDir: './dist',   // build输出目录
  indexPath: './templates/index.html',   // 打包后index的位置
  assetsDir: 'static/', // 静态资源目录（js, css, img）
  lintOnSave: false, // 是否开启eslint
  
  chainWebpack: config => {
    config.module
      .rule('swf')
      .test(/\.swf$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 10000
      })
  }
}
// module.exports = defineConfig({
//   transpileDependencies: true,
//   lintOnSave:false, // 关闭语法检查
//   publicPath: './',
//   outputDir: './dist',   // build输出目录
//   indexPath: './templates/index.html',   // 打包后index的位置
//   assetsDir: 'static/', // 静态资源目录（js, css, img）
//   lintOnSave: false, // 是否开启eslint
  //devtools:true
  // test: /\.swf$/,
  // use: 'url-loader',
  // loader: 'url-loader',
  //options: {limit: 10000 },
// })


  // chainWebpack:(config)=>{
  //   config.module.rule('swf')
  //   .test(/\.swf$/)
  //   .use('url-loader')
  //   .loader('url-loader')
  //   .options({ limit: 1000 })
  // }