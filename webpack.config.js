const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

let mode = 'development'
if (process.env.NODE_ENV === 'production') {
  mode = 'production'
}
let sourceMap = 'inline-source-map'
if (process.env.NODE_ENV === 'production') {
  sourceMap = 'eval-source-map'
}

module.exports = {
  mode: mode,
  entry: path.resolve(__dirname, './src/index.ts'),
  devtool: sourceMap,
  resolve: {
    extensions: ['.ts','.js'],
  },
  devServer: {
    open: '/',
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new EslintPlugin({ extensions: 'ts' }),
    new CopyPlugin({
      patterns: [
        { from: "src/assets", to: "assets" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          (mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      //Options
                    }
                  ]
                ]
              }
            }
          },
          "sass-loader",
        ]
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      { test: /\.ts$/i, use: 'ts-loader' }
    ]
  },
}