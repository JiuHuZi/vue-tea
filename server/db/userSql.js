// 验证数据库中的用户相关内容
const User = {
  // 查询用户手机号
  queryUserTel(option) {
    return 'select * from user where tel = ' + option.userTel + ''
  },
  // 查询密码
  queryUserPwd(option) {
    return 'select * from user where(tel = ' + option.userTel + ' ) and pwd = ' + option.userPwd + ''
  },
  // 新增用户
  insertData(option) {
    let userTel = option.userTel
    let userPwd = option.userPwd || '666666'
    return 'insert into user (tel,pwd,imgUrl,nickName,token) values(' + userTel + ',' + userPwd + ',"/images/header.jpeg","","")'
  }
}

exports = module.exports = User
