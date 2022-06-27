# 数讯传送

以下是可用的代理配置：
```javascript
module.exports = {
  '/bi': {
    target: 'http://10.10.14.123:8000',
    changeOrigin: true,
    pathRewrite: {
      '^/bi': '/bi-mobile',
    },
  }
}
```