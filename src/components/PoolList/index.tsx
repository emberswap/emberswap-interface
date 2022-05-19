import { ChevronDown, ChevronUp } from 'react-feather'
import { formatNumber, formatPercent } from '../../functions/format'
import { useActiveWeb3React, useFuse, useSortableData } from '../../hooks'

import Card from '../../components/Card'
import CardHeader from '../../components/CardHeader'
import Dots from '../../components/Dots'
import DoubleLogo from '../../components/DoubleLogo'
import Paper from '../../components/Paper'
import React, { useContext, useState } from 'react'
import Router, { useRouter } from 'next/router'
import Search from '../../components/Search'
import { useCurrency } from '../../hooks/Tokens'
import useFarms from '../../hooks/useZapperFarms'
import DoubleGlowShadow from '../DoubleGlowShadow'
import EmberswapLogo from '../EmberswapLogo'
import { useLingui } from '@lingui/react'
import { useInfiniteScroll } from '../../features/governance/hooks'
import { useTVL, useV2PairsWithPrice } from '../../hooks/useV2Pairs'
import { PriceContext } from '../../contexts/priceContext'
import { usePendingEmber } from '../../features/farm/hooks'
import usePool from '../../hooks/usePool'
import { t } from '@lingui/macro'
import NeonSelect, { NeonSelectItem } from '../Select'
import { isMobile } from 'react-device-detect'
import CurrencyLogo from '../CurrencyLogo'

const TokenBalance = ({ farm, ...rest }: any) => {
  const { chainId } = useActiveWeb3React()
  const tvlInfo = useTVL()

  let currency0 = useCurrency(farm.pair.token0?.id)
  let currency1 = useCurrency(farm.pair.token1?.id)

  const priceData = useContext(PriceContext)
  var pendingEmber = usePendingEmber(farm)
  const emberPrice = priceData?.['ember']
  const bchPrice = priceData?.['bch']
  const firePrice = priceData?.['fire']

  let [data] = useV2PairsWithPrice([[currency0, currency1]])
  let [state, pair, pairPrice] = data

  let tvl = 0
  let tvlMap = tvlInfo.map(( tvlInfo, id ) => tvlInfo.tvl)
  tvl = tvlMap[farm.id]

  var roiPerBlock
  if (tvl < 1000){
    roiPerBlock =
    farm?.rewards?.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.rewardPerBlock * currentValue.rewardPrice
    }, 0) / 1000
  }
  else{
    roiPerBlock =
    farm?.rewards?.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.rewardPerBlock * currentValue.rewardPrice
    }, 0) / tvl
  }
  const usePools= usePool(farm.lpToken)
  farm.pool = usePools
  const lpPrice = pairPrice
  farm.lpPrice = lpPrice
  farm.roiPerBlock = roiPerBlock
  const roiPerHour = roiPerBlock * farm.blocksPerHour
  farm.roiPerHour = roiPerHour
  const roiPerDay = roiPerHour * 24
  farm.roiPerDay = roiPerDay
  const roiPerMonth = roiPerDay * 30
  farm.roiPerMonth = roiPerMonth
  const roiPerYear = roiPerDay * 365
  farm.roiPerYear = roiPerYear

  const { i18n } = useLingui()

  //const currency0 = useCurrency(farm.liquidityPair.token0.id)
  //const currency1 = useCurrency(farm.liquidityPair.token1.id)

  return (
    <>
      {farm.roiPerYear !== 0 &&(
        <Paper className="bg-dark-800">
          <div
            className="grid grid-cols-3 px-4 py-4 text-sm rounded cursor-pointer select-none"
            onClick={() => Router.push(`zap?poolAddress=${farm.lpToken}&currencyId=ETH`)}
          >
            <div className="flex col-span-2 space-x-4 md:col-span-1">
                  {currency1 ? (
                    <DoubleLogo currency0={currency0} currency1={currency1} size={isMobile ? 24 : 40} />
                  ) : (
                    <div className="flex items-center">
                      <CurrencyLogo currency={currency0} size={isMobile ? 32 : 50} />
                    </div>
                  )}

                  {(<div className={`flex flex-col justify-center ${currency1 ? 'md:flex-row' : ''}`}>
                    <div>
                      <span className="flex font-bold">{farm?.pair?.token0?.symbol}</span>
                      {currency1 && <span className="flex font-bold">{farm?.pair?.token1?.symbol}</span>}
                    </div>
                  </div>)}
                </div>
            <div className="flex items-center justify-end">
              <div>
                <div className="text-right">{formatNumber(tvl, true)} </div>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <div className="text-xl font-semibold text-right">{formatPercent(farm.roiPerYear * 100)} </div>
            </div>
          </div>
        </Paper>
      )}
    </>
  )
}

