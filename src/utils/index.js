const common = {
  GMTToStr(time) {
    let date = new Date(time)
    let Str = date.getFullYear() + '-' +
      (date.getMonth() + 1) + '-' +
      date.getDate() + ' ' +
      date.getHours() + ':' +
      date.getMinutes() + ':' +
      date.getSeconds()
    return Str
  },
  //生成从minNum到maxNum的随机数
  randomNum(minNum, maxNum) {
    switch(arguments.length) { 
      case 1:
        return;
        break; 
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        break; 
          default:
        return 0;
        break;
    } 
  } 
}

export default common;
