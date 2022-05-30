const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = require('dotenv').config()

if (env.error) {
  throw new Error(env.error.message)
}

const mainfilename = 'game.js'
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
    path: publicStaticPath,
    filename: mainfilename,
  }

  const rules = [
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    },
  ]

  const config = {
    entry: entryFilePath,
    mode: mode,
    stats: stats,
    devServer: devServer,
    output: output,
    module: {
      rules: rules,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      })
    ]
  }

  return config
}
