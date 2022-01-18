export default function (time) {
  // 格式化默认时间，转换为整时 如：09:00 09：30 ，只会格式化为半小时

  if (time.split(':')[1] <= 15) {
    return time.split(':')[0] + ':00'
  } else if (time.split(':')[1] >= 45) {
    let nextHour = parseInt(time.split(':')[0]) + 1
    return nextHour + ':00'
  } else {
    return time.split(':')[0] + ':30'
  }
}
