/*
 * @Author: your name
 * @Date: 2019-11-05 09:37:28
 * @LastEditTime: 2019-11-05 09:41:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vueCounter\src\filter.js
 */
export function toThousandFilter(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
  }

export function numberFormatter(num, digits) {
    const si = [
      { value: 1E18, symbol: 'E' },
      { value: 1E15, symbol: 'P' },
      { value: 1E12, symbol: 'T' },
      { value: 1E9, symbol: 'G' },
      { value: 1E6, symbol: 'M' },
      { value: 1E3, symbol: 'k' }
    ]
    for (let i = 0; i < si.length; i++) {
      if (num >= si[i].value) {
        return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
      }
    }
    return num.toString()
  }

  export function capitalize (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
  export function lastCapitalize (value) {
    if (!value) return ''
    value = value.toString()
    let len = value.length;
    return value.slice(0, len-1) + value[len-1].toUpperCase()
  }

  export function rev(val){
    return val.split('').reverse().join('');
  }