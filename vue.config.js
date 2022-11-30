/*
 * @Author: maolele02
 * @Date: 2022-11-20 22:08:13
 * @LastEditTime: 2022-11-30 22:02:23
 * @LastEditors: maolele02
 * @Description: 
 * @FilePath: \beidou\vue.config.js
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false, // 关闭语法检查
  publicPath: './',
  outputDir: './dist',   // build输出目录
  indexPath: './templates/index.html',   // 打包后index的位置
  assetsDir: 'static/', // 静态资源目录（js, css, img）
  lintOnSave: false, // 是否开启eslint
  //devtools:true
})
