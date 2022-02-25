var express = require('express')
var router = express.Router()
var connection = require('../db/sql.js')
var user = require('../db/userSql.js')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

//
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
