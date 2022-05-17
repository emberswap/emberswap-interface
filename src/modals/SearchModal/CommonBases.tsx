import { ChainId, Currency, Token, currencyEquals } from '../../sdk'

import { AutoColumn } from '../../components/Column'
import { AutoRow } from '../../components/Row'
import Button from '../../components/Button'
import { COMMON_BASES } from '../../constants/routing'
import CurrencyLogo from '../../components/CurrencyLogo'
import QuestionHelper from '../../components/QuestionHelper'
import React from 'react'
import Typography from '../../components/Typography'
import { currencyId } from '../../functions'

export default function CommonBases({
  chainId,
  onSelect,
  selectedCurrency,
}: {
  chainId?: number
  selectedCurrency?: Currency | null
  onSelect: (currency: Currency) => void
}) {
  const bases = typeof chainId !== 'undefined' ? COMMON_BASES[chainId] ?? [] : []

  return (
    <div className="flex flex-col space-y-2 md:-ml-2 -ml-6">
      <div className="flex flex-row">
        Common bases
        <QuestionHelper text="These tokens are commonly paired with other tokens." />
      </div>
      <div className="flex flex-wrap">
        {bases.map((currency: Currency) => {
          const isSelected = selectedCurrency?.equals(currency)
          return (
            <Button
              variant="empty"
              type="button"
              onClick={() => !isSelected && onSelect(currency)}
              disabled={isSelected}
              key={currencyId(currency)}
              className="flex items-center m-1 p-1 space-x-1 rounded bg-dark-8000 hover:bg-dark-700-custom disabled:bg-dark-1000 disabled:cursor-not-allowed"
            >
              <CurrencyLogo currency={currency} />
              <Typography variant="xs" className="font-semibold">
                {currency.symbol}
              </Typography>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
