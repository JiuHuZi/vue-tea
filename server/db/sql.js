const mysql = require('mysql')
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vue_shop'
})

module.exports = connection
