export const SUCCESS = '0';

export function filter(value) {
  if(!value) {
    return '';
  }
  let result = parseFloat(value);
  // 如果转换后还是整数。则没有小数
  if(Number.isInteger(result)) {
    return result;
  }
  return result.toFixed(2);
}
