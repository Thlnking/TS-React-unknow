const path = require("path");
//变量配置工具类
const variable = require("./webpackUtils/variable");
//别名工具类
const resolveConfig = require("./webpackUtils/resolve");
//公用插件工具类
const plugins = require("./webpackUtils/plugins");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { SRC_PATH, DIST_PATH, IS_DEV, IS_PRO, getCDNPath } = variable;

const config = {

    // webpack 的 入口
    entry: {
        index: path.join(SRC_PATH, "index.tsx"),
    },

    // webpak 的输出配置项
    output: {
        // 路径
        path: DIST_PATH,
        // 输出文件的名字
        filename: IS_DEV
            ? "./js/[name].bundle.js"
            : "./js/[name].[contenthash:8].bundle.js",
        // 
        publicPath: getCDNPath(),
        // 挂载的全局对象
        globalObject: "this",
        // chunk的名字
        chunkFilename: IS_DEV
            ? "js/[name].chunk.js"
            : "js/[name].[contenthash:8].chunk.js",
        // 静态资源的文件名字
        assetModuleFilename: "assets/[hash][ext][query]",
        // clean: true,
    },
    //loader的执行顺序默认从右到左，多个loader用[],字符串只用一个loader，也可以是对象的格式
    module: {
        rules: [
            {
                test: /\.(tsx?|js)$/,
                include: [SRC_PATH],
                use: [
                    {
                        loader: "babel-loader", // 这是一个webpack优化点，使用缓存
                        options: {
                            cacheDirectory: true,
                        },
                    },
                ],
                exclude: [/node_modules/, /public/, /(.|_)min\.js$/],
            },
            {
                test: /\.css$|\.scss$/i,
                include: [SRC_PATH],
                exclude: /node_modules/,
                use: [
                    IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            sourceMap: !IS_PRO
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                    {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: path.resolve(SRC_PATH, 'assets', 'css', 'core.scss')
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[hash][ext][query]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[hash][ext][query]',
                },
            },
        ],
    },
    resolve: resolveConfig,
    plugins: plugins.getPlugins(),
};

module.exports = config;
