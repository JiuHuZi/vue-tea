// 导入公共函数文件
var common = require('./common.js')

var express = require('express')
var router = express.Router()
var connection = require('../db/sql.js')
var user = require('../db/userSql.js')
var QcloudSms = require('qcloudsms_js')
var path = require('path')
var fs = require('fs')

// 引入 token 包
var jwt = require('jsonwebtoken')

// 引入支付宝配置文件
const alipaySdk = require('../db/alipay.js')
const AlipayFormData = require('alipay-sdk/lib/form').default

// 引入axios
const axios = require('axios')

const multer = require('multer')
const upload = multer({
  dest: path.join(process.cwd(), '../public/images/headerImg')
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

// 修改已过期的优惠券
router.post('/api/changeCoupon', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  // 拿到现在的时间戳
  let today = new Date().getTime()

  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id

    connection.query(`select * from tb_coupon where uid = ${uid}`, function (err, result) {
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          // console.log(result[i].endAt > today)
          if (result[i].endAt < today) {
            connection.query(`update tb_coupon set isUse = '2' where id = ${result[i].id}`)
          }
          if (i + 1 == result.length) {
            res.send({
              data: {
                code: 200,
                success: true
              }
            })
          }
        }
      } else {
        res.send({
          data: {
            code: 0,
            success: false
          }
        })
      }
    })
  })
})

// 查询用户的优惠券
router.post('/api/selectCoupon', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)

  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id
    connection.query(`select * from tb_coupon where uid = ${uid}`, function (err, result) {
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          connection.query(`select * from coupon_list where id = ${result[i].coupon_id}`, function (e, r) {
            result[i].name = r[0].name
            result[i].value = r[0].value
            result[i].condition = r[0].condition
            result[i].unitDesc = r[0].unitDesc
            result[i].maxDiscount = r[0].maxDiscount

            // console.log(result)
            if (i + 1 >= result.length) {
              res.send({
                data: {
                  data: result,
                  success: true,
                  code: 200
                }
              })
            }
          })
        }
      } else {
        res.send({
          data: {
            success: false,
            code: 0,
            msg: '无优惠券'
          }
        })
      }
    })
  })
})

// 优惠券
router.post('/api/coupon', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  // 获取现在的时间戳
  let today = new Date().getTime()
  let endAt = today + 1000 * 60 * 60 * 24

  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id
    connection.query(`insert into tb_coupon(uid,coupon_id,startAt,endAt,isUse) values(${uid},3,'${today}','${endAt}','0')`, function (err, result) {
      res.send({
        data: {
          a: 1
        }
      })
    })
  })
})

// 给订单添加收货信息
router.post('/api/orderUserInfo', function (req, res, next) {
  let { path, order_id } = req.body
  let address = path.city + path.county + path.addressDetail

  connection.query(`UPDATE store_order SET recipient = '${path.name}' , phone = '${path.tel}' , address = '${address}' WHERE order_id = '${order_id}'`, function () {
    res.send({
      data: {
        code: 200,
        success: true,
        msg: '修改成功'
      }
    })
  })
})

// 更改订单状态
router.post('/api/changeOrderStatus', function (req, res, next) {
  let { id, status } = req.body
  // console.log(`update store_order set order_status = '${status}' where order_id = '${id}'`)
  connection.query(`update store_order set order_status = '${status}' where order_id = '${id}'`, function () {
    res.send({
      data: {
        success: true,
        code: 200,
        msg: '修改成功'
      }
    })
  })
})

// 查看订单卡片商品信息
router.post('/api/selectGoods', function (req, res, next) {
  let list = req.body.list
  let product = []
  for (let i = 0; i < list.length; i++) {
    let goods = []
    let { goods_name, goods_num } = list[i]
    console.log(goods_name, goods_num)
    let numList = goods_num.split(',')
    let nameList = goods_name.split(',')
    for (let j = 0; j < nameList.length; j++) {
      connection.query(`select * from goods_list where name = '${nameList[j]}'`, function (err, result) {
        // console.log(`select * from goods_list where name = '${nameList[j]}'`)
        goods.push({
          name: nameList[j],
          num: numList[j],
          price: result[0].price,
          imgUrl: result[0].imgUrl,
          totalPrice: list[i].goods_price,
          order_id: list[i].order_id,
          mode: list[i].mode,
          order_status: list[i].order_status
        })

        if (j + 1 == nameList.length && i + 1 == list.length) {
          res.send({
            data: {
              code: 200,
              success: true,
              data: product
            }
          })
        }
      })
    }
    product.push(goods)
  }
})

// 查看各状态订单列表
router.post('/api/selectOrderStatus', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  // 订单状态
  // 1 => 未支付    3 => 待发货    4 => 待收货     5 => 待评价
  let type = req.body.type || ''
  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id
    // console.log(`select * from store_order where order_status like '%${type}%' and uid = ${uid} and mode = ('电子货币' OR '积分')`)
    connection.query(`select * from store_order where order_status like '%${type}%' and order_status != 2  and uid = ${uid} and (MODE = '电子货币' OR MODE = '积分')`, function (err, result) {
      if (result.length > 0) {
        res.send({
          data: {
            success: true,
            code: 200,
            data: result
          }
        })
      } else {
        res.send({
          data: {
            code: 0,
            success: false
          }
        })
      }
    })
  })
})

// 查看vip状态
router.post('/api/selectVipStatus', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id
    connection.query(`select * from vip_list where uid = ${uid}`, function (err, result) {
      if (result.length > 0) {
        res.send({
          data: {
            code: 200,
            success: true,
            data: result[0]
          }
        })
      } else {
        res.send({
          data: {
            code: 0,
            success: false,
            msg: '没有购买过vip'
          }
        })
      }
    })
  })
})

