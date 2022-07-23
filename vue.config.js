let path = require('path')
module.exports = {
  publicPath: './',
  // 代理
  devServer: {
    // port: 80,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // target: 'http://36.134.148.193:3000',
        changeOrigin: true,
        ws: true, // websoket 服务
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
  configureWebpack: (config) => {
    config.resolve = {
      extensions: ['.js', '.json', '.vue'],
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  }
}
