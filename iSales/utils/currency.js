import http from './http'
const digitsRE = /(\d{3})(?=\d)/g
/**
 * territory  国家代码
 * currency 货币代码
 * value  原金额
 */
export function formatAmount(format,value) {
  console.log('old value = ' + value)
  console.log(format)
  value = parseFloat(value)
  const symbol = format.currencySymbol
  const precision = format.currencyPrecision
  const thousandsSeparator = format.thousandsSeparator
  const decimalSeparator = format.decimalSeparator
  const stringified = Math.abs(value).toFixed(precision)
  const _int = precision ? stringified.slice(0, -1 - precision) : stringified
  const i = _int.length % 3
  const head = i > 0 ? (_int.slice(0, i) + (_int.length > 3 ? thousandsSeparator : '')) : ''
  const _float = precision ? stringified.slice(-1 - precision) : ''
  const sign = value < 0 ? '-' : ''
  //const newValue = sign + symbol + head + _int.slice(i).replace(digitsRE, '$1,') + _float.replace('.', decimalSeparator)
  const newValue = sign + head + _int.slice(i).replace(digitsRE, '$1' + format.thousandsSeparator ) + _float.replace('.', decimalSeparator)
  console.log('new value = ' + newValue)
  return { value: newValue, symbol: symbol }
}