// 支付状态
router.post('/api/successVip', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  // 订单号
  let out_trade_no = req.body.out_trade_no
  let trade_no = req.body.trade_no
  // console.log(out_trade_no, trade_no)

  //支付宝配置
  const formData = new AlipayFormData()
  // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  formData.setMethod('get')
  // 支付时的信息
  formData.addField('bizContent', {
    out_trade_no,
    trade_no
  })
  // 返回promise
  const result = alipaySdk.exec('alipay.trade.query', {}, { formData: formData })
  // 后端请求支付宝
  result.then((resData) => {
    axios({
      method: 'GET',
      url: resData
    })
      .then((data) => {
        // console.log(data)
        let responseCode = data.data.alipay_trade_query_response
        if (responseCode.code == '10000') {
          switch (responseCode.trade_status) {
            case 'WAIT_BUYER_PAY':
              res.send({
                data: {
                  code: 0,
                  msg: '支付宝有交易,没付款'
                }
              })
              break

            case 'TRADE_CLOSED':
              res.send({
                data: {
                  code: 1,
                  msg: '交易关闭'
                }
              })
              break

            case 'TRADE_FINISHED':
              // 查询用户
              connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
                // 用户id
                let uid = results[0].id
                let borderList = results[0].hasBorder.split(',')

                // 充值会员获得的优惠券
                let coupenList = [
                  { couponId: 4, name: '会员无门槛8折优惠券', imgUrl: '/images/coupon.png', num: 1, type: '优惠券', weight: '1' },
                  { couponId: 5, name: '会员无门槛10元优惠券', imgUrl: '/images/coupon.png', num: 1, type: '优惠券', weight: '1' },
                  { couponId: 6, name: '会员50元优惠券', imgUrl: '/images/coupon.png', num: 1, type: '优惠券', weight: '1' },
                  { couponId: 7, name: '会员10元优惠券', imgUrl: '/images/coupon.png', num: 1, type: '优惠券', weight: '1' }
                ]

                connection.query(`select * from store_order where order_id = ${out_trade_no}`, function (err, result) {
                  // 充值月份
                  let month = 0
                  if (result[0].goods_name == '月度大会员') {
                    if (borderList.indexOf('22') == -1) {
                      connection.query(`select * from border_list where id = 22`, function (e, border) {
                        let borderMsg = border[0]
                        borderMsg.type = '头像框'
                        borderMsg.weight = '1'
                        connection.query(
                          `insert into mail(sender,receiver,title,content,enclosure,enclosureStatus,sendTime,mailStatus) values('【九狐子商城】运营团队',${uid},'【奖励】会员等级奖励','亲爱的旅行者：请查收通过购买大会员增值服务获得的奖励','${JSON.stringify(coupenList)}',0,'${common.getTime()}',0)`
                        )
                      })
                    }
                    month = 1
                  } else if (result[0].goods_name == '季度大会员') {
                    if (borderList.indexOf('23') == -1) {
                      connection.query(`select * from border_list where id = 23`, function (e, border) {
                        console.log(border)
                        let borderMsg = border[0]
                        borderMsg.type = '头像框'
                        borderMsg.weight = '1'
                        connection.query(
                          `insert into mail(sender,receiver,title,content,enclosure,enclosureStatus,sendTime,mailStatus) values('【九狐子商城】运营团队',${uid},'【奖励】会员等级奖励','亲爱的旅行者：请查收通过购买大会员增值服务获得的奖励','${JSON.stringify(borderMsg)}',0,'${common.getTime()}',0)`
                        )
                      })
                    }
                    month = 3
                    // 季度会员拥有三张优惠券
                    for (let i = 0; i < coupenList.length; i++) {
                      coupenList[i].num = 3
                    }
                  } else if (result[0].goods_name == '年度大会员') {
                    if (borderList.indexOf('24') == -1) {
                      connection.query(`select * from border_list where id = 24`, function (e, border) {
                        let borderMsg = border[0]
                        borderMsg.type = '头像框'
                        borderMsg.weight = '1'
                        connection.query(
                          `insert into mail(sender,receiver,title,content,enclosure,enclosureStatus,sendTime,mailStatus) values('【九狐子商城】运营团队',${uid},'【奖励】会员等级奖励','亲爱的旅行者：请查收通过购买大会员增值服务获得的奖励','${JSON.stringify(borderMsg)}',0,'${common.getTime()}',0)`
                        )
                      })
                    }
                    month = 12

                    // 季度会员拥有十二张优惠券
                    for (let i = 0; i < coupenList.length; i++) {
                      coupenList[i].num = 12
                    }
                  }

                  // 每次购买会员获取优惠券
                  connection.query(
                    `insert into mail(sender,receiver,title,content,enclosure,enclosureStatus,sendTime,mailStatus) values('【九狐子商城】运营团队',${uid},'【奖励】会员等级奖励','亲爱的旅行者：请查收通过购买大会员增值服务获得的奖励','${JSON.stringify(coupenList)}',0,'${common.getTime()}',0)`
                  )

                  connection.query(`select * from vip_list where uid = ${uid}`, function (e, r) {
                    if (r.length == 0) {
                      connection.query(`insert into vip_list(uid,overtime) value(${uid},'${common.getDate(month)}')`, function () {
                        connection.query(`select * from vip_list where uid = ${uid}`, function (e, date) {
                          let day = common.days(common.getTime(), date[0].overtime)
                          console.log(day)
                          // 会员等级
                          let vipStatus = 0
                          if (day >= 36500) {
                            vipStatus = 4
                          } else if (day >= 365 && day < 36500) {
                            vipStatus = 3
                          } else if (day >= 90 && day < 365) {
                            vipStatus = 2
                          } else if (day > 0 && day < 90) {
                            vipStatus = 1
                          } else if (day <= 0) {
                            vipStatus = 0
                          }
                          connection.query(`update user set member = '${vipStatus}' where id = ${uid}`)
                        })
                      })
                    } else {
                      let overtime = r[0].overtime
                      if (common.getTime() > overtime) {
                        connection.query(`update vip_list set overtime = '${common.getDate(month)}' where uid = ${uid}`, function () {
                          connection.query(`select * from vip_list where uid = ${uid}`, function (e, date) {
                            let day = common.days(common.getTime(), date[0].overtime)
                            console.log(day)
                            // 会员等级
                            let vipStatus = 0
                            if (day >= 36500) {
                              vipStatus = 4
                            } else if (day >= 365 && day < 36500) {
                              vipStatus = 3
                            } else if (day >= 90 && day < 365) {
                              vipStatus = 2
                            } else if (day > 0 && day < 90) {
                              vipStatus = 1
                            } else if (day <= 0) {
                              vipStatus = 0
                            }
                            connection.query(`update user set member = '${vipStatus}' where id = ${uid}`)
                          })
                        })
                      } else {
                        connection.query(`update vip_list set overtime = '${common.getDate(month, overtime)}' where uid = ${uid}`, function () {
                          connection.query(`select * from vip_list where uid = ${uid}`, function (e, date) {
                            let day = common.days(common.getTime(), date[0].overtime)
                            console.log(day)
                            // 会员等级
                            let vipStatus = 0
                            if (day >= 36500) {
                              vipStatus = 4
                            } else if (day >= 365 && day < 36500) {
                              vipStatus = 3
                            } else if (day >= 90 && day < 365) {
                              vipStatus = 2
                            } else if (day > 0 && day < 90) {
                              vipStatus = 1
                            } else if (day <= 0) {
                              vipStatus = 0
                            }
                            connection.query(`update user set member = '${vipStatus}' where id = ${uid}`)
                          })
                        })
                      }
                    }

                    connection.query(`update store_order set order_status = replace(order_status,2,3) where order_id = ${out_trade_no}`, function () {
                      res.send({
                        data: {
                          code: 2,
                          msg: '交易完成'
                        }
                      })
                    })
                  })
                })
              })
              break

            case 'TRADE_SUCCESS':
              // 查询用户
              connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
                // 用户id
                let uid = results[0].id
                let borderList = results[0].hasBorder.split(',')

                // 充值会员获得的优惠券
                let coupenList = [
                  { couponId: 4, name: '会员无门槛8折优惠券', imgUrl: '/images/coupon.png', num: 1, type: '优惠券', weight: '1' },
                  { couponId: 5, name: '会员无门槛10元优惠券', imgUrl: '/images/coupon.png', num: 1, type: '优惠券', weight: '1' },
                  { couponId: 6, name: '会员50元优惠券', imgUrl: '/images/coupon.png', num: 1, type: '优惠券', weight: '1' },
                  { couponId: 7, name: '会员10元优惠券', imgUrl: '/images/coupon.png', num: 1, type: '优惠券', weight: '1' }
                ]

                // console.log(borderList)
                connection.query(`select * from store_order where order_id = ${out_trade_no}`, function (err, result) {
                  // 充值月份
                  let month = 0
                  if (result[0].goods_name == '月度大会员') {
                    if (borderList.indexOf('22') == -1) {
                      connection.query(`select * from border_list where id = 22`, function (e, border) {
                        let borderMsg = border[0]
                        borderMsg.type = '头像框'
                        borderMsg.weight = '1'
                        connection.query(
                          `insert into mail(sender,receiver,title,content,enclosure,enclosureStatus,sendTime,mailStatus) values('【九狐子商城】运营团队',${uid},'【奖励】会员等级奖励','亲爱的旅行者：请查收通过购买大会员获得的奖励','${JSON.stringify(borderMsg)}',0,'${common.getTime()}',0)`
                        )
                      })
                    }
                    month = 1
                  } else if (result[0].goods_name == '季度大会员') {
                    if (borderList.indexOf('23') == -1) {
                      connection.query(`select * from border_list where id = 23`, function (e, border) {
                        let borderMsg = border[0]
                        borderMsg.type = '头像框'
                        borderMsg.weight = '1'
                        connection.query(
                          `insert into mail(sender,receiver,title,content,enclosure,enclosureStatus,sendTime,mailStatus) values('【九狐子商城】运营团队',${uid},'【奖励】会员等级奖励','亲爱的旅行者：请查收通过购买大会员获得的奖励','${JSON.stringify(borderMsg)}',0,'${common.getTime()}',0)`
                        )
                      })
                    }
                    month = 3
                    // 季度会员拥有三张优惠券
                    for (let i = 0; i < coupenList.length; i++) {
                      coupenList[i].num = 3
                    }
                  } else if (result[0].goods_name == '年度大会员') {
                    if (borderList.indexOf('24') == -1) {
                      connection.query(`select * from border_list where id = 24`, function (e, border) {
                        let borderMsg = border[0]
                        borderMsg.type = '头像框'
                        borderMsg.weight = '1'
                        connection.query(
                          `insert into mail(sender,receiver,title,content,enclosure,enclosureStatus,sendTime,mailStatus) values('【九狐子商城】运营团队',${uid},'【奖励】会员等级奖励','亲爱的旅行者：请查收通过购买大会员获得的奖励','${JSON.stringify(borderMsg)}',0,'${common.getTime()}',0)`
                        )
                      })
                    }
                    month = 12

                    // 季度会员拥有十二张优惠券
                    for (let i = 0; i < coupenList.length; i++) {
                      coupenList[i].num = 12
                    }
                  }
                  // 每次购买会员获取优惠券
                  connection.query(
                    `insert into mail(sender,receiver,title,content,enclosure,enclosureStatus,sendTime,mailStatus) values('【九狐子商城】运营团队',${uid},'【奖励】会员等级奖励','亲爱的旅行者：请查收通过购买大会员增值服务获得的奖励','${JSON.stringify(coupenList)}',0,'${common.getTime()}',0)`
                  )

                  connection.query(`select * from vip_list where uid = ${uid}`, function (e, r) {
                    if (r.length == 0) {
                      connection.query(`insert into vip_list(uid,overtime) value(${uid},'${common.getDate(month)}')`, function () {
                        connection.query(`select * from vip_list where uid = ${uid}`, function (e, date) {
                          let day = common.days(common.getTime(), date[0].overtime)
                          console.log(day)
                          // 会员等级
                          let vipStatus = 0
                          if (day >= 36500) {
                            vipStatus = 4
                          } else if (day >= 365 && day < 36500) {
                            vipStatus = 3
                          } else if (day >= 90 && day < 365) {
                            vipStatus = 2
                          } else if (day > 0 && day < 90) {
                            vipStatus = 1
                          } else if (day <= 0) {
                            vipStatus = 0
                          }
                          connection.query(`update user set member = '${vipStatus}' where id = ${uid}`)
                        })
                      })
                    } else {
                      let overtime = r[0].overtime
                      if (common.getTime() > overtime) {
                        connection.query(`update vip_list set overtime = '${common.getDate(month)}' where uid = ${uid}`, function () {
                          connection.query(`select * from vip_list where uid = ${uid}`, function (e, date) {
                            let day = common.days(common.getTime(), date[0].overtime)
                            console.log(day)
                            // 会员等级
                            let vipStatus = 0
                            if (day >= 36500) {
                              vipStatus = 4
                            } else if (day >= 365 && day < 36500) {
                              vipStatus = 3
                            } else if (day >= 90 && day < 365) {
                              vipStatus = 2
                            } else if (day > 0 && day < 90) {
                              vipStatus = 1
                            } else if (day <= 0) {
                              vipStatus = 0
                            }
                            connection.query(`update user set member = '${vipStatus}' where id = ${uid}`)
                          })
                        })
                      } else {
                        connection.query(`update vip_list set overtime = '${common.getDate(month, overtime)}' where uid = ${uid}`, function () {
                          connection.query(`select * from vip_list where uid = ${uid}`, function (e, date) {
                            let day = common.days(common.getTime(), date[0].overtime)
                            console.log(day)
                            // 会员等级
                            let vipStatus = 0
                            if (day >= 36500) {
                              vipStatus = 4
                            } else if (day >= 365 && day < 36500) {
                              vipStatus = 3
                            } else if (day >= 90 && day < 365) {
                              vipStatus = 2
                            } else if (day > 0 && day < 90) {
                              vipStatus = 1
                            } else if (day <= 0) {
                              vipStatus = 0
                            }
                            connection.query(`update user set member = '${vipStatus}' where id = ${uid}`)
                          })
                        })
                      }
                    }

                    connection.query(`update store_order set order_status = replace(order_status,2,3) where order_id = ${out_trade_no}`, function () {
                      res.send({
                        data: {
                          code: 2,
                          msg: '交易完成'
                        }
                      })
                    })
                  })
                })
              })
              break
          }
        } else if (responseCode.code == '40004') {
          res.send({
            data: {
              code: 4,
              msg: '交易不存在'
            }
          })
        }
      })
      .catch((err) => {
        res.send({
          data: {
            code: 500,
            msg: '交易失败',
            err
          }
        })
      })
  })
})

