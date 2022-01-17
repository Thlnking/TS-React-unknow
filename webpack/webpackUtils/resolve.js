const path = require('path');
const varible = require('./variable');
const { SRC_PATH, ROOT_PATH } = varible;


module.exports = {
    extensions: ['.tsx', '.ts', '.js', 'json'],
    modules: [path.resolve(ROOT_PATH, 'node_modules')],
    // 查找package.json
    mainFields: ['main'],
    alias: {
        '@': SRC_PATH,
        '@images': path.resolve(SRC_PATH, 'assets/images')
    }
}