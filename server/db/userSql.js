// 验证数据库中的用户相关内容
const User = {
  // 查询用户手机号
  queryUserTel(option) {
    return 'select * from user where tel = ' + option.userTel + ''
  },
  queryUserPwd(option) {
    return 'select * from user where(tel = ' + option.userTel + ' ) and pwd = ' + option.userPwd + ''
  }
}

exports = module.exports = User
