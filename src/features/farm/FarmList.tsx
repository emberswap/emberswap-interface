import Dots from '../../components/Dots'
import FarmListItem2 from './FarmListItem2'
import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import useSortableData from '../../hooks/useSortableData'
import { useRouter } from 'next/router'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useInfiniteScroll } from '../governance/hooks'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import NeonSelect, { NeonSelectItem } from '../../components/Select'
import { isMobile } from 'react-device-detect'

const FarmList = ({ farms, term, filter }) => {
  const { asPath, pathname, route, query, basePath } = useRouter()
  const { items, requestSort, sortConfig, SortableOptions } = useSortableData(farms)
  const { i18n } = useLingui()
  const [numDisplayed, setNumDisplayed] = useInfiniteScroll(items)

  const isBeefy = query['filter'] == 'beefy'

  const singlePools = items.filter((i) => i.pair.token1).sort((a, b) => b.allocPoint - a.allocPoint)
  const liquidityPools = items.filter((i) => !i.pair.token1).sort((a, b) => b.allocPoint - a.allocPoint)
  const pools = singlePools.concat(liquidityPools)

  return isBeefy ? (
    <div className="w-full py-6 text-center">{i18n._(t`Soon`)}</div>
  ) : items ? (
    <>
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
      <div className={!isMobile ? "grid grid-cols-5 text-base font-bold text-primary" : "grid grid-cols-4 text-base font-bold text-primary"}>
        <div 
          className={!isMobile ? "flex items-center col-span-2 px-4 cursor-pointer md:col-span-1" : "flex items-center px-4 cursor-pointer col-span-1"}
          onClick={() => requestSort('symbol')}
        >
          <div className="hover:text-high-emphesis">{i18n._(t`Stake`)}</div>
           {sortConfig &&
            sortConfig.key === 'symbol' &&
            ((sortConfig.direction === 'ascending' && <ChevronUpIcon width={12} height={12} />) ||
              (sortConfig.direction === 'descending' && <ChevronDownIcon width={12} height={12} />))} 
        </div>
        <div 
          className="flex items-center px-4 cursor-pointer hover:text-high-emphesis"
          onClick={() => requestSort('tvl')}
        >
          {i18n._(t`TVL`)}
          {sortConfig &&
            sortConfig.key === 'tvl' &&
            ((sortConfig.direction === 'ascending' && <ChevronUpIcon width={12} height={12} />) ||
              (sortConfig.direction === 'descending' && <ChevronDownIcon width={12} height={12} />))}
        </div>
        <div 
          className="items-center text-justify-center hidden px-4 md:flex hover:text-high-emphesis"
          onClick={() => requestSort('allocPoint')}
        >
          {i18n._(t`Allocation`)}
          {sortConfig &&
            sortConfig.key === 'allocPoint' &&
            ((sortConfig.direction === 'ascending' && <ChevronUpIcon width={12} height={12} />) ||
              (sortConfig.direction === 'descending' && <ChevronDownIcon width={12} height={12} />))}
        </div>
        <div 
          className="flex items-center justify-end text-justify-center px-4"
          onClick={() => requestSort('roiPerYear')}
        >
          {i18n._(t`APR`)}
          {sortConfig &&
            sortConfig.key === 'roiPerYear' &&
            ((sortConfig.direction === 'ascending' && <ChevronUpIcon width={12} height={12} />) ||
              (sortConfig.direction === 'descending' && <ChevronDownIcon width={12} height={12} />))}
        </div>
        <div
          className="items-end text-justify-end justify-end px-4 cursor-pointer md:flex hover:text-high-emphesis"
          onClick={() => requestSort('pendingEmber')}
        >
          {i18n._(t`Pending`)}
          {sortConfig &&
            sortConfig.key === 'pendingEmber' &&
            ((sortConfig.direction === 'ascending' && <ChevronUpIcon width={12} height={12} />) ||
              (sortConfig.direction === 'descending' && <ChevronDownIcon width={12} height={12} />))}
        </div>
      </div>

        <div className="space-y-4">
          {items.slice(0, numDisplayed).map((farm, index) => (
            <FarmListItem2 key={index} farm={farm} />
          ))}
        </div>
    </>
  ) : (
    <div className="w-full py-6 text-center">
      {term ? <span>{i18n._(t`No Results`)}</span> : <Dots>{i18n._(t`Loading`)}</Dots>}
    </div>
  )
}

export default FarmList
