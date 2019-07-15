const digitsRE = /(\d{3})(?=\d)/g
/**
 * territory  国家代码
 * currency 货币代码
 * value  原金额
 */
export function formatAmount(territory, currency, value) {
  if (!isFinite(value) || (!value && value !== 0)) return ''
  let customformat = this.$store.getters.getFormatByTerritory(territory, currency)
  let defalutFormat = this.$store.getters.getFormatByCurrency(currency)
  console.log('customformat' + customformat)
  console.log('defalutFormat' + defalutFormat)
  if (customformat == null && defalutFormat == null) {
    console.log('Does not match any formater.')
    return value
  } else {
    value = parseFloat(value)
    customformat = customformat != null ? customformat : { symbol: '',currencyPrecision: '',thousandsSeparator: '',decimalSeparator: '' }
    defalutFormat = defalutFormat != null ? defalutFormat : { symbol: '',currencyPrecision: '',thousandsSeparator: '',decimalSeparator: '' }
    const symbol = customformat.symbol != null ? defalutFormat.symbol : customformat.symbol
    const precision = customformat.currencyPrecision != null ? customformat.currencyPrecision : defalutFormat.currencyPrecision
    const thousandsSeparator = customformat.thousandsSeparator != null ? customformat.thousandsSeparator : defalutFormat.thousandsSeparator
    const decimalSeparator = customformat.decimalSeparator != null ? customformat.decimalSeparator : defalutFormat.decimalSeparator

    const stringified = Math.abs(value).toFixed(precision)
    const _int = precision ? stringified.slice(0, -1 - precision) : stringified
    const i = _int.length % 3
    const head = i > 0 ? (_int.slice(0, i) + (_int.length > 3 ? thousandsSeparator : '')) : ''
    const _float = precision ? stringified.slice(-1 - precision) : ''
    const sign = value < 0 ? '-' : ''
    return sign + symbol + head + _int.slice(i).replace(digitsRE, '$1,') + _float.replace('.', decimalSeparator)
  }
}

