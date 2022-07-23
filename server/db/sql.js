const mysql = require('mysql')
let connection = mysql.createConnection({
  host: 'localhost',
  // 本地
  user: 'root',
  password: '',
  // 服务器记得改

  database: 'vue_shop'
})

module.exports = connection
