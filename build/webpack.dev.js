const commonConfig = require('./webpack.common')
const merge = require('webpack-merge')
const path = require('path')

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', // 配置生成Source Maps，选择合适的选项
  devServer: {
    port: 3000,
    hot: true,
    compress: true,
    open: false,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '../dist')
  },
  plugins: [
    //定义全局变量
    // new webpack.DefinePlugin({
    //   //这里必须要解析成字符串进行判断，不然将会被识别为一个变量
    //   DEV: JSON.stringify("dev"),
    // }),
  ]
})