const PoolList = ({ farms, term, filter }) => {
  
  const { asPath, pathname, route, query, basePath } = useRouter()
  const { items, requestSort, sortConfig, SortableOptions } = useSortableData(farms)
  const { i18n } = useLingui()
  const [numDisplayed, setNumDisplayed] = useInfiniteScroll(items)

  const isBeefy = query['filter'] == 'beefy'

  const singlePools = items.filter((i) => i.pair.token1).sort((a, b) => b.allocPoint - a.allocPoint)
  const liquidityPools = items.filter((i) => !i.pair.token1).sort((a, b) => b.allocPoint - a.allocPoint)
  const pools = singlePools.concat(liquidityPools)
  
  ///const query = useFarms()
  ///const farms = query?.farms
  ///const userFarms = query?.userFarms
  //// Search Setup
  //const options = { keys: ['symbol', 'name', 'pairAddress'], threshold: 0.4 }
  //const { result, search, term } = useFuse({
  //  data: farms && farms.length > 0 ? farms : [],
  //  options,
  //})
  //// Sorting Setup
  //const { items, requestSort, sortConfig } = useSortableData(result, {
  //  key: 'tvl',
  //  direction: 'descending',
  //})

  return isBeefy ? (
    <div className="w-full py-6 text-center">{i18n._(t`Soon`)}</div>
  ) : items ?(
    <>
          {/* All Farms */}
          { <div className="flex items-center justify-end	 text-secondary gap-3 cursor-pointer">
        <div className="flex flex-row items-center">
          <span className="text-sm">{i18n._(t`Order by`)}:</span>
        </div>
        <NeonSelect value={sortConfig && sortConfig.value}>
          {Object.entries(SortableOptions).map(([k, v]) => (
            <NeonSelectItem key={k} value={v} onClick={() => requestSort(k, 'descending')}>
              {i18n._(t`${v}`)}
            </NeonSelectItem>
          ))}
        </NeonSelect>
      </div> }
          <div className="grid grid-cols-3 px-4 pb-4 text-sm text-secondary">
            <div
              className="flex items-center cursor-pointer hover:text-secondary"
              onClick={() => requestSort('symbol')}
            >
              <div>Pool</div>
              {sortConfig &&
                sortConfig.key === 'symbol' &&
                ((sortConfig.direction === 'ascending' && <ChevronUp size={12} />) ||
                  (sortConfig.direction === 'descending' && <ChevronDown size={12} />))}
            </div>
            <div className="cursor-pointer hover:text-secondary" onClick={() => requestSort('tvl')}>
              <div className="flex items-center justify-end">
                <div>TVL</div>
                {sortConfig &&
                  sortConfig.key === 'tvl' &&
                  ((sortConfig.direction === 'ascending' && <ChevronUp size={12} />) ||
                    (sortConfig.direction === 'descending' && <ChevronDown size={12} />))}
              </div>
            </div>
            <div className="cursor-pointer hover:text-secondary" onClick={() => requestSort('roiPerYear')}>
              <div className="flex items-center justify-end">
                <div>APR</div>
                {sortConfig &&
                  sortConfig.key === 'roiPerYear' &&
                  ((sortConfig.direction === 'ascending' && <ChevronUp size={12} />) ||
                    (sortConfig.direction === 'descending' && <ChevronDown size={12} />))}
              </div>
            </div>
          </div>
          <div className="flex-col space-y-2">
            {items && items.length > 0 ? (
              items.map((farm: any, i: number) => {
                return <TokenBalance key={farm.address + '_' + i} farm={farm} />
              })
            ) : (
              <>
                {term ? (
                  <div className="w-full py-6 text-center">No Results.</div>
                ) : (
                  <div className="w-full py-6 text-center">
                    <Dots>Fetching Pools</Dots>
                  </div>
                )}
              </>
            )}
          </div>
    </>
  ) :
  <div className="w-full py-6 text-center">
  {term ? <span>{i18n._(t`No Results`)}</span> : <Dots>{i18n._(t`Loading`)}</Dots>}
  </div>
}

export default PoolList
