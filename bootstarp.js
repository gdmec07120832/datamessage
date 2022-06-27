const path = require('path');
const fs = require('fs')
const ProxyFile = path.resolve(__dirname, 'dev-proxy.js')

if (!fs.existsSync(ProxyFile)) {
  fs.writeFileSync(ProxyFile, `module.exports = {
  '/bi': {
    target: 'http://10.10.14.123:8190',
    changeOrigin: true
  }
}`)
}

module.exports = {
  ProxyFile
}
