const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg|png)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name (file) {
                /*if (env === 'development') {
                  return '[path][name].[ext]'
              }*/
                return '[name].[ext]'
              },
              publicPath: '/assets/',
              outputPath: '/public/assets/'
            },
          },
        ],
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx", ".css", ".png"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};