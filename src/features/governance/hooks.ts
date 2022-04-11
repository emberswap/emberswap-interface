import { Dispatch, useEffect, useState } from 'react'

/*
  Currently expensive to render proposal list item. The infinite scroll is used to
  to minimize this impact. This hook pairs with it, keeping track of visible
  items and passes this to <InfiniteScroll> component.
*/
export function useInfiniteScroll(items: any[]): [number, Dispatch<number>] {
  const [itemsDisplayed, setItemsDisplayed] = useState(20)
  useEffect(() => setItemsDisplayed(20), [items.length])
  return [itemsDisplayed, setItemsDisplayed]
}
