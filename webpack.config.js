const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const env = require('dotenv').config()

if (env.error) {
  throw new Error(env.error.message)
}

const mainfilename = 'index.ts'
const publicStaticPath = path.join(__dirname, 'public')
const entryFilePath = path.join(__dirname, 'src', mainfilename)

module.exports = ({
  mode = 'production',
  stats = 'errors-only'
}) => {
  const devServer = {
    static: {
      directory: publicStaticPath,
    },
    compress: true,
    port: env.parsed.PORT,
  }

  const output = {
    publicPath: '/',
    path: publicStaticPath,
    filename: 'index.js',
    clean: true
  }

  const rules = [
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    },
    {
      test: /\.ts?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
  ]

  const extensions = ['.ts', '.js']

  const config = {
    entry: entryFilePath,
    mode: mode,
    stats: stats,
    devtool: 'inline-source-map',
    devServer: devServer,
    output: output,
    resolve: {
      extensions,
    },
    module: {
      rules: rules,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html'
      })
    ]
  }

  return config
}
