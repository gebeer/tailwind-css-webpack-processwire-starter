const webpack = require('webpack');
require('dotenv').config({ path: './.env' });
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const mode = process.env.NODE_ENV || "development";
console.log(mode);

const config = {
  mode: mode,
  target: "web",
  entry: "./js/index.js",
  output: {
    path: path.resolve(__dirname, process.env.OUTPUT_PATH),
    publicPath: process.env.OUTPUT_PUBLICPATH,
    filename: mode == "development" ? "[name].js" : "[name].[contenthash:8].js",
    clean: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new WebpackManifestPlugin({
      fileName: "webpack.manifest.json",
      filter: (file) => file.isModuleAsset === false,
      // useLegacyEmit: true,
      writeToFileEmit: true, // needed for webpack-dev-server
    }),
    new MiniCssExtractPlugin({
      filename:
        mode == "development" ? "[name].css" : "[name].[contenthash:8].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./img/**/*",
          to: "./",
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: "babel-loader",
        // options: {
        //   presets: ["@babel/preset-env"],
        // },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  watchOptions: {
    ignored: path.resolve(__dirname, "../site/templates/assets/*.json"),
  },
  devServer: {
    host: process.env.DEV_HOST,
    port: parseInt(process.env.DEV_PORT),
    https: process.env.DEV_HTTPS == "true" ? true : false,
    hot: false,
    liveReload: true,
    open: true,
    proxy: {
      "*": {
        target: process.env.DEV_DOMAIN,
        changeOrigin: true,
      },
    },
    watchFiles: {
      paths: ["../site/templates/**/*.php", "../site/*.php"],
      options: {
        // ignored: ['node_modules'],
        // usePolling: true,
        // ignorePermissionErrors: true,
      },
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },
};

module.exports = () => {
  if (mode !== "production") {
    config.devtool = "inline-cheap-source-map";
  } else {
    config.optimization = {
      minimizer: [`...`, new CssMinimizerPlugin()],
    };
  }
  return config;
};
