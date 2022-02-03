import React from 'react'
import { usePricesApi } from '../features/farm/hooks'

export const PriceContext = React.createContext({
  bch: 0,
  ember: 0,
  fire: 0,
})

export function PriceProvider({ children }) {
  const priceData = usePricesApi()
  return <PriceContext.Provider value={priceData}>{children}</PriceContext.Provider>
}

export default PriceProvider
