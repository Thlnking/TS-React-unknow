const fs = require('fs');

const packageConfig = require('../../package.json');


const readFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');

    return content;
}

/**
 * 
 * 获取版本号
 * @expoorts
 * @returns
 */
const getVersion = () => {
    return packageConfig.version || '1.0.0';
}


/**
 * 
 * 获取测试版本
 * @exports
 * @returns
 */
const getTestVersion = () => {
    return packageConfig.testVersion || '1.0.0';
}


/**
 * 
 * 获取运行环境
 * @returns
 */
const getEnv = () => {
    return process.env.NODE_ENV || 'dev';
}

module.exports = {
    readFile,
    getVersion,
    getTestVersion,
    getEnv
}