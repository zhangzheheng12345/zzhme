import dayjs from 'dayjs'

type List = Array<Record<string, any>>

export function SortDate(li: List): List {
  return li.sort((a, b) => {
    return dayjs(a['date']).isBefore(dayjs(b['date'])) ? -1 : 1
  })
}
