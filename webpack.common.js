// This is required to automatically add the html file to the bundle
const HtmlWebpackPlugin = require("html-webpack-plugin");
// This is required to keep output styles in css files not in a js file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// To create a base path for the project
const path = require("path");
const basePath = __dirname;

module.exports = {
  context: path.join(basePath, "src"),
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      router: path.resolve(__dirname, "./src/router/"),
      images: path.resolve(__dirname, "./src/assets/img"),
    },
  },
  entry: {
    // To define the files used in dev mode
    app: ["./index.tsx"],
    appStyles: ["./style.scss"],
  },
  output: {
    // To define the files we want to have after bundling
    filename: "./js/[name].[chunkhash].js",
  },
  module: {
    rules: [
      {
        // Loader for handling js files
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]__[hash:base64:5]",
                exportLocalsConvention: "camelCase",
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        //Loader for handling css files
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        // Loader for handling images
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        use: {
          loader: "url-loader",
          options: {
            limit: 5000,
            name: "./img/[hash].[name].[ext]",
            esModule: false,
          },
        },
      },
      {
        // Loader for processing output references images in the html
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html", //Name of file in ./dist/
      template: "index.html", //Name of template in ./src
      //   hash: true, //No necessary if we use chunkhash in the output file
    }),
    //Generate styles in css files in /dist
    new MiniCssExtractPlugin({
      filename: "./css/[name].[chunkhash].css",
      chunkFilename: "[id].css",
    }),
  ],
  //   To configure the default local server
  //   devServer: {
  //     port: 8081,
  //   },
};
