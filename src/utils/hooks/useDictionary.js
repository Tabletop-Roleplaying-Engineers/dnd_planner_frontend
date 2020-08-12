import { useMemo } from 'react'

export const useDictionary = list => {
  return useMemo(() => {
    return list.reduce((acc, cur) => {
      acc[cur.id] = cur
      return acc
    }, {})
  }, [list])
}
