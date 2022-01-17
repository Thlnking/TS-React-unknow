const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotenvPlugin = require('dotenv-webpack');
const path = require('path');

const variable = require('./variable');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const {
    SRC_PATH,
    PUBLIC_PATH,
    DIST_PATH,
    ENV_CONFIG_PATH,
    IS_DEV,
} = variable;


const getHTMLPlugins = () => {
    const indexHtmlPlugin = new HtmlWebpackPlugin({
        template: path.join(PUBLIC_PATH, 'index.html'),
        filename: 'index.html',
        inject: true, // true 插入body底部，head:插入head标签，false:不生成js文件
        hash: true,
        title: '',
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
        },
    });

    return [indexHtmlPlugin];
}


const getPlugins = () => {
    const cleanPlugin = new CleanWebpackPlugin({});

    const miniCssExtractPlugin = new MiniCssExtractPlugin({
        filename: IS_DEV ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
        chunkFilename: IS_DEV ? 'css/[name].chunk.css' : 'css/[name].[contenthash:8].chunk.css',
        ignoreOrder: true,
    });


    const dotenvPlugin = new DotenvPlugin({
        path: ENV_CONFIG_PATH,
    });

    return [
        ...getHTMLPlugins(),
        dotenvPlugin,
        miniCssExtractPlugin,
    ]
}


module.exports = {
    getPlugins
}