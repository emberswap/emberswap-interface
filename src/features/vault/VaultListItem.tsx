import { classNames, formatNumber, formatNumberScale, formatPercent } from '../../functions'

import { Disclosure } from '@headlessui/react'
import DoubleLogo from '../../components/DoubleLogo'
import VaultListItemDetails from './VaultListItemDetails'
import Image from '../../components/Image'
import React, { useContext, useState } from 'react'
import { useCurrency } from '../../hooks/Tokens'
import { useV2PairsWithPrice } from '../../hooks/useV2Pairs'
import { EMBER_ADDRESS } from '../../constants/tokens'
import { useActiveWeb3React } from '../../hooks'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import CurrencyLogo from '../../components/CurrencyLogo'
import { isDesktop, isMobile } from 'react-device-detect'
import YieldDetails from '../../components/YieldDetails'
import IconWrapper from '../../components/IconWrapper'
import { WNATIVE } from '../../constants'
import { PriceContext } from '../../contexts/priceContext'
import { Info } from 'react-feather'
import moment from 'moment'
import { usePendingEmber, useUserInfo } from './hooks'
import { ZERO } from '../../sdk'

const VaultListItem = ({ farm, ...rest }) => {
  const { chainId } = useActiveWeb3React()

  let token0 = useCurrency(farm.pair.token0?.id)
  let token1 = useCurrency(farm.pair.token1?.id)

  const priceData = useContext(PriceContext)
  const pendingEmber = usePendingEmber(farm)
  const emberPrice = priceData?.['ember']
  const bchPrice = priceData?.['bch']
  const firePrice = priceData?.['fire']

  const [selectedFarm, setSelectedFarm] = useState<string>(null)

  let [data] = useV2PairsWithPrice([[token0, token1]])
  let [state, pair, pairPrice] = data

  function getTvl() {
    let lpPrice = 0
    let decimals = 18
    if (farm.lpToken.toLowerCase() == EMBER_ADDRESS[chainId].toLowerCase()) {
      lpPrice = emberPrice
      decimals = farm.pair.token0?.decimals
    } else if (farm.lpToken.toLowerCase() == WNATIVE[chainId].toLowerCase()) {
      lpPrice = bchPrice
    } else if (farm.lpToken.toLowerCase() == '0x225FCa2A940cd5B18DFb168cD9B7f921C63d7B6E'.toLowerCase()) {
      lpPrice = firePrice
    } else {
      lpPrice = pairPrice
    }

    farm.lpPrice = lpPrice
    farm.emberPrice = emberPrice

    return Number(farm.totalLp / 10 ** decimals) * lpPrice
  }

  const tvl = getTvl()
  farm.tvl = tvl

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

  return (
    <React.Fragment>
      <Disclosure {...rest}>
        {({ open }) => (
          <div className="mb-4">
            <Disclosure.Button
              className={classNames(
                open && 'rounded-b-none',
                'w-full px-4 py-6 text-left rounded cursor-pointer select-none bg-darker  text-primary text-sm md:text-lg'
              )}
            >
              <div className={isDesktop ?"grid grid-cols-6 " : "grid grid-cols-5"}>
                <div className={isDesktop?"flex col-span-2 space-x-4 lg:col-span-1" : "flex col-span-1 space-x-2 lg:col-span-1"} >
                  {token1 ? (
                    <DoubleLogo currency0={token0} currency1={token1} size={isMobile ? 32 : 40} />
                  ) : (
                    <div className="flex items-center">
                      <CurrencyLogo currency={token0} size={isMobile ? 40 : 50} />
                    </div>
                  )}
                  {isDesktop && (<div className={`flex flex-col justify-center ${token1 ? 'md:flex-row' : ''}`}>
                    <div>
                      <span className="flex font-bold">{farm?.pair?.token0?.symbol}</span>
                      {token1 && <span className="flex font-bold">{farm?.pair?.token1?.symbol}</span>}
                    </div>
                  </div>)}
                </div>
                <div className={isDesktop ?"flex flex-col justify-center font-bold" : "flex flex-col justify-left relative -left-5 text-left font-bold"}>
                  {farm?.lockupDuration == 0 ? 'No lockup' : `${farm?.lockupDuration / 86400} days`}
                </div>
                <div className={isDesktop ?"flex flex-col justify-center font-bold": "flex flex-col justify-left relative -left-5 font-bold"}>{formatNumberScale(tvl, true, 2)}</div>
                <div className="flex-row items-center hidden space-x-4 lg:flex">
                  <div className="flex items-center space-x-2">
                    {farm?.rewards?.map((reward, i) => (
                      <div key={i} className="flex items-center">
                        <Image
                          src={`https://incinerate.cash/img/ex_icons/emberswap.png`}
                          width="50px"
                          height="50px"
                          className="rounded-md"
                          layout="fixed"
                          alt={reward.token}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col space-y-1">
                    {farm?.rewards?.map((reward, i) => (
                      <div key={i} className="text-xs md:text-sm whitespace-nowrap">
                        {formatNumber(reward.rewardPerDay)} {reward.token} {i18n._(t`/ DAY`)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end justify-center">
                  <div
                    className="font-bold flex justify items-center text-righttext-high-emphesis"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedFarm(farm.id)
                    }}
                  >
                    <IconWrapper size="16px" marginRight={'10px'}>
                      <Info />
                    </IconWrapper>
                    {roiPerYear > 1000000 ? '100000000%+' : formatPercent(roiPerYear * 100)}
                  </div>
                  <div className="text-xs text-right md:text-base text-secondary">{i18n._(t`annualized`)}</div>
                </div>
                {pendingEmber && pendingEmber.greaterThan(ZERO) ? (
                <div className="flex flex-col items-center justify-center md:flex-row space-x-4 font-bold md:flex">
                  <div className="hidden md:flex items-center space-x-2">
                    <div key="0" className="flex items-center">
                      <Image
                        src="https://raw.githubusercontent.com/emberswap/assets/master/blockchains/smartbch/assets/0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D/logo.png"
                        width="30px"
                        height="30px"
                        className="rounded-md"
                        layout="fixed"
                        alt="EMBER"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div key="0" className="text-xs md:text-sm">
                      {formatNumber(pendingEmber.toFixed(18))} EMBER
                    </div>
                  </div>
              </div>
              ) : isDesktop && (
                <div className="flex-row items-center justify-center flex pl-3 font-bold text-sm">
                  {i18n._(t`Buy EMBER to Stake`)}
                </div>
              )}
              </div>
            </Disclosure.Button>
            {open && <VaultListItemDetails farm={farm} />}
          </div>
        )}
      </Disclosure>
      {!!selectedFarm && (
        <YieldDetails
          key={farm.id}
          isOpen={selectedFarm == farm.id}
          onDismiss={() => setSelectedFarm(null)}
          roiPerDay={farm.roiPerDay}
          roiPerMonth={farm.roiPerMonth}
          roiPerYear={farm.roiPerYear}
          token0={token0}
          token1={token1}
          lpPrice={farm.lpPrice}
          emberPrice={emberPrice}
        />
      )}
    </React.Fragment>
  )
}

export default VaultListItem
