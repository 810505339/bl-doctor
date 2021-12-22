'use strict'
const path = require('path')
function resolve(dir) {
    return path.resolve(__dirname, dir)
}
module.exports = {
    context: path.resolve(__dirname, './'),
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@static': resolve('static'),
            '@api': resolve('api')
        }
    }
}