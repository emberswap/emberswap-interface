import Dots from '../../components/Dots'
import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import VaultListItem from './VaultListItem'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import useSortableData from '../../hooks/useSortableData'
import { useInfiniteScroll } from '../governance/hooks'
import NeonSelect, { NeonSelectItem } from '../../components/Select'
import { isMobile } from 'react-device-detect'


const VaultList = ({ farms }) => {
  const { items, requestSort, sortConfig, SortableOptions } = useSortableData(farms)
  const { i18n } = useLingui()
  const [numDisplayed, setNumDisplayed] = useInfiniteScroll(items)

  return farms ? (
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
      <div className={!isMobile ? "grid grid-cols-6 text-base font-bold text-primary" : "grid grid-cols-5 text-base font-bold text-primary"}>
        {!isMobile &&(<div className="flex items-center col-span-2 px-4 lg:col-span-1 cursor-pointer hover:text-high-emphesis">
          {i18n._(t`Stake`)}
          </div>)}
        <div className={!isMobile ? "flex items-center px-2 cursor-pointer hover:text-high-emphesis" : "flex items-center col-span-2 px-4 lg:col-span-1 relative -right-4 cursor-pointer hover:text-high-emphesis"}
              onClick={() => requestSort('allocPoint')}
        >
          {i18n._(t`Lockup`)}
          {sortConfig &&
          sortConfig.key === 'allocPoint' &&
          ((sortConfig.direction === 'ascending' && <ChevronUpIcon width={12} height={12} />) ||
          (sortConfig.direction === 'descending' && <ChevronDownIcon width={12} height={12} />))}
          </div>
        <div className={!isMobile? "flex items-center px-2 cursor-pointer hover:text-high-emphesis" : "flex items-center px-2 cursor-pointer relative -left-3 hover:text-high-emphesis"}
              onClick={() => requestSort('tvl')}
        >
          {i18n._(t`TVL`)}
          {sortConfig &&
          sortConfig.key === 'tvl' &&
          ((sortConfig.direction === 'ascending' && <ChevronUpIcon width={12} height={12} />) ||
          (sortConfig.direction === 'descending' && <ChevronDownIcon width={12} height={12} />))}
          </div>
        <div className="items-center text-justify-start hidden px-2 lg:flex cursor-pointer hover:text-high-emphesis"
              onClick={() => requestSort('allocPoint')}

        >
          {i18n._(t`Allocation`)}
          {sortConfig &&
          sortConfig.key === 'allocPoint' &&
          ((sortConfig.direction === 'ascending' && <ChevronUpIcon width={12} height={12} />) ||
          (sortConfig.direction === 'descending' && <ChevronDownIcon width={12} height={12} />))}
          </div>
        <div className="flex items-center text-justify-end justify-end flex px-4 cursor-pointer hover:text-high-emphesis"
              onClick={() => requestSort('roiPerYear')}
        >
          {i18n._(t`APR`)}
          {sortConfig &&
          sortConfig.key === 'roiPerYear' &&
          ((sortConfig.direction === 'ascending' && <ChevronUpIcon width={12} height={12} />) ||
          (sortConfig.direction === 'descending' && <ChevronDownIcon width={12} height={12} />))}
          </div>
          <div
          className={!isMobile ? "items-end text-justify-end justify-end px-4 cursor-pointer md:flex hover:text-high-emphesis" : "items-end text-justify-end justify-end px-4 cursor-pointer relative -left-3 md:flex hover:text-high-emphesis"}
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
          {items.slice(0, numDisplayed)
          .map((farm, index) => (
            <VaultListItem key={index} farm={farm} />
          ))}
        </div>
    </>
  ) : (
    <div className="w-full py-6 text-center">
      <Dots>{i18n._(t`Loading`)}</Dots>
    </div>
  )
}

export default VaultList
