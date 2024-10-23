export const useFilters = {
  date (
    value: number | string | Date,
    format = 'en-GB',
    options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }
  ) {
    if (!value) return ''
    return new Intl.DateTimeFormat(format, options).format(new Date(value))
  }
}
