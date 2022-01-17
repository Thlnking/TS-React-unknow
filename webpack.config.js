
const path = require('path');


module.exports = {
    entry: {
        index: './lib/index.tsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist/lib'),
        library: 'MyReact', //我们的库的名字，如果不写别人是用不了我们的库的
        libraryTarget: 'umd' //我们的库的输出格式，默认写umd

    }
}