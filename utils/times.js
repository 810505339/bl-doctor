// 时分秒
export const Model_data_click = (t) => {
  let time = t;
  if (time <= 59) {
    let miao = time
    if (time < 10) miao = '0' + time
    return `00:${miao}`
  } else if (time > 59 && time <= 3599) {
    let fen = parseInt(time / 60)
    let miao = parseInt(time - (fen * 60))
    if (fen < 10) fen = '0' + fen
    if (miao < 10) miao = '0' + miao
    return `${fen}:${miao}`
  } else if (time > 3599) {
    let xiaoshi = parseInt(time / 3600)
    let fen = parseInt((time - (xiaoshi * 60 * 60)) / 60)
    let miao = parseInt((time - (xiaoshi * 60 * 60)) - (fen * 60))
    if (xiaoshi < 10) xiaoshi = '0' + xiaoshi
    if (fen < 10) fen = '0' + fen
    if (miao < 10) miao = '0' + miao
    return `${xiaoshi}:${fen}:${miao}`
  }
}


// 倒计时
export const disptime = () => {
  let time1 = new Date().getTime()
  return () => {
    let time2 = new Date().getTime()
    let time = time2 - time1
    return getDifValue(time)
  }
}

function getDifValue(time) {
  var difValue = time;
  difValue = difValue % (1000 * 60 * 60 * 24);
  var hour = Math.floor(difValue / 1000 / 60 / 60);//小时
  difValue = difValue % (1000 * 60 * 60);
  var min = Math.floor(difValue / 1000 / 60);//分钟
  difValue = difValue % (1000 * 60);
  var second = Math.floor(difValue / 1000);
  return hour + "小时" + min + "分钟" + second + "秒"
}

// 返回‘年-月-日 几点：几分’格式的
export const getYearToMin = (value) => {
  let year = new Date(value).getFullYear();
  let month = new Date(value).getMonth() + 1;
  let day = new Date(value).getDate();
  let hours = new Date(value).getHours();
  let mins = new Date(value).getMinutes();
  return year + '-' + month + '-' + day + ' ' + hours + ':' + mins;
}

let addZero = value => (value > 9 ? value : '0' + value)

// 返回‘月/日’格式的
export const getMonthAndDay = (value) => {
  let month = new Date(value).getMonth() + 1;
  let day = new Date(value).getDate();
  return addZero(month) + '/' + addZero(day);
}
// 返回‘时:分’格式的
export const getHoursAndMin = (value) => {
  let hours = new Date(value).getHours();
  let mins = new Date(value).getMinutes();
  return addZero(hours) + ':' + addZero(mins);
}
