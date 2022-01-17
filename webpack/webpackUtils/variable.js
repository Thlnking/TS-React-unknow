const path = require('path');
const webpackUtils = require('./util');
const dotEnv = require('dotenv');


const {
    config: loadConfig
} = dotEnv;

const NODE_ENV = webpackUtils.getEnv();

const DIST_PATH = path.resolve(__dirname, '../../', 'dist');

const SRC_PATH = path.resolve(__dirname, '../../', 'src');

const PUBLIC_PATH = path.resolve(__dirname, '../../', 'public');

const ROOT_PATH = path.resolve(__dirname, '../../');

const IS_PRO = NODE_ENV === 'pro';

const IS_DEV = NODE_ENV === 'dev';


const version = webpackUtils.getVersion();

const getCDNPath = () => {
    return IS_PRO ? `${process.env.CDN_ROOT}/${version}/` : '/'
}

const ENV_CONFIG_PATH = path.resolve(ROOT_PATH, 'env', `${NODE_ENV}.env`);

loadConfig({
    path: ENV_CONFIG_PATH,
});



console.log('%c [ ::NODE_ENV ]-39', 'font-size:13px; background:pink; color:#bf2c9f;', NODE_ENV);

console.log('%c [ ::version ]-41', 'font-size:13px; background:pink; color:#bf2c9f;', version);




module.exports = {
    DIST_PATH,
    SRC_PATH,
    PUBLIC_PATH,
    ROOT_PATH,
    IS_PRO,
    IS_DEV,
    getCDNPath,
    ENV_CONFIG_PATH
}