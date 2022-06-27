const ProxyFile = require('./bootstarp.js').ProxyFile
const proxy = require(ProxyFile)
const webpack = require('webpack');

module.exports = {
  chainWebpack: config => {
    config
      .plugin('ignore')
      .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')


  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: []
      }
    }
  },
  devServer: {
    proxy
  }
}