var express = require('express')
var router = express.Router()
var connection = require('../db/sql.js')
var user = require('../db/userSql.js')
var QcloudSms = require('qcloudsms_js')
// 引入 token 包
var jwt = require('jsonwebtoken')

// 引入支付宝配置文件
const alipaySdk = require('../db/alipay.js')
const AlipayFormData = require('alipay-sdk/lib/form').default

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
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
  formData.addField('returnUrl', 'http://localhost:8080/payment')
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
  // 购物车选中的商品id
  let shopArr = req.body.shopArr

  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id
    connection.query(`select * from store_order where uid = ${uid} and order_id = ${orderId}`, function (err, result) {
      // 订单的数据库 id
      let id = result[0].id
      // 修改订单状态  1 ==> 2
      connection.query(`update store_order set order_status = replace(order_status,'1','2') where id = ${id}`, function (e, r) {
        // 购物车数据删除
        shopArr.forEach((v) => {
          connection.query(`delete from goods_cart where id = ${v}`, function () {
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

  // 生成订单号 order_id,规则：时间戳 + 6位随机数
  function setTimeDateFmt(s) {
    return s < 10 ? '0' + s : s
  }
  function randomNumber() {
    const now = new Date()
    let month = now.getMonth() + 1
    let day = now.getDate()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()

    month = setTimeDateFmt(month)
    day = setTimeDateFmt(day)
    hour = setTimeDateFmt(hour)
    minutes = setTimeDateFmt(minutes)
    seconds = setTimeDateFmt(seconds)

    let orderCode = now.getFullYear().toString() + month.toString() + day.toString() + hour.toString() + minutes.toString() + seconds.toString() + Math.round(Math.random() * 1000000).toString()

    return orderCode
  }

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
  // 订单号
  let orderId = randomNumber()

  goodsArr.forEach((v) => {
    goodsName.push(v.goods_name)
    goodsNum += v.goods_num
    goodsPrice += v.goods_price * v.goods_num
  })

  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let uid = results[0].id
    connection.query(`insert into store_order (order_id,goods_name,goods_price,goods_num,order_status,uid) values('${orderId}', '${goodsName}','${goodsPrice}',${goodsNum},'1',${uid})`, function (error, results) {
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
        // let addressId = result[0].id
        connection.query(`update address set isDefault ='0' where uid = ${uid}`, function (e, r) {
          let updateSql = `update address set uid= ?,name =?, tel = ?, province = ?, city = ?, county = ?, addressDetail = ?, isDefault = ?, areaCode = ? where id = ${id}`
          connection.query(updateSql, [uid, name, tel, province, city, county, addressDetail, isDefault, areaCode], function (errors, datas) {
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
    connection.query(`delete from goods_cart where id = ${arrId[i]}`, function (error, results) {
      res.send({
        data: {
          code: 200,
          msg: '删除成功',
          success: true
        }
      })
    })
  }
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
      res.send({
        code: 200,
        data: {
          success: true
        }
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
          msg: '登陆成功',
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
              msg: '登陆成功',
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
          msg: '登陆成功',
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
              msg: '登陆成功',
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

  // 查询用户手机号是否存在
  connection.query(user.queryUserTel(params), function (err, results) {
    // 手机号存在
    if (results.length > 0) {
      connection.query(user.queryUserPwd(params), function (err, results) {
        if (results.length > 0) {
          // 手机号和密码都正确
          res.send({
            code: 200,
            data: {
              success: true,
              msg: '登录成功',
              data: results[0]
            }
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
            { id: 1, title: '自饮茶', imgUrl: './images/icons1.png' },
            { id: 2, title: '茶具', imgUrl: './images/icons2.png' },
            { id: 3, title: '茶礼盒', imgUrl: './images/icons3.png' },
            { id: 4, title: '领福利', imgUrl: './images/icons4.png' },
            { id: 5, title: '官方验证', imgUrl: './images/icons5.png' }
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
          data: [
            { id: 1, imgUrl: '/images/goods1.jpeg', name: '浅尝-金牡丹（武夷岩茶）', price: 14.6 },
            { id: 2, imgUrl: '/images/goods2.jpeg', name: '2016南糯山古树普洱生茶', price: 98 },
            { id: 3, imgUrl: '/images/goods3.jpeg', name: '黄山太平猴魁绿茶1号', price: 99 },
            { id: 4, imgUrl: '/images/goods4.jpeg', name: '绿茶-无瑕黄金芽礼盒', price: 188 },
            { id: 5, imgUrl: '/images/goods5.jpeg', name: '黑金茶具套装', price: 458 },
            { id: 6, imgUrl: '/images/goods6.jpeg', name: '高山流水陶瓷旅行茶具', price: 168 },
            { id: 7, imgUrl: '/images/goods7.jpeg', name: '金油滴建盏', price: 298 },
            { id: 8, imgUrl: '/images/goods8.jpeg', name: '浅尝-白牡丹', price: 6.6 },
            { id: 9, imgUrl: '/images/goods9.jpeg', name: '2016白毫银针巧克力茶砖', price: 98 }
          ]
        }
      ]
    }
  })
})

// 首页大红袍数据
router.get('/api/index_list/1/data/1', function (req, res, next) {
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
        data: [
          { id: 1, imgUrl: './images/like.jpeg', name: '建盏茶具套装 红色芝麻毫 12件套', price: 299 },
          { id: 2, imgUrl: './images/like2.jpeg', name: '建盏茶具套装 红色芝麻毫 12件套', price: 299 },
          { id: 3, imgUrl: './images/like3.jpeg', name: '建盏茶具套装 红色芝麻毫 12件套', price: 299 }
        ]
      }
    ]
  })
})

// 首页铁观音数据
router.get('/api/index_list/2/data/1', function (req, res, next) {
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
        data: [
          { id: 1, imgUrl: './images/like.jpeg', name: '建盏茶具套装 红色芝麻毫 12件套', price: 299 },
          { id: 2, imgUrl: './images/like2.jpeg', name: '建盏茶具套装 红色芝麻毫 12件套', price: 299 },
          { id: 3, imgUrl: './images/like3.jpeg', name: '建盏茶具套装 红色芝麻毫 12件套', price: 299 }
        ]
      }
    ]
  })
})

// 查询商品数据接口
router.get('/api/goods/shopList', function (req, res, next) {
  // 前端给后端的数据
  let [searchName, orderName] = Object.keys(req.query)
  let [name, order] = Object.values(req.query)

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
