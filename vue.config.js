const path = require('path')

function resolve(dir) {
    return path.resolve(__dirname, dir)
}

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@static': resolve('static'),
                '@api': resolve('api')
            }
        }
    }

}

