var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
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
            { id: 1, imgUrl: './images/like.jpeg', name: '建盏茶具套装 红色芝麻毫 12件套', price: 299 },
            { id: 2, imgUrl: './images/like2.jpeg', name: '建盏茶具套装 红色芝麻毫 12件套', price: 299 },
            { id: 3, imgUrl: './images/like3.jpeg', name: '建盏茶具套装 红色芝麻毫 12件套', price: 299 }
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

module.exports = router
