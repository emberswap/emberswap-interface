import React, { useContext } from 'react'
import Image from 'next/image'
import { formatNumberScale } from '../../functions/format'
import { useTokenStatsModalToggle } from '../../state/application/hooks'
import { useWeb3React } from '@web3-react/core'
import TokenStatsModal from '../../modals/TokenStatsModal'
import { ChainId } from '../../sdk'
import { PriceContext } from '../../contexts/priceContext'

const supportedTokens = {
  BCH: {
    name: 'BCH',
    symbol: 'BCH',
    icon: '/images/tokens/bch.png',
  },
  EMBER: {
    name: 'Ember',
    symbol: 'EMBER',
    icon: '/images/tokens/ember.png',
    address: {
      [ChainId.SMARTBCH]: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
      [ChainId.SMARTBCH_TESTNET]: '0x217057A8B0bDEb160829c19243A2E03bfe95555a',
    },
  },
}

interface TokenStatsProps {
  token: string
}

function TokenStatusInner({ token }) {
  const toggleModal = useTokenStatsModalToggle(token)

  var priceData = useContext(PriceContext)
  var tokenstats = formatNumberScale(priceData?.[token.symbol.toLowerCase()], true, 2)
  if (priceData?.ember < 0.1 && token.symbol == 'EMBER') tokenstats = formatNumberScale(priceData?.ember, true, 3)
  if (priceData?.ember < 0.01 && token.symbol == 'EMBER') tokenstats = formatNumberScale(priceData?.ember, true, 4)
  if (priceData?.ember < 0.001 && token.symbol == 'EMBER') tokenstats = formatNumberScale(priceData?.ember, true, 5)

  return (
    <div className="flex pl-2" onClick={toggleModal}>
      {token.icon && (
        <Image
          src={token['icon']}
          alt={token['symbol']}
          width="24px"
          height="24px"
          objectFit="contain"
          className="rounded-md"
        />
      )}
      <div className="px-3 py-2 text-primary text-bold">
        {tokenstats}
      </div>
    </div>
  )
}

export default function TokenStats({ token, ...rest }: TokenStatsProps) {
  const selectedToken = supportedTokens[token]

  return (
    <>
      <TokenStatusInner token={selectedToken} />
      <TokenStatsModal token={selectedToken} />
    </>
  )
}