// 发起支付
router.post('/api/buyvip', function (req, res, next) {
  // 订单号
  let orderId = req.body.orderId
  // 商品总价
  let price = req.body.price
  // 购买商品的名称
  let name = req.body.name

  // 开始对接支付宝API
  const formData = new AlipayFormData()
  // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  formData.setMethod('get')
  // 支付时的信息
  formData.addField('bizContent', {
    outTradeNo: orderId, //订单号
    productCode: 'FAST_INSTANT_TRADE_PAY', //写死的
    totalAmount: price, //价格
    subject: name //商品名称
  })
  // 支付成功或者失败跳转的链接
  // formData.addField('returnUrl', 'http://localhost:8080/topUp')
  formData.addField('returnUrl', 'http://localhost/vipstatus')
  // 返回promise
  const result = alipaySdk.exec('alipay.trade.page.pay', {}, { formData: formData })
  // 对接支付宝成功,支付宝方返回的数据
  result.then((resp) => {
    res.send({
      data: {
        code: 200,
        success: true,
        msg: '支付中',
        paymentUrl: resp
      }
    })
  })
})

// 购买VIP订单
router.post('/api/addOrdervip', function (req, res, next) {
  let current = req.body.current
  let goodsName = ''
  let goodsPrice = 0
  if (current == 0) {
    goodsName = '年度大会员'
    goodsPrice = 216
  } else if (current == 1) {
    goodsName = '季度大会员'
    goodsPrice = 60
  } else if (current == 2) {
    goodsName = '月度大会员'
    goodsPrice = 25
  }
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  // 订单号
  let orderId = common.randomNumber()

  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id
    connection.query(`insert into store_order (order_id,goods_name,goods_price,goods_num,order_status,uid,mode,time) values('${orderId}', '${goodsName}','${goodsPrice}',1,'2',${uid},'会员','${common.getTime()}')`, function () {
      connection.query(`select * from store_order where uid = ${uid} and order_id = '${orderId}'`, function (err, result) {
        res.send({
          data: {
            code: 200,
            data: result[0],
            success: true
          }
        })
      })
    })
  })
})
// 查询是否有未读的邮件
router.post('/api/selectUnreadMail', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)

  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id
    connection.query(`select count(*) as count from mail where receiver = ${uid} and mailStatus = 0`, function (err, result) {
      res.send({
        data: {
          code: 200,
          success: true,
          data: result[0]
        }
      })
    })
  })
})

// 邮件领取功能
router.post('/api/getEnclosure', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  // 获取邮件的附件
  let enclosure = req.body.enclosure
  // 获取邮件的ID
  let id = req.body.id

  console.log(enclosure)

  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id
    // 判断用户是否已经领取
    connection.query(`select * from mail where id = ${id}`, function (e, status) {
      if (status[0].enclosureStatus == '1') {
        res.send({
          data: {
            code: 0,
            success: false,
            msg: '已领取'
          }
        })
      } else {
        for (let i = 0; i < enclosure.length; i++) {
          if (enclosure[i].type == '头像框') {
            connection.query(`select * from user where id = ${uid}`, function (err, result) {
              let hasBorder = result[0].hasBorder + ',' + enclosure[i].id
              connection.query(`update user set hasBorder = '${hasBorder}' where id = ${uid}`)
            })
          } else if (enclosure[i].type == '积分') {
            let num = enclosure[i].name.replace('积分', '')
            connection.query(`select * from wallet where uid = ${uid}`, function (err, result) {
              let integral = parseFloat(result[0].integral) + parseFloat(num)
              connection.query(`update wallet set integral = '${integral}' where uid = ${uid}`)
            })
          } else if (enclosure[i].type == '优惠券') {
            console.log('优惠券')
            // 优惠券有效时间
            let startAt = new Date().getTime()
            // 设置优惠券过期时间为3个月
            let endAt = startAt + 60 * 60 * 24 * 1000 * 30 * 3
            for (let j = 0; j < enclosure[i].num; j++) {
              console.log(`insert into tb_coupon(uid,coupon_id,startAt,endAt,isUse) value(${uid},${enclosure[i].couponId},'${startAt}','${endAt}','0')`)
              connection.query(`insert into tb_coupon(uid,coupon_id,startAt,endAt,isUse) value(${uid},${enclosure[i].couponId},'${startAt}','${endAt}','0')`)
            }
          }
        }
        connection.query(`update mail set enclosureStatus = 1 where id = ${id}`)
        res.send({
          data: {
            code: 200,
            success: true,
            msg: '领取成功'
          }
        })
      }
    })
  })
})

// 查询邮件
router.post('/api/selectmail', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  // id
  let id = req.body.id
  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (err, results) {
    // 用户id
    let uid = results[0].id
    if (id != undefined) {
      connection.query(`update mail set mailStatus = replace(mailStatus,0,1) where id = ${id}`)
      connection.query(`select * from mail where receiver = ${uid} and id = ${id}`, function (err, result) {
        res.send({
          data: {
            code: 200,
            success: true,
            data: result[0]
          }
        })
      })
    } else {
      connection.query(`select * from mail where receiver = ${uid} ORDER BY sendTime DESC`, function (err, result) {
        res.send({
          data: {
            code: 200,
            success: true,
            data: result
          }
        })
      })
    }
  })
})

// 兑换cdk
router.post('/api/selectCDKList', function (req, res, next) {
  // cdk
  let cdk = req.body.cdk
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (err, result) {
    // 用户id
    let uid = result[0].id
    connection.query(`select * from cdk_list where cdkey = '${cdk}'`, function (error, results) {
      if (results.length > 0) {
        if (results[0].count <= 0) {
          res.send({
            data: {
              code: 0,
              success: false,
              msg: '该兑换码已经失效'
            }
          })
        } else {
          // 判断是否已经使用过
          connection.query(`select * from use_cdk where uid = ${uid} and cdkey ='${cdk}'`, function (e, r) {
            if (r.length > 0) {
              res.send({
                data: {
                  code: 0,
                  msg: '此兑换码已经使用',
                  success: false
                }
              })
            } else {
              connection.query(`insert into use_cdk (uid,cdkey) values(${uid},'${cdk}')`)
              let time = common.getTime()
              let mailId = 0
              connection.query(`insert into mail(sender,receiver,title,content,enclosure,enclosureStatus,sendTime,mailStatus) values('【九狐子商城】运营团队',${uid},'【奖励】兑换码兑换奖励','亲爱的旅行者：请查收通过兑换码获得的奖励','',0,'${time}',0)`, function (e, data) {
                mailId = data.insertId

                // 奖励对应的类型
                let type = results[0].type.split(',')
                // 奖励剩下的个数
                let count = parseInt(results[0].count) - 1
                // 奖励
                let reward = results[0].reward.split(',')
                console.log(type, count, reward)
                // 奖励对应的数据库表
                // let table = ''
                // let filed = ''
                connection.query(`select * from mail where id= ${mailId}`, function (e, borders) {
                  let borderList = ''
                  for (let i = 0; i < type.length; i++) {
                    if (type[i] == '头像框') {
                      connection.query(`select * from border_list where id = ${reward[i]}`, function (e, border) {
                        var dataString = JSON.stringify(border[0])
                        var data = JSON.parse(dataString)
                        data.type = '头像框'
                        data.weight = '1'
                        if (borderList == '') {
                          borderList += JSON.stringify(data)
                        } else {
                          borderList += borders[0].enclosure + ',' + JSON.stringify(data)
                        }
                        connection.query(`update mail set enclosure = '${borderList}' where id = ${mailId}`)
                      })
                    } else if (type[i] == '积分') {
                      let data = {
                        type: '积分',
                        name: reward[i],
                        imgUrl: '/images/coin.png',
                        weight: '2'
                      }
                      if (borderList == '') {
                        borderList += JSON.stringify(data)
                      } else {
                        borderList += borders[0].enclosure + ',' + JSON.stringify(data)
                      }
                      connection.query(`update mail set enclosure = '${borderList}' where id = ${mailId}`)
                    }
                  }
                })
                connection.query(`update cdk_list set count = ${count} where cdkey = '${cdk}' `)
              })

              // 第二版功能———— 给兑换成功的奖品添加到邮箱里面
              res.send({
                data: {
                  code: 200,
                  success: true,
                  msg: '兑换成功，前往邮箱领取'
                }
              })
            }
          })
        }
      } else {
        res.send({
          data: {
            code: 0,
            msg: '请输入正确的兑换码',
            success: false
          }
        })
      }
    })
  })
})

// 查看头像框列表
router.post('/api/updateBorder', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  let imgUrl = req.body.imgUrl
  let borderID = req.body.borderID
  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id
    let hasBorderArr = results[0].hasBorder
    if (hasBorderArr.indexOf(borderID) != -1) {
      connection.query(`update user set borderImg = '${imgUrl}' where id = ${uid}`, function () {
        connection.query(user.queryUserTel({ userTel: tokenObj.tel }), function (e, r) {
          res.send({
            data: {
              code: 200,
              success: true,
              msg: '修改成功',
              data: r
            }
          })
        })
      })
    } else {
      res.send({
        data: {
          code: 0,
          success: false,
          msg: '该头像框未拥有'
        }
      })
    }
  })
})

// 查看头像框列表
router.get('/api/selectBorderList', function (req, res, next) {
  connection.query(`select * from border_list`, function (error, results) {
    res.send({
      data: {
        code: 200,
        success: true,
        data: results
      }
    })
  })
})

// 查看今天是否已经签到
router.post('/api/selectSignin', function (req, res, next) {
  let { yesterday, today } = req.body
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id
    connection.query(`select * from sign_in where uid = ${uid} and sign_time = '${today}'`, function (err, result) {
      if (result.length > 0) {
        res.send({
          data: {
            code: 0,
            msg: '今天已签到',
            success: false,
            data: {
              total_time: result[0].total_time
            }
          }
        })
      } else {
        connection.query(`select * from sign_in where uid=${uid} and sign_time = '${yesterday}'`, function (e, r) {
          if (r.length > 0) {
            res.send({
              data: {
                code: 0,
                msg: '昨天已经签到',
                success: true,
                data: {
                  total_time: r[0].total_time == 7 ? 0 : r[0].total_time
                }
              }
            })
          } else {
            res.send({
              data: {
                code: 0,
                msg: '昨天未签到',
                success: true,
                data: {
                  total_time: 0
                }
              }
            })
          }
        })
      }
    })
  })
})

