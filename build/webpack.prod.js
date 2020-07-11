const commonConfig = require('./webpack.common')
const merge = require('webpack-merge')
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

let config = {
  mode: 'production',
  optimization: {
    minimizer: [
      // new UglifyJsPlugin({
      //   //启用文件缓存
      //   cache: true,
      //   //使用多线程并行运行提高构建速度
      //   parallel: true,
      //   //使用 SourceMaps 将错误信息的位置映射到模块
      //   sourceMap: true,
      // }),
    ]
    // splitChunks: {
    //   cacheGroups: {
    //     commons: {
    //       chunks: "all",
    //       minChunks: 4,
    //       name: "commons",
    //       enforce: true,
    //     },
    //   },
    // },
  },
  plugins: [
    //使用插件定义全局变量DEV
    //  new webpack.DefinePlugin({
    //      DEV:JSON.stringify('production')
    //  })
  ]
}

// 方便排查生产环境打包后文件的错误信息（文件source map）
if (process.env.npm_lifecycle_event == 'build:watch') {
  config.devtool = 'cheap-source-map'
}
// 图形化分析打包文件大小
if (process.env.npm_lifecycle_event === 'build:report') {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(commonConfig, config)
