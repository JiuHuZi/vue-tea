const Common = {
  // 计算两个日期相差多少天
  days(day1, day2) {
    var time = new Date(day2).getTime() - new Date(day1).getTime()
    var date = Math.ceil(time / (24 * 60 * 60 * 1000))
    return date
  },
  // 时间秒数个位数补0
  setTimeDateFmt(s) {
    return s < 10 ? '0' + s : s
  },
  // 生成订单号 order_id,规则：时间戳 + 6位随机数
  randomNumber() {
    const now = new Date()
    let month = now.getMonth() + 1
    let day = now.getDate()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()

    month = this.setTimeDateFmt(month)
    day = this.setTimeDateFmt(day)
    hour = this.setTimeDateFmt(hour)
    minutes = this.setTimeDateFmt(minutes)
    seconds = this.setTimeDateFmt(seconds)

    let orderCode = now.getFullYear().toString() + month.toString() + day.toString() + hour.toString() + minutes.toString() + seconds.toString() + Math.round(Math.random() * 1000000).toString()

    return orderCode
  },
  // 获取当前时间
  getTime() {
    const now = new Date()
    let year = now.getFullYear()
    let month = now.getMonth() + 1
    let day = now.getDate()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    month = this.setTimeDateFmt(month)
    day = this.setTimeDateFmt(day)
    hour = this.setTimeDateFmt(hour)
    minutes = this.setTimeDateFmt(minutes)
    let time = `${year}-${month}-${day} ${hour}:${minutes}`
    return time
  },
  // 获取N个月后的时间
  getDate(params, data = '') {
    var dt = data != '' ? new Date(data) : new Date()
    dt.setMonth(dt.getMonth() + Number(params + 1))
    // return dt.toLocaleString().replace(/\//g, '-') //这里只是把 "/" 替换为 "-" ;  看需要可去掉;
    console.log(`${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}`)
    return `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}`
  }
}

exports = module.exports = Common