// 签到
router.post('/api/signin', function (req, res, next) {
  let { yesterday, today } = req.body
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id
    let member = results[0].member
    connection.query(`select * from sign_in where uid = ${uid} and sign_time = '${today}'`, function (err, result) {
      if (result.length > 0) {
        res.send({
          data: {
            code: 0,
            msg: '今天已签到',
            success: false,
            data: {
              total_time: result[0].total_time
            }
          }
        })
      } else {
        connection.query(`select * from sign_in where uid = ${uid} and sign_time = '${yesterday}'`, function (e, r) {
          let total = 1
          let reward = ''
          let memberReward = 2 * parseInt(member)
          if (r.length > 0) {
            if (r[0].total_time == 7) {
              total = 1
            } else {
              total = r[0].total_time + 1
            }
          } else {
            total = 1
          }
          switch (total) {
            case 1:
              reward = '3'
              break
            case 2:
              reward = '4'
              break
            case 3:
              reward = '5'
              break
            case 4:
              reward = '8'
              break
            case 5:
              reward = '4'
              break
            case 6:
              reward = '5'
              break
            case 7:
              reward = 8 * Math.floor(Math.random() * 3)
              break
          }
          connection.query(`insert into sign_in(uid,sign_time,reward,total_time) values(${uid},'${today}','${reward + '积分'}',${total})`, function () {
            connection.query(`select * from wallet where uid =${uid}`, function (e, r) {
              if (r.length > 0) {
                let integral = parseFloat(r[0].integral) + parseFloat(reward) + memberReward
                connection.query(`update wallet set integral = ${integral} where uid = ${uid}`, function () {
                  res.send({
                    data: {
                      code: 200,
                      msg: '签到成功',
                      success: true,
                      data: {
                        total_time: total,
                        reward,
                        memberReward
                      }
                    }
                  })
                })
              }
            })
          })
        })
      }
    })
  })
})

// 浏览详情页加入足迹
router.post('/api/setHistory', function (req, res, next) {
  let { goods_id, goods_name, goods_imgUrl, goods_price, time } = req.body[0]
  console.log(goods_id, goods_name, goods_imgUrl, goods_price, time)
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id
    connection.query(`select * from history where uid = ${uid} and goods_id = ${goods_id} and history_time`, function (err, result) {
      connection.query(`insert into history(uid,goods_id,goods_name,goods_price,imgUrl,history_time) values(${uid},${goods_id},'${goods_name}',${goods_price},'${goods_imgUrl}','${time}')`, function (e, r) {
        res.send({
          data: {
            code: 200,
            success: true
          }
        })
      })
    })
  })
})

// 查看我的足迹
router.post('/api/selectHistory', function (req, res, next) {
  let { phone } = req.body
  connection.query(`select * from user where tel = ${phone}`, function (error, results) {
    if (results.length > 0) {
      let uid = results[0].id
      connection.query(`select * from history where uid = ${uid}`, function (err, result) {
        res.send({
          data: {
            code: 200,
            success: true,
            data: result
          }
        })
      })
    }
  })
})

// 查看我的足迹的数量
router.post('/api/selectHistoryCount', function (req, res, next) {
  let phone = req.body.phone
  connection.query(`select * from user where tel = ${phone}`, function (error, results) {
    if (results.length > 0) {
      let uid = results[0].id
      connection.query(`select count(*) as cartCount from history where uid = ${uid} GROUP BY goods_id,history_time`, function (err, result) {
        res.send({
          data: {
            code: 200,
            success: true,
            data: result.length
          }
        })
      })
    }
  })
})

// 查看用户各表的数量
router.post('/api/selectCount', function (req, res, next) {
  let { phone, table } = req.body
  connection.query(`select * from user where tel = ${phone}`, function (error, results) {
    if (results.length > 0) {
      let uid = results[0].id
      connection.query(`select count(*) as cartCount from ${table} where uid = ${uid}`, function (err, result) {
        res.send({
          data: {
            code: 200,
            success: true,
            data: result
          }
        })
      })
    }
  })
})

// 兑换商品
router.post('/api/successExchange', function (req, res, next) {
  let order_id = req.body.order_id
  // console.log(`select * from store_order where order_id = '${order_id}'`)
  connection.query(`select * from store_order where order_id = '${order_id}'`, function (error, results) {
    if (results[0].order_status == '3') {
      res.send({
        data: {
          code: 200,
          success: true
        }
      })
    } else if (results[0].order_status == '0') {
      res.send({
        data: {
          code: 0,
          success: false
        }
      })
    }
  })
})

// 兑换商品
router.post('/api/exchange', function (req, res, next) {
  let order_id = req.body.order_id
  connection.query(`select * from store_order where order_id = ${order_id}`, function (error, results) {
    let price = parseFloat(results[0].goods_price)
    let uid = results[0].uid
    connection.query(`select * from wallet where uid = ${uid}`, function (err, result) {
      if (price > parseFloat(result[0].integral)) {
        res.send({
          data: {
            code: 0,
            success: false,
            msg: '积分不足'
          }
        })
      } else {
        let integral = parseFloat(result[0].integral) - parseFloat(price)
        connection.query(`update store_order set order_status = replace(order_status,'2','3')  where order_id = ${order_id}`, function () {
          connection.query(`update wallet set integral = '${integral}'  where uid = ${uid}`, function () {
            res.send({
              data: {
                code: 200,
                success: true,
                msg: '兑换成功'
              }
            })
          })
        })
      }
    })
  })
})

// 修改兑换商品的订单状态
router.post('/api/submitExchange', function (req, res, next) {
  let order_id = req.body.order_id
  connection.query(`update store_order set order_status = '2' where order_id = ${order_id}`, function (err, result) {
    res.send({
      data: {
        code: 200,
        success: true
      }
    })
  })
})

// 修改密码
router.post('/api/editPassword', function (req, res, next) {
  let { Opassword, Npassword } = req.body
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)

  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let pwd = results[0].pwd
    if (pwd != Opassword) {
      res.send({
        data: {
          code: 0,
          msg: '旧密码不正确，请重试！'
        }
      })
    } else {
      connection.query(`update user set pwd = replace(pwd,'${pwd}','${Npassword}') where tel = ${tokenObj.tel}`, function (err, result) {
        res.send({
          data: {
            code: 200,
            msg: '密码修改成功！',
            success: true
          }
        })
      })
    }
  })
})

// 修改用户头像信息
router.post('/api/updateheaderImg', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  let phone = tokenObj.tel
  let imgUrl = req.body.imgUrl
  // console.log(`select * from user where nickName = '${name}'`)

  // 修改用户
  connection.query(`update user set imgUrl ='${imgUrl}' where tel ='${phone}'`, function () {
    connection.query(`select * from user where tel = '${phone}'`, function (e, r) {
      res.send({
        data: {
          code: 200,
          success: true,
          msg: '修改成功',
          data: r
        }
      })
    })
  })
})
// 修改用户名称信息
router.post('/api/updateUser', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  let phone = tokenObj.tel
  let name = req.body.username
  // console.log(`select * from user where nickName = '${name}'`)
  // 查询用户
  connection.query(`select * from user where nickName = '${name}'`, function (err, result) {
    if (result.length > 0) {
      res.send({
        data: {
          code: 0,
          msg: '用户名已被使用'
        }
      })
    } else {
      // 修改用户
      connection.query(`update user set nickName ='${name}' where tel ='${phone}'`, function () {
        connection.query(`select * from user where tel = '${phone}'`, function (e, r) {
          res.send({
            data: {
              code: 200,
              success: true,
              msg: '修改成功',
              data: r
            }
          })
        })
      })
    }
  })
})

// 获取更新的头像
router.post('/api/set', upload.single('file'), function (req, res, next) {
  let username = req.body.uname
  fs.readFile(req.file.path, function (error, results) {
    if (error) {
      res.send('图片上传失败')
    }
    let filename = username + '-' + Date.now() + path.parse(req.file.originalname).ext
    fs.writeFile(path.join(process.cwd(), '../public/images/headerImg', filename), results, function (err) {
      if (err) {
        res.send('图片写入失败')
      }
      fs.unlinkSync(req.file.path)
      res.json({
        code: 200,
        results: `/images/headerImg/${filename}`,
        msg: '图片上传成功'
      })
    })
  })
})

// 查询商品数据接口
router.get('/api/goods/integralList', function (req, res, next) {
  // 前端给后端的数据
  let [limit, page, orderName] = Object.keys(req.query)
  let [limits, pages, order] = Object.values(req.query)
  // console.log(limit, page)
  // console.log(limits, pages)
  // console.log('select * from goods_list order by ' + orderName + ' ' + order + '')
  // console.log(`select * from goods_list order by ${orderName} ${order} limit ${pages * limits},${limits} `)
  connection.query(`select * from goods_list order by ${orderName} ${order} limit ${pages * limits},${limits} `, function (err, results) {
    res.send({
      code: 0,
      data: results
    })
  })
})

// 删除我的收藏数据
router.post('/api/deleteLike', function (req, res, next) {
  let arrId = req.body.arrId

  for (let i = 0; i < arrId.length; i++) {
    connection.query(`delete from start_list where id = ${arrId[i]}`)
  }
  res.send({
    data: {
      code: 200,
      msg: '删除成功',
      success: true
    }
  })
})

// 我的收藏
router.post('/api/startList', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)

  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id
    connection.query(`select * from start_list where uid = ${uid}`, function (err, result) {
      if (result.length > 0) {
        res.send({
          data: {
            code: 200,
            msg: '查询成功',
            success: true,
            data: result
          }
        })
      } else {
        res.send({
          data: {
            code: 210,
            msg: '查询无数据',
            success: false
          }
        })
      }
    })
  })
})

