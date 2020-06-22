const TerserPlugin = require('terser-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlPlugin = require ('html-webpack-plugin')
const MODE = 'development'

module.exports = {
  mode: 'development',
  entry: `${__dirname}/src/main.ts`,
  output: {
    path: `${__dirname}/dist`,
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.vue$/,
        use: "vue-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ],
  optimization: {
    minimizer: MODE === 'production'
      ? []
      : [
        new TerserPlugin({
          extractComments: 'all',
          terserOptions: {
             compress: {drop_console: true}
          }
        })
      ]
  },
  devServer: {
    contentBase: `${__dirname}/dist`
  }
}