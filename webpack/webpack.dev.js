const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.base");
const variable = require("./webpackUtils/variable");

const { DIST_PATH } = variable;

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const config = {
    mode: "development",
    cache: { type: "memory" }, //开发环境使用内存缓存
    devtool: "eval-cheap-module-source-map",
    stats: "errors-only",
    plugins: [new ReactRefreshWebpackPlugin()].filter(Boolean),
    watchOptions: {
        aggregateTimeout: 500,
        poll: 1000,
        ignored: /node_modules/,
    },
    devServer: {
        open: {
            target: ["index.html"],
        },
        compress: true,
        host: "127.0.0.1",
        hot: true,
        port: 9003,
        // client: {
        //     logging: "error",
        // },

        static: {
            directory: DIST_PATH,
        },
    },
};
const mergedConfig = webpackMerge.merge(baseConfig, config);

module.exports = mergedConfig;