// 查看是否收藏过商品
router.post('/api/selectLike', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  // 商品id
  let goodId = req.body.goodsId
  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id
    connection.query(`select * from start_list where uid = ${uid} and goods_id = ${goodId}`, function (err, result) {
      if (result.length > 0) {
        res.send({
          data: {
            code: 200,
            success: true
          }
        })
      } else {
        res.send({
          data: {
            code: 210,
            success: true
          }
        })
      }
    })
  })
})

// 收藏商品
router.post('/api/like', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  // 商品id
  let goodId = req.body.goodsId
  // 商品名称
  let goodsName = req.body.goodsName
  // 商品价格
  let goodsPrice = req.body.goodsPrice
  // 商品图片
  let imgUrl = req.body.imgUrl
  // 是否是收藏
  let isStart = req.body.isStart

  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id
    // 如果点击了收藏
    if (isStart) {
      connection.query(`insert into start_list (uid,goods_id,goods_name,goods_price,imgUrl) values(${uid},${goodId},'${goodsName}',${goodsPrice},'${imgUrl}')`, function (err, result) {
        res.send({
          data: {
            code: 200,
            success: true,
            msg: '收藏成功'
          }
        })
      })
    } else {
      connection.query(`delete from start_list where uid = ${uid} and goods_id = ${goodId} `, function (err, result) {
        res.send({
          data: {
            code: 210,
            success: true,
            msg: '取消收藏成功'
          }
        })
      })
    }
  })
})

// 支付状态
router.post('/api/successTopUp', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  // 订单号
  let out_trade_no = req.body.out_trade_no
  let trade_no = req.body.trade_no

  //支付宝配置
  const formData = new AlipayFormData()
  // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  formData.setMethod('get')
  // 支付时的信息
  formData.addField('bizContent', {
    out_trade_no,
    trade_no
  })
  // 返回promise
  const result = alipaySdk.exec('alipay.trade.query', {}, { formData: formData })
  // 后端请求支付宝
  result.then((resData) => {
    axios({
      method: 'GET',
      url: resData
    })
      .then((data) => {
        // console.log(data)
        let responseCode = data.data.alipay_trade_query_response
        if (responseCode.code == '10000') {
          switch (responseCode.trade_status) {
            case 'WAIT_BUYER_PAY':
              res.send({
                data: {
                  code: 0,
                  msg: '支付宝有交易,没付款'
                }
              })
              break

            case 'TRADE_CLOSED':
              res.send({
                data: {
                  code: 1,
                  msg: '交易关闭'
                }
              })
              break

            case 'TRADE_FINISHED':
              // 查询用户
              connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
                // 用户id
                let uid = results[0].id
                connection.query(`select * from store_order where uid = ${uid} and order_id = ${out_trade_no}`, function (err, result) {
                  let id = result[0].id
                  let price = parseFloat(result[0].goods_price)
                  let integral = 0
                  if (price == 100) {
                    integral = 10
                  } else if (price == 1000) {
                    integral = 100
                  }
                  // 订单的状态改成  2==>3
                  connection.query(`update store_order set order_status = replace(order_status,'2','3') where id = ${id}`, function () {
                    connection.query(`select * from wallet where uid = ${uid} `, function (e, r) {
                      // 总资产
                      let total_money = parseFloat(r[0].total_money) + price
                      // 总充值金额
                      let Total_top_up = parseFloat(r[0].Total_top_up) + price
                      // 总消费金额
                      let total_consumption = r[0].total_consumption
                      // 当期积分
                      let total_integral = parseFloat(r[0].integral) + integral
                      connection.query(`update wallet set total_money = ${total_money} , Total_top_up = ${Total_top_up}, integral = ${total_integral} where uid = ${uid}`, function () {
                        res.send({
                          data: {
                            code: 2,
                            msg: '交易完成'
                          }
                        })
                      })
                    })
                  })
                })
              })
              break

            case 'TRADE_SUCCESS':
              // 查询用户
              connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
                // 用户id
                let uid = results[0].id
                connection.query(`select * from store_order where uid = ${uid} and order_id = ${out_trade_no}`, function (err, result) {
                  let id = result[0].id
                  let price = parseFloat(result[0].goods_price)
                  let integral = 0
                  if (price == 100) {
                    integral = 10
                  } else if (price == 1000) {
                    integral = 100
                  }
                  // 订单的状态改成  2==>3
                  connection.query(`update store_order set order_status = replace(order_status,'2','3') where id = ${id}`, function () {
                    connection.query(`select * from wallet where uid = ${uid} `, function (e, r) {
                      // 总资产
                      let total_money = parseFloat(r[0].total_money) + price
                      // 总充值金额
                      let Total_top_up = parseFloat(r[0].Total_top_up) + price
                      // 总消费金额
                      let total_consumption = r[0].total_consumption
                      // 当期积分
                      let total_integral = parseFloat(r[0].integral) + integral
                      connection.query(`update wallet set total_money = ${total_money} , Total_top_up = ${Total_top_up}, integral = ${total_integral} where uid = ${uid}`, function () {
                        res.send({
                          data: {
                            code: 2,
                            msg: '交易完成'
                          }
                        })
                      })
                    })
                  })
                })
              })
              break
          }
        } else if (responseCode.code == '40004') {
          res.send({
            data: {
              code: 4,
              msg: '交易不存在'
            }
          })
        }
      })
      .catch((err) => {
        res.send({
          data: {
            code: 500,
            msg: '交易失败',
            err
          }
        })
      })
  })
})

// 发起支付
router.post('/api/topUp', function (req, res, next) {
  // 订单号
  let orderId = req.body.orderId
  // 商品总价
  let price = req.body.price
  // 购买商品的名称
  let name = req.body.name

  // 开始对接支付宝API
  const formData = new AlipayFormData()
  // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  formData.setMethod('get')
  // 支付时的信息
  formData.addField('bizContent', {
    outTradeNo: orderId, //订单号
    productCode: 'FAST_INSTANT_TRADE_PAY', //写死的
    totalAmount: price, //价格
    subject: name //商品名称
  })
  // 支付成功或者失败跳转的链接
  // formData.addField('returnUrl', 'http://localhost:8080/topUp')
  formData.addField('returnUrl', 'http://localhost/topUp')
  // 返回promise
  const result = alipaySdk.exec('alipay.trade.page.pay', {}, { formData: formData })
  // 对接支付宝成功,支付宝方返回的数据
  result.then((resp) => {
    res.send({
      data: {
        code: 200,
        success: true,
        msg: '支付中',
        paymentUrl: resp
      }
    })
  })
})

// 钱包充值
router.post('/api/addWalletOrder', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  //  前端给后端的数据
  let goodsName = req.body.goods_name
  let goodsPrice = req.body.goods_price
  // 订单号
  let orderId = common.randomNumber()

  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id
    connection.query(`insert into store_order (order_id,goods_name,goods_price,goods_num,order_status,uid,mode,time) values('${orderId}', '${goodsName}','${goodsPrice}',1,'2',${uid},'充值','${common.getTime()}')`, function () {
      connection.query(`select * from store_order where uid = ${uid} and order_id = '${orderId}'`, function (err, result) {
        res.send({
          data: {
            code: 200,
            data: result[0],
            success: true
          }
        })
      })
    })
  })
})

// 查询钱包
router.post('/api/selectwallet', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)

  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id

    connection.query(`select * from wallet where uid = ${uid}`, function (err, result) {
      // console.log(result.length)
      if (result.length == 0) {
        connection.query(`insert into wallet (uid,total_money,Total_top_up,total_consumption,integral) values(${uid},'0','0','0','0')`, function () {
          connection.query(`select * from wallet where uid = ${uid}`, function (e, r) {
            res.send({
              data: {
                code: 200,
                success: true,
                data: r[0]
              }
            })
          })
        })
      } else {
        res.send({
          data: {
            code: 200,
            success: true,
            data: result[0]
          }
        })
      }
    })
  })
})

