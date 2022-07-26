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

    // 引入 token 包
    let jwt = require('jsonwebtoken')
    // 用户信息
    let payload = { tel: userTel }
    // 口令
    let secret = 'jiuhu'
    // 生成 token
    let token = jwt.sign(payload, secret, {
      expiresIn: 3600 * 24
    })

    return `insert into user (tel,pwd,imgUrl,nickName,token,member,borderImg,hasBorder) values( '${userTel}' , '${userPwd}' ,"/images/headerImg/header.jpeg", '${userTel}' , '${token}' ,'0','/images/headerBorder/border1.png','0')`
  },
  // 查询密码
  insertWallet(uid) {
    return `insert into wallet (uid,total_money,Total_top_up,total_consumption,integral) values(${uid},'0','0','0','0')`
  }
}

exports = module.exports = User
