import moment from 'moment';
import { eventBus } from '@/utils/eventBus';

export const disabledFromToday = current => {
  return current && current > moment().endOf('day');
};

export const disabledBeforeToday = current => {
  return current && current < moment().startOf('day');
};

export const showNotify = (title, message, type) => {
  if (!type) type = 'warning';
  eventBus.$emit('notify', {
    title: title,
    message: message,
    type: type
  });
};

export const handleHttpError = function(error) {
  let httpStatusCode = error.response.status;
  let resultData = error.response.data;
  let msg = resultData.error_description || resultData.message;
  let title = '';
  switch (httpStatusCode) {
    case 500:
      title = 'HTTP 内部服务器错误(500)';
      showNotify(title, msg || title, 'error');
      break;
    case 409:
      title = 'HTTP请求冲突(409)';
      showNotify(title, msg || title, 'error');
      break;
    case 404:
      title = 'HTTP 请求的资源不存在(404)';
      showNotify(title, msg || title, 'error');
      break;
    case 400:
      title = 'HTTP 请求无效(400)';
      showNotify(title, msg || title, 'error');
      break;
    default:
      title = `HTTP ${httpStatusCode}`;
      showNotify(title, msg || title, 'error');
      break;
  }
  throw error;
};

export const handleGetNoDataError = function(error) {
  let httpStatusCode = error.response.status;
  let data;
  switch (httpStatusCode) {
    case 404:
      data = [];
      break;
    default:
      break;
  }
  return data;
};

export const isPlainObject = obj => {
  if (typeof obj !== 'object' || obj === null) return false;
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
};

export const formatDate = data => {
  if (Array.isArray(data)) {
    data.map((item, index) => {
      item.date = item.date.split('T')[0];
    });
  } else if(typeof data === 'string'){
    data = data.split('T')[0];
  }
  return data;
};

/**
 * 
 * @param {*} length 需要约成小数点后面length位
 * @returns 返回的是四舍五入的结果，该方法可以弥补javaScript自带的toFixed方法中对于四舍五入处理不精确的问题（js中的toFixed基本遵循四舍六入五成双的原则）
 */
Number.prototype.toFixed = function(length)
{
    var carry = 0; //存放进位标志
    var num,multiple; //num为原浮点数放大multiple倍后的数，multiple为10的length次方
    var str = this + ''; //将调用该方法的数字转为字符串
    var dot = str.indexOf("."); //找到小数点的位置
    if(str.substr(dot+length+1,1)>=5) carry=1; //找到要进行舍入的数的位置，手动判断是否大于等于5，满足条件进位标志置为1
    multiple = Math.pow(10,length); //设置浮点数要扩大的倍数
    num = Math.floor(this * multiple) + carry; //去掉舍入位后的所有数，然后加上我们的手动进位数
    var result = num/multiple + ''; //将进位后的整数再缩小为原浮点数
    /*
    * 处理进位后无小数
    */
    dot = result.indexOf(".");
    if(dot < 0){
        result += '.';
        dot = result.indexOf(".");
    }
    /*
    * 处理多次进位
    */
    var len = result.length - (dot+1);
    if(len < length){
        for(var i = 0; i < length - len; i++){
            result += 0;
        }
    }
    if(result <= 0) {
      result = '0'
    }
    return result;
}