// 支付状态
router.post('/api/successPayment', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  // 订单号
  let out_trade_no = req.body.out_trade_no
  let trade_no = req.body.trade_no

  console.log(req.body)

  //支付宝配置
  const formData = new AlipayFormData()
  // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  formData.setMethod('get')
  // 支付时的信息
  formData.addField('bizContent', {
    out_trade_no,
    trade_no
  })
  // 返回promise
  const result = alipaySdk.exec('alipay.trade.query', {}, { formData: formData })
  // 后端请求支付宝
  result.then((resData) => {
    axios({
      method: 'GET',
      url: resData
    })
      .then((data) => {
        // console.log(data)
        let responseCode = data.data.alipay_trade_query_response
        if (responseCode.code == '10000') {
          switch (responseCode.trade_status) {
            case 'WAIT_BUYER_PAY':
              // 查询用户
              connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
                // 用户id
                let uid = results[0].id
                // 如果使用优惠券则返回
                connection.query(`select couponID from store_order where uid = ${uid} and order_id = ${out_trade_no}`, function (err, result) {
                  if (result != null) {
                    connection.query(`update tb_coupon set isUse = replace(isUse,'1','0') where id = ${result}`)
                  }
                })
              })
              res.send({
                data: {
                  code: 0,
                  msg: '支付宝有交易,没付款'
                }
              })
              break

            case 'TRADE_CLOSED':
              // 查询用户
              connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
                // 用户id
                let uid = results[0].id
                // 如果使用优惠券则返回
                connection.query(`select couponID from store_order where uid = ${uid} and order_id = ${out_trade_no}`, function (err, result) {
                  if (result != null) {
                    connection.query(`update tb_coupon set isUse = replace(isUse,'1','0') where id = ${result}`)
                  }
                })
              })
              res.send({
                data: {
                  code: 1,
                  msg: '交易关闭'
                }
              })
              break

            case 'TRADE_FINISHED':
              // 查询用户
              connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
                // 用户id
                let uid = results[0].id
                connection.query(`select * from store_order where uid = ${uid} and order_id = ${out_trade_no}`, function (err, result) {
                  let id = result[0].id
                  let integral = Math.floor(result[0].goods_price / 10)
                  let mode = result[0].mode

                  if (mode == '电子货币' || mode == '积分') {
                    let goodsNameArr = result[0].goods_name.split(',')
                    let goodsNumArr = result[0].goods_num.split(',')
                    for (let i = 0; i < goodsNameArr.length; i++) {
                      let num = parseInt(goodsNumArr[i])
                      connection.query(`select * from goods_list where name = '${goodsNameArr[i]}'`, function (e, r) {
                        let count = parseInt(r[0].num) + num
                        connection.query(`update goods_list set num = ${count} where name = '${goodsNameArr[i]}'`)
                      })
                    }
                  }

                  // 订单的状态改成  2==>3
                  connection.query(`update store_order set order_status = '3' where id = ${id}`, function (e, r) {
                    connection.query(`update wallet set integral = ${integral} where uid = ${uid}`, function () {
                      res.send({
                        data: {
                          code: 2,
                          msg: '交易完成'
                        }
                      })
                    })
                  })
                })
              })
              break

            case 'TRADE_SUCCESS':
              // 查询用户
              connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
                // 用户id
                let uid = results[0].id
                connection.query(`select * from store_order where uid = ${uid} and order_id = ${out_trade_no}`, function (err, result) {
                  let id = result[0].id
                  let integral = Math.floor(result[0].goods_price / 10)
                  let mode = result[0].mode

                  if (mode == '电子货币' || mode == '积分') {
                    let goodsNameArr = result[0].goods_name.split(',')
                    let goodsNumArr = result[0].goods_num.split(',')
                    for (let i = 0; i < goodsNameArr.length; i++) {
                      let num = parseInt(goodsNumArr[i])
                      connection.query(`select * from goods_list where name = '${goodsNameArr[i]}'`, function (e, r) {
                        let count = parseInt(r[0].num) + num
                        connection.query(`update goods_list set num = ${count} where name = '${goodsNameArr[i]}'`)
                      })
                    }
                  }

                  // 订单的状态改成  2==>3
                  connection.query(`update store_order set order_status ='3' where id = ${id}`, function () {
                    connection.query(`update wallet set integral = ${integral} where uid = ${uid}`, function () {
                      res.send({
                        data: {
                          code: 2,
                          msg: '交易完成'
                        }
                      })
                    })
                  })
                })
              })
              break
          }
        } else if (responseCode.code == '40004') {
          res.send({
            data: {
              code: 4,
              msg: '交易不存在'
            }
          })
        }
      })
      .catch((err) => {
        // 查询用户
        connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
          // 用户id
          let uid = results[0].id
          // 如果使用优惠券则返回
          connection.query(`select couponID from store_order where uid = ${uid} and order_id = ${out_trade_no}`, function (err, result) {
            if (result != null) {
              connection.query(`update tb_coupon set isUse = replace(isUse,'1','0') where id = ${result}`)
            }
          })
        })
        res.send({
          data: {
            code: 500,
            msg: '交易失败',
            err
          }
        })
      })
  })
})

// 发起支付
router.post('/api/payment', function (req, res, next) {
  // 订单号
  let orderId = req.body.orderId
  // 商品总价
  let price = req.body.price
  // 购买商品的名称
  let name = req.body.name

  // 开始对接支付宝API
  const formData = new AlipayFormData()
  // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  formData.setMethod('get')
  // 支付时的信息
  formData.addField('bizContent', {
    outTradeNo: orderId, //订单号
    productCode: 'FAST_INSTANT_TRADE_PAY', //写死的
    totalAmount: price, //价格
    subject: name //商品名称
  })
  // 支付成功或者失败跳转的链接
  // formData.addField('returnUrl', 'http://localhost:8080/payment')
  formData.addField('returnUrl', 'http://localhost/payment')
  // 返回promise
  const result = alipaySdk.exec('alipay.trade.page.pay', {}, { formData: formData })
  // 对接支付宝成功,支付宝方返回的数据
  result.then((resp) => {
    res.send({
      data: {
        code: 200,
        success: true,
        msg: '支付中',
        paymentUrl: resp
      }
    })
  })
})

// 修改订单状态
router.post('/api/submitOrder', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  // 订单号
  let orderId = req.body.order_id
  // 购物车选中的商品的id
  let shopArr = req.body.shopArr
  // 优惠券ID
  let coupon_id = req.body.coupon_id
  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id
    // 如果使用了优惠券，则修改优惠券表对应的状态
    // 修改订单状态  1 ==> 2
    if (coupon_id != null) {
      connection.query(`update store_order set couponID = ${coupon_id}  where order_id = ${orderId}`)
      connection.query(`update tb_coupon set isUse = replace(isUse,'0','1') where id = ${coupon_id} and uid = ${uid}`)
    }
    connection.query(`select * from store_order where uid = ${uid} and order_id = ${orderId}`, function (err, result) {
      // 订单的数据库 id
      let id = result[0].id
      // 修改订单状态  1 ==> 2
      connection.query(`update store_order set order_status = replace(order_status,'1','2') where id = ${id}`, function (e, r) {
        // 购物车数据删除
        shopArr.forEach((v) => {
          connection.query(`delete from goods_cart where id = ${v}`, function () {})
        })
        res.send({
          data: {
            code: 200,
            success: true
          }
        })
      })
    })
  })
})

// 查询一个订单
router.post('/api/selectOrder', function (req, res, next) {
  // 接收前端给后端的订单号
  let order_id = req.body.order_id

  connection.query(`select * from store_order where order_id = '${order_id}'`, function (err, result) {
    res.send({
      data: {
        code: 200,
        data: result,
        success: true
      }
    })
  })
})

// 生成一个订单
router.post('/api/addOrder', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)

  //  前端给后端的数据
  let goodsArr = req.body.arr

  // 区分是积分兑换还是电子货币购买
  let mode = req.body.mode

  /**
   * 未支付：1
   * 待支付：2
   * 支付成功：3
   * 支付失败：4 | 0
   */

  // 商品列表名称
  let goodsName = []
  // 订单商品总金额
  let goodsPrice = 0
  // 订单商品总数量
  let goodsNum = 0
  // 订单商品分别数量
  let goodsRespectivelyNum = []
  // 订单号
  let orderId = common.randomNumber()

  goodsArr.forEach((v) => {
    // console.log(v)
    goodsName.push(v.goods_name)
    goodsNum += v.goods_num
    goodsRespectivelyNum.push(v.goods_num)
    goodsPrice += v.goods_price * v.goods_num
  })

  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id
    connection.query(`insert into store_order (order_id,goods_name,goods_price,goods_num,order_status,uid,mode,time) values('${orderId}', '${goodsName}','${goodsPrice}','${goodsRespectivelyNum}','1',${uid},'${mode}','${common.getTime()}')`, function (error, results) {
      connection.query(`select * from store_order where uid = ${uid} and order_id = '${orderId}'`, function (err, result) {
        res.send({
          data: {
            code: 200,
            data: result,
            success: true
          }
        })
      })
    })
  })
})

// 删除收货地址
router.post('/api/deleteAddress', function (req, res, next) {
  let id = req.body.id
  connection.query(`delete from address where id = ${id}`, function (err, results) {
    res.send({
      data: {
        code: 200,
        msg: '删除成功',
        success: true
      }
    })
  })
})

// 修改收货地址
router.post('/api/updateAddress', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)

  // 拿到前端给后端传入的数据
  let body = req.body
  // console.log(body)

  let { id, name, tel, province, city, county, addressDetail, isDefault, areaCode } = body
  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id

    // 对应查询到 0 或者 1 有没有默认收货地址
    connection.query(`select * from address where uid= ${uid}`, function (err, result) {
      if (result.length > 0) {
        if (isDefault == '1') {
          connection.query(`update address set isDefault ='0' where uid = ${uid}`, function (e, r) {
            // let updateSql = `update address set uid= ?,name =?, tel = ?, province = ?, city = ?, county = ?, addressDetail = ?, isDefault = ?, areaCode = ? where id = ${id}`
            // connection.query(updateSql, [uid, name, tel, province, city, county, addressDetail, isDefault, areaCode], function (errors, datas) {
            connection.query(`update address set uid= ${uid},name ='${name}', tel = '${tel}', province = '${province}', city = '${city}', county = '${county}', addressDetail = '${addressDetail}', isDefault = '${isDefault}', areaCode = '${areaCode}' where id = ${id}`, function (errors, datas) {
              res.send({
                data: {
                  code: 200,
                  success: true,
                  msg: '修改成功',
                  data: datas
                }
              })
            })
          })
        } else {
          connection.query(`update address set uid= ${uid},name ='${name}', tel = '${tel}', province = '${province}', city = '${city}', county = '${county}', addressDetail = '${addressDetail}', isDefault = '${isDefault}', areaCode = '${areaCode}' where id = ${id}`, function (errors, datas) {
            res.send({
              data: {
                code: 200,
                success: true,
                msg: '修改成功',
                data: datas
              }
            })
          })
        }
      }
      // if (result.length > 0) {
      //   let addressId = result[0].id

      //   connection.query(`update address isDefault = replace(isDefault,'1','0') where id = ${addressId}`, function (e, r) {
      //     let updateSql = `update address set uid= ?,name =?, tel = ?, province = ?, city = ?, county = ?, addressDetail = ?, isDefault = ?, areaCode = ? where id = ${id}`
      //     connection.query(updateSql, [uid, name, tel, province, city, county, addressDetail, isDefault, areaCode], function (errors, datas) {
      //       res.send({
      //         data: {
      //           code: 200,
      //           success: true,
      //           msg: '修改成功',
      //           data: datas
      //         }
      //       })
      //     })
      //   })
      // } else {
      //   let updateSql = `update address set uid= ?,name =?, tel = ?, province = ?, city = ?, county = ?, addressDetail = ?, isDefault = ?, areaCode = ? where id = ${id}`
      //   connection.query(updateSql, [uid, name, tel, province, city, county, addressDetail, isDefault, areaCode], function (errors, datas) {
      //     res.send({
      //       data: {
      //         code: 200,
      //         success: true,
      //         msg: '修改成功',
      //         data: datas
      //       }
      //     })
      //   })
      // }
    })
  })
})

// 查询收货地址
router.post('/api/selectAddress', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)

  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id

    connection.query(`select * from address where uid = ${uid}`, function (err, result) {
      res.send({
        data: {
          code: 200,
          success: true,
          msg: '查询成功',
          data: result
        }
      })
    })
  })
})

