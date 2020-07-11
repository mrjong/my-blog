const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const TsImportPluginFactory = require('ts-import-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const devMode = process.env.NODE_ENV === 'development'

module.exports = {
  entry: {
    app: './src/index.tsx'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true, //（可选）
          useCache: true,
          useBabel: false, // !important!
          getCustomTransformers: () => ({
            before: [
              TsImportPluginFactory({
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true
              })
            ]
          })
        }
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules|antd\.css/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                exportGlobals: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
                context: path.resolve(__dirname, 'src')
                // hashPrefix: "my-custom-hash",
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              // 如果没有options这个选项将会报错 No PostCSS Config found
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('autoprefixer')(), //CSS浏览器兼容
                require('cssnano')() //压缩css
              ]
            }
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                // If you are using less-loader@5 please spread the lessOptions to options directly
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.(css|less)$/,
        include: /node_modules|antd\.css/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              // 如果没有options这个选项将会报错 No PostCSS Config found
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('autoprefixer')(), //CSS浏览器兼容
                require('cssnano')() //压缩css
              ]
            }
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                // If you are using less-loader@5 please spread the lessOptions to options directly
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      // 把这个配置放在所有loader之前(从下往上,从右往左)
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../src')], // 指定检查的目录
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true, // 这个配置需要打开，才能在控制台输出warning信息
          emitError: true, // 这个配置需要打开，才能在控制台输出error信息
          fix: false // 是否自动修复，如果是，每次保存时会自动修复可以修复的部分
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: 'src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[chunk-id].[contenthash:8].css',
      ignoreOrder: false
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      service: path.resolve(__dirname, '../src/service'),
      utils: path.resolve(__dirname, '../src/utils')
    }
  }
  // externals: {
  //   react: "React",
  //   "react-dom": "ReactDOM",
  // },
}