// 新增收货地址
router.post('/api/addAddress', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)

  // 拿到前端给后端传入的数据
  let body = req.body

  // let [name, tel, province, city, county, addressDetail, isDefault, areaCode] = [body.name, body.tel, body.province, body.city, body.county, body.addressDetail, body.isDefault, body.areaCode]
  let { name, tel, province, city, county, addressDetail, isDefault, areaCode } = body

  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id
    // 增加一条收货地址

    if (isDefault != 1) {
      connection.query(`insert into address (uid,name, tel, province, city, county, addressDetail, isDefault,areaCode) values(${uid},'${name}','${tel}','${province}','${city}','${county}','${addressDetail}','${isDefault}','${areaCode}')`, function (err, result) {
        res.send({
          data: {
            code: 200,
            success: true,
            msg: '收货地址添加成功'
          }
        })
      })
    } else {
      connection.query(`select * from address where uid = ${uid} and isDefault = ${isDefault}`, function (err, result) {
        if (result.length > 0) {
          let addressId = result[0].id
          connection.query(`update address set isDefault = replace(isDefault,'1','0') where id = ${addressId}`, function (e, r) {
            connection.query(`insert into address (uid,name, tel, province, city, county, addressDetail, isDefault,areaCode) values(${uid},'${name}','${tel}','${province}','${city}','${county}','${addressDetail}','${isDefault}','${areaCode}')`, function () {
              res.send({
                data: {
                  code: 200,
                  success: true,
                  msg: '收货地址添加成功'
                }
              })
            })
          })
        } else {
          connection.query(`insert into address (uid,name, tel, province, city, county, addressDetail, isDefault,areaCode) values(${uid},'${name}','${tel}','${province}','${city}','${county}','${addressDetail}','${isDefault}','${areaCode}')`, function (err, result) {
            res.send({
              data: {
                code: 200,
                success: true,
                msg: '收货地址添加成功'
              }
            })
          })
        }
      })
    }
  })
})

// 修改购物车数量
router.post('/api/updateNum', function (req, res, next) {
  let id = req.body.id
  let changeNum = req.body.num

  connection.query(`select * from goods_cart where id = ${id}`, function (error, results) {
    // 原来的数量
    let num = results[0].goods_num
    connection.query(`update goods_cart set goods_num = replace(goods_num,${num},${changeNum}) where id = ${id}`, function (err, result) {
      res.send({
        data: {
          code: 200,
          success: true
        }
      })
    })
  })
})

// 删除购物车数据
router.post('/api/deleteCart', function (req, res, next) {
  let arrId = req.body.arrId

  for (let i = 0; i < arrId.length; i++) {
    connection.query(`delete from goods_cart where id = ${arrId[i]}`, function (error, results) {})
  }
  res.send({
    data: {
      code: 200,
      msg: '删除成功',
      success: true
    }
  })
})

// 查询购物车
router.post('/api/selectCart', function (req, res, next) {
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)

  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id

    // 查询购物车
    connection.query(`select * from goods_cart where uid = ${uid}`, function (err, result) {
      res.send({
        data: {
          code: 200,
          success: true,
          data: result
        }
      })
    })
  })
})

// 添加购物车数据
router.post('/api/addCart', function (req, res, next) {
  // 后端接收前端的参数
  let goodsId = req.body.goodsId
  // token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)

  // 如果执行，整个token过期了
  // console.log(getTimeToken(tokenObj.exp))
  // if (getTimeToken(tokenObj.exp)) {
  // }
  // res.send({
  //   data: {
  //     code: 1000
  //   }
  // })

  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id

    // 查询商品
    connection.query(`select * from goods_list where id = ${goodsId}`, function (err, result) {
      let goodsName = result[0].name
      let goodsPrice = result[0].price
      let goodsImgUrl = result[0].imgUrl

      // 查询当前用户在之前是否添加过本商品
      connection.query(`select * from goods_cart where uid=${uid} and goods_id = ${goodsId}`, function (e, r) {
        // 用户之前添加过商品到购物车
        if (r.length > 0) {
          let num = r[0].goods_num
          connection.query(`update goods_cart set goods_num = replace(goods_num,${num},${parseInt(num) + 1}) where id = ${r[0].id}`, function (e, datas) {
            res.send({
              data: {
                code: 200,
                success: true,
                msg: '添加购物车成功'
              }
            })
          })
        } else {
          // 没有，新增
          connection.query(`insert into goods_cart (uid,goods_id,goods_name,goods_price,goods_num,goods_imgUrl) values(${uid},${goodsId},'${goodsName}',${goodsPrice},1,'${goodsImgUrl}')`, function (e, r) {
            res.send({
              data: {
                code: 200,
                success: true,
                msg: '添加购物车成功'
              }
            })
          })
        }
      })
    })
  })
})

// 修改密码
router.post('/api/recovery', function (req, res, next) {
  let params = {
    userTel: req.body.phone,
    userPwd: req.body.pwd
  }
  connection.query(user.queryUserTel(params), function (err, result) {
    // 某一条记录数 ID
    let id = result[0].id
    let pwd = result[0].pwd
    connection.query(`update user set pwd = replace(pwd,'${pwd}','${params.userPwd}') where id = ${id}`, function (error, results) {
      res.send({
        code: 200,
        data: {
          success: true,
          msg: '修改成功'
        }
      })
    })
  })
})

// 查询用户是否存在
router.post('/api/selectUser', function (req, res, next) {
  let params = {
    userTel: req.body.phone
  }

  connection.query(user.queryUserTel(params), function (err, result) {
    if (err) throw err
    if (result.length > 0) {
      let uid = result[0].id

      connection.query(`select * from wallet where uid = ${uid}`, function (e, r) {
        // 如果用户钱包没有数据，则为用户添加一条钱包数据
        if (r.length == 0) {
          connection.query(user.insertWallet(uid))
        }
        // 查询用户vip是否过期
        connection.query(`select * from vip_list where uid = ${uid}`, function (e, data) {
          if (data.length > 0) {
            let overtime = data[0].overtime
            let day = common.days(common.getTime(), overtime)
            // 会员等级
            let vipStatus = 0
            if (day >= 36500) {
              vipStatus = 4
            } else if (day >= 365 && day < 36500) {
              vipStatus = 3
            } else if (day >= 90 && day < 365) {
              vipStatus = 2
            } else if (day > 0 && day < 90) {
              vipStatus = 1
            } else if (day <= 0) {
              vipStatus = 0
            }
            connection.query(`update user set member = '${vipStatus}' where id = ${uid}`)
            connection.query(user.queryUserTel(params), function (e, userinfo) {
              res.send({
                code: 200,
                data: {
                  success: true,
                  data: userinfo
                }
              })
            })
          }
        })
      })
    } else {
      res.send({
        code: 0,
        data: {
          success: false,
          msg: '此用户不存在'
        }
      })
    }
  })
})

// 注册
router.post('/api/register', function (req, res, next) {
  let params = {
    userTel: req.body.phone,
    userPwd: req.body.pwd
  }

  // 查询用户是否存在
  connection.query(user.queryUserTel(params), function (err, result) {
    if (err) throw err
    // 用户存在
    if (result.length > 0) {
      res.send({
        code: 200,
        data: {
          success: true,
          msg: '登录成功',
          data: result[0]
        }
      })
    } else {
      // 不存在，新增一条数据
      connection.query(user.insertData(params), function () {
        connection.query(user.queryUserTel(params), function (e, r) {
          res.send({
            code: 200,
            data: {
              success: true,
              msg: '登录成功',
              data: r[0]
            }
          })
        })
      })
    }
  })
})

// 增加一个用户
router.post('/api/addUser', function (req, res, next) {
  let params = {
    userTel: req.body.phone
  }

  // 查询用户是否存在
  connection.query(user.queryUserTel(params), function (err, result) {
    if (err) throw err
    // 用户存在
    if (result.length > 0) {
      res.send({
        code: 200,
        data: {
          success: true,
          msg: '登录成功',
          data: result[0]
        }
      })
    } else {
      // 不存在，新增一条数据
      connection.query(user.insertData(params), function () {
        connection.query(user.queryUserTel(params), function (e, r) {
          connection.query(user.insertWallet(r[0].id))
          res.send({
            code: 200,
            data: {
              success: true,
              msg: '登录成功',
              data: r[0]
            }
          })
        })
      })
    }
  })
})

//发送短信验证
router.post('/api/code', function (req, res, next) {
  let tel = req.body.phone

  // 短信应用SDK AppID
  var appid = 1400636424 // SDK AppID是1400开头

  // 短信应用SDK AppKey
  var appkey = '0e32a8ad0a40b4a81bdd9f61436dd98f'

  // 需要发送短信的手机号码
  var phoneNumbers = [tel]

  // 短信模板ID，需要在短信应用中申请
  var templateId = 285590 // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请

  // 签名
  var smsSign = '腾讯云' // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`

  // 实例化QcloudSms
  var qcloudsms = QcloudSms(appid, appkey)

  // 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
  function callback(err, ress, resData) {
    if (err) {
      console.log('err: ', err)
    } else {
      res.send({
        code: 200,
        data: {
          success: true,
          data: ress.req.body.params[0]
        }
      })
    }
  }
  var ssender = qcloudsms.SmsSingleSender()
  // 这个 变量 就是往手机上，发送的短信
  // var params = [Math.floor(Math.random() * (9999 - 1000)) + 1000]
  var params = ['8848']
  ssender.sendWithParam(86, phoneNumbers[0], templateId, params, smsSign, '', '', callback) // 签名参数不能为空串
})

//密码登录验证
router.post('/api/login', function (req, res, next) {
  // 后端要接收前端传递过来的值
  let params = {
    userTel: req.body.userTel,
    userPwd: req.body.userPwd
  }

  let userTel = params.userTel

  // 引入 token 包
  let jwt = require('jsonwebtoken')
  // 用户信息
  let payload = { tel: userTel }
  // 口令
  let secret = 'jiuhu'
  // 生成 token
  let token = jwt.sign(payload, secret, {
    expiresIn: 60
  })

  // 查询用户手机号是否存在
  connection.query(user.queryUserTel(params), function (err, result) {
    // 手机号存在
    if (result.length > 0) {
      // 记录的id
      let id = result[0].id
      connection.query(user.queryUserPwd(params), function (err, results) {
        if (results.length > 0) {
          connection.query(`update user set token = '${token}' where id = ${id}`, function (e, r) {
            // 手机号和密码都正确
            res.send({
              code: 200,
              data: {
                success: true,
                msg: '登录成功',
                data: results[0]
              }
            })
          })
        } else {
          // 密码不正确
          res.send({
            code: 301,
            data: {
              success: false,
              msg: '密码不正确'
            }
          })
        }
      })
    } else {
      // 手机号不存在
      res.send({
        code: 301,
        data: {
          success: false,
          msg: '手机号不存在'
        }
      })
    }
  })
})

// 首页推荐的数据
router.get('/api/index_list/0/data/1', function (req, res, next) {
  connection.query(`select * from goods_list`, function (error, results) {
    var dataString = JSON.stringify(results)
    var data = JSON.parse(dataString)
    // console.log(data)

    res.send({
      code: 0,
      data: {
        topBar: [
          { id: 0, label: '推荐' },
          { id: 0, label: '大红袍' },
          { id: 0, label: '铁观音' },
          { id: 0, label: '绿茶' },
          { id: 0, label: '普洱' },
          { id: 0, label: '单枞' },
          { id: 0, label: '花茶' },
          { id: 0, label: '茶具' }
        ],
        data: [
          // 这是 swiper
          {
            id: 0,
            type: 'swiperList',
            data: [
              { id: 0, imgUrl: './images/swiper1.jpeg' },
              { id: 1, imgUrl: './images/swiper2.jpeg' },
              { id: 2, imgUrl: './images/swiper3.jpeg' }
            ]
          },
          // 这是 icons
          {
            id: 1,
            type: 'iconsList',
            data: [
              { id: 1, title: '自饮茶', imgUrl: './images/icons1.png', path: '' },
              { id: 2, title: '茶具', imgUrl: './images/icons2.png', path: '' },
              { id: 3, title: '茶礼盒', imgUrl: './images/icons3.png', path: '' },
              { id: 4, title: '积分兑换', imgUrl: './images/icons4.png', path: '/integral' },
              { id: 5, title: '官方验证', imgUrl: './images/icons5.png', path: '' }
            ]
          },
          // 爆款推荐
          {
            id: 2,
            type: 'recommendList',
            data: [
              { id: 1, name: '龙井1号铁罐250g', content: '鲜爽甘醇 口粮首选', price: '68', imgUrl: './images/recommend.jpeg' },
              { id: 2, name: '龙井1号铁罐250g', content: '鲜爽甘醇 口粮首选', price: '68', imgUrl: './images/recommend.jpeg' },
              { id: 3, name: '龙井1号铁罐250g', content: '鲜爽甘醇 口粮首选', price: '68', imgUrl: './images/recommend.jpeg' }
            ]
          },
          // 猜你喜欢
          {
            id: 3,
            type: 'likeList',
            data: data
          }
        ]
      }
    })
  })
})

// 首页大红袍数据
router.get('/api/index_list/1/data/1', function (req, res, next) {
  connection.query(`select * from goods_list`, function (error, results) {
    var dataString = JSON.stringify(results)
    var data = JSON.parse(dataString)

    res.send({
      code: 0,
      data: [
        {
          id: 1,
          type: 'adList',
          data: [
            { id: 1, imgUrl: './images/dhp.jpeg' },
            { id: 2, imgUrl: './images/dhp.jpeg' }
          ]
        },
        // 猜你喜欢
        {
          id: 2,
          type: 'likeList',
          data
        }
      ]
    })
  })
})

// 首页铁观音数据
router.get('/api/index_list/2/data/1', function (req, res, next) {
  connection.query(`select * from goods_list`, function (error, results) {
    var dataString = JSON.stringify(results)
    var data = JSON.parse(dataString)
    res.send({
      code: 0,
      data: [
        {
          id: 1,
          type: 'adList',
          data: [
            { id: 1, imgUrl: './images/tgy.jpeg' },
            { id: 2, imgUrl: './images/tgy.jpeg' }
          ]
        },
        // 猜你喜欢
        {
          id: 2,
          type: 'likeList',
          data
        }
      ]
    })
  })
})

// 查询商品数据接口
router.get('/api/goods/shopList', function (req, res, next) {
  // 前端给后端的数据
  let [searchName, orderName] = Object.keys(req.query)
  let [name, order] = Object.values(req.query)
  console.log('select * from goods_list where name like "%' + name + '%" order by ' + orderName + ' ' + order + '')
  connection.query('select * from goods_list where name like "%' + name + '%" order by ' + orderName + ' ' + order + '', function (err, results) {
    res.send({
      code: 0,
      data: results
    })
  })
})

// 分类的接口
router.get('/api/goods/list', function (req, res, next) {
  res.send({
    code: 0,
    data: [
      {
        // 一级
        id: 0,
        name: '推荐',
        data: [
          {
            // 二级
            id: 0,
            name: '推荐',
            list: [
              // 三级
              { id: 0, name: '铁观音', imgUrl: '/images/list1.jpeg' },
              { id: 1, name: '金骏眉', imgUrl: '/images/list1.jpeg' },
              { id: 2, name: '武夷岩茶', imgUrl: '/images/list1.jpeg' },
              { id: 3, name: '龙井', imgUrl: '/images/list1.jpeg' },
              { id: 4, name: '云南滇红', imgUrl: '/images/list1.jpeg' },
              { id: 5, name: '紫砂壶', imgUrl: '/images/list1.jpeg' },
              { id: 6, name: '建盏', imgUrl: '/images/list1.jpeg' },
              { id: 7, name: '功夫茶具', imgUrl: '/images/list1.jpeg' }
            ]
          }
        ]
      },
      {
        // 一级
        id: 1,
        name: '绿茶',
        data: [
          {
            // 二级
            id: 0,
            name: '绿茶',
            list: [
              // 三级
              { id: 0, name: '龙井', imgUrl: '/images/list1.jpeg' },
              { id: 1, name: '黄山毛峰', imgUrl: '/images/list1.jpeg' },
              { id: 2, name: '碧螺春', imgUrl: '/images/list1.jpeg' },
              { id: 3, name: '雀舌', imgUrl: '/images/list1.jpeg' },
              { id: 4, name: '太平猴魁', imgUrl: '/images/list1.jpeg' },
              { id: 5, name: '安吉白', imgUrl: '/images/list1.jpeg' },
              { id: 6, name: '刘安瓜片', imgUrl: '/images/list1.jpeg' }
            ]
          }
        ]
      },
      {
        // 一级
        id: 2,
        name: '乌龙',
        data: [
          {
            // 二级
            id: 0,
            name: '乌龙',
            list: [
              // 三级
              { id: 0, name: '铁观音', imgUrl: '/images/list1.jpeg' },
              { id: 1, name: '武夷岩茶', imgUrl: '/images/list1.jpeg' },
              { id: 2, name: '漳平水仙', imgUrl: '/images/list1.jpeg' }
            ]
          }
        ]
      },
      {
        // 一级
        id: 3,
        name: '红茶',
        data: [
          {
            // 二级
            id: 0,
            name: '红茶',
            list: [
              // 三级
              { id: 0, name: '金骏眉', imgUrl: '/images/list1.jpeg' },
              { id: 1, name: '正山小种', imgUrl: '/images/list1.jpeg' },
              { id: 2, name: '云南滇红', imgUrl: '/images/list1.jpeg' },
              { id: 3, name: '祁门红茶', imgUrl: '/images/list1.jpeg' }
            ]
          }
        ]
      },
      {
        // 一级
        id: 4,
        name: '白茶',
        data: [
          {
            // 二级
            id: 0,
            name: '白茶',
            list: [
              // 三级
              { id: 0, name: '白牡丹', imgUrl: '/images/list1.jpeg' },
              { id: 1, name: '牡丹王', imgUrl: '/images/list1.jpeg' },
              { id: 2, name: '白毫银针', imgUrl: '/images/list1.jpeg' },
              { id: 3, name: '寿眉', imgUrl: '/images/list1.jpeg' }
            ]
          }
        ]
      },
      {
        // 一级
        id: 5,
        name: '普洱',
        data: [
          {
            // 二级
            id: 0,
            name: '普洱',
            list: [
              // 三级
              { id: 0, name: '生茶', imgUrl: '/images/list1.jpeg' },
              { id: 1, name: '熟茶', imgUrl: '/images/list1.jpeg' }
            ]
          }
        ]
      },
      {
        // 一级
        id: 5,
        name: '花茶',
        data: [
          {
            // 二级
            id: 0,
            name: '花茶',
            list: [
              // 三级
              { id: 0, name: '茉莉花茶', imgUrl: '/images/list1.jpeg' }
            ]
          }
        ]
      },
      {
        // 一级
        id: 6,
        name: '茶具',
        data: [
          {
            // 二级
            id: 0,
            name: '茶具',
            list: [
              // 三级
              { id: 0, name: '紫砂壶', imgUrl: '/images/list1.jpeg' },
              { id: 1, name: '建盏', imgUrl: '/images/list1.jpeg' },
              { id: 2, name: '功夫茶具', imgUrl: '/images/list1.jpeg' },
              { id: 3, name: '茶具配件', imgUrl: '/images/list1.jpeg' },
              { id: 4, name: '干泡茶具', imgUrl: '/images/list1.jpeg' },
              { id: 5, name: '旅行茶具', imgUrl: '/images/list1.jpeg' },
              { id: 6, name: '整套茶具', imgUrl: '/images/list1.jpeg' },
              { id: 7, name: '茶盘', imgUrl: '/images/list1.jpeg' }
            ]
          }
        ]
      },
      {
        // 一级
        id: 7,
        name: '手艺',
        data: [
          {
            // 二级
            id: 0,
            name: '手艺',
            list: [
              // 三级
              { id: 0, name: '根雕', imgUrl: '/images/list1.jpeg' }
            ]
          }
        ]
      }
    ]
  })
})

// 查询商品 ID 的接口
router.get('/api/goods/id', function (req, res, next) {
  let id = req.query.id
  connection.query('select * from goods_list where id = ' + id + '', function (err, results) {
    if (err) throw err
    res.json({
      code: 0,
      data: results[0]
    })
  })
})

module.exports = router
