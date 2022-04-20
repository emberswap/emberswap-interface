import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import { ChainId, CurrencyAmount, JSBI, MASTERCHEF_ADDRESS, Token, ZERO } from '../../sdk'
import { Chef, PairType } from './enum'
import { Disclosure, Transition } from '@headlessui/react'
import React, { useState } from 'react'
import { usePendingEmber, useUserInfo } from './hooks'

import Button from '../../components/Button'
import Dots from '../../components/Dots'
import { MASTERCHEF_V2_ADDRESS } from '../../constants'
import { EMBER_DISTRIBUTOR_ADDRESS, MINICHEF_ADDRESS } from '../../constants/addresses'
import { Input as NumericalInput } from '../../components/NumericalInput'
import { formatNumber, formatNumberScale, formatPercent } from '../../functions'
import { getAddress } from '@ethersproject/address'
import { t } from '@lingui/macro'
import { tryParseAmount } from '../../functions/parse'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useLingui } from '@lingui/react'
import useMasterChef from './useMasterChef'
import usePendingReward from './usePendingReward'
import { useTokenBalance } from '../../state/wallet/hooks'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { useToken } from '../../hooks/Tokens'
import { isMobile, isDesktop } from 'react-device-detect'
import { BigNumber } from 'ethers'

const FarmListItem = ({ farm }) => {
  const { i18n } = useLingui()

  const { account, chainId } = useActiveWeb3React()
  const [pendingTx, setPendingTx] = useState(false)
  const [depositValue, setDepositValue] = useState('')
  const [withdrawValue, setWithdrawValue] = useState('')

  const addTransaction = useTransactionAdder()

  const liquidityToken = new Token(
    chainId,
    getAddress(farm.lpToken),
    farm.pair.token1 ? 18 : farm.pair.token0 ? farm.pair.token0.decimals : 18,
    farm.pair.token1 ? farm.pair.symbol : farm.pair.token0.symbol,
    farm.pair.token1 ? farm.pair.name : farm.pair.token0.name
  )

  // User liquidity token balance
  const balance = useTokenBalance(account, liquidityToken)

  // TODO: Replace these
  const { amount, nextHarvestUntil } = useUserInfo(farm, liquidityToken)

  const pendingEmber = usePendingEmber(farm)

  const reward = usePendingReward(farm)

  const typedDepositValue = tryParseAmount(depositValue, liquidityToken)
  const typedWithdrawValue = tryParseAmount(withdrawValue, liquidityToken)

  const [approvalState, approve] = useApproveCallback(typedDepositValue, EMBER_DISTRIBUTOR_ADDRESS[chainId])

  const { deposit, withdraw, harvest } = useMasterChef()

  const poolFraction = (Number.parseFloat(amount?.toFixed()) / (farm.totalLp / 1e18)) || 0
  const farmAllocation = ((farm.totalLp / 1e18) / (farm.pool.totalSupply / 1e18));
  const token0Reserve = farm.pool.reserves ? (farm.pool.reserves.reserve0 as BigNumber).toString() : 0
  const token0Amount = CurrencyAmount.fromRawAmount(farm.pair.token0, JSBI.BigInt(token0Reserve)).multiply(Math.round(poolFraction * farmAllocation * 1e10)).divide(1e10)
  const token1Reserve = farm.pool.reserves ? (farm.pool.reserves.reserve1 as BigNumber).toString() : 0
  const token1Amount = CurrencyAmount.fromRawAmount(farm.pair.token1, JSBI.BigInt(token1Reserve)).multiply(Math.round(poolFraction * farmAllocation * 1e10)).divide(1e10)
  const token0Name = farm.pool.token0 === farm.pair.token0.id ? farm.pair.token0.symbol : farm.pair.token1.symbol
  const token1Name = farm.pool.token1 === farm.pair.token1.id ? farm.pair.token1.symbol : farm.pair.token0.symbol

  return (
    <Transition
      show={true}
      enter="transition-opacity duration-0"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Disclosure.Panel className="flex flex-col w-full border-t-0 rounded rounded-t-none bg-dark-800" static>
        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="col-span-2 text-center md:col-span-1">
            {farm.depositFeeBP && (
              <div className="pr-4 mb-2 text-left cursor-pointer text-red">{`${i18n._(t`Deposit Fee`)}: ${formatPercent(
                farm.depositFeeBP / 100
              )}`}</div>
            )}
            {account && (
              <div>
                 {isMobile && (<div>
                  &nbsp;
                </div>)}
                    {!isMobile && (<div className="pr-4 mb-2 text-left cursor-pointer text-secondary">
                  &nbsp;
                </div>)}
              <div className="pr-4 mb-2 text-left cursor-pointer text-secondary">
                {i18n._(t`Wallet Balance`)}: {formatNumberScale(balance?.toSignificant(4, undefined, 2) ?? 0, false, 4)}
                {farm.lpPrice && balance
                  ? ` (` + formatNumberScale(farm.lpPrice * Number(balance?.toFixed(18) ?? 0), true, 2) + `)`
                  : ``}
              </div>
              </div>
            )}
            <div className="relative flex items-center w-full mb-4">
              <NumericalInput
                className="w-full px-4 py-4 pr-20 rounded bg-darker focus:ring focus:ring-dark-purple"
                value={depositValue}
                onUserInput={setDepositValue}
              />
              {account && (
                <Button
                  variant="outlined"
                  color="light-green"
                  size="xs"
                  disabled={farm.allocPoint == 0}
                  onClick={() => {
                    if (!balance.equalTo(ZERO)) {
                      if (liquidityToken?.symbol == 'EMBER') {
                        try {
                          const minValue = 1 / 10 ** (liquidityToken?.decimals - 10)
                          const newValue = parseFloat(balance.toFixed(liquidityToken?.decimals)) - minValue
                          setDepositValue(newValue.toFixed(liquidityToken?.decimals))
                        } catch (e) {
                          setDepositValue(balance.toFixed(liquidityToken?.decimals))
                        }
                      } else {
                        setDepositValue(balance.toFixed(liquidityToken?.decimals))
                      }
                    }
                  }}
                  className="absolute border-0 right-4 focus:ring focus:ring-light-purple"
                >
                  {i18n._(t`MAX`)}
                </Button>
              )}
            </div>
            {approvalState === ApprovalState.NOT_APPROVED || approvalState === ApprovalState.PENDING ? (
              <Button
                className="w-full"
                size="sm"
                variant="outlined"
                color="gradient"
                disabled={approvalState === ApprovalState.PENDING}
                onClick={approve}
              >
                {approvalState === ApprovalState.PENDING ? <Dots>Approving </Dots> : i18n._(t`Approve`)}
              </Button>
            ) : (
              <Button
                className="w-full"
                size="sm"
                variant="outlined"
                color="gradient"
               disabled={pendingTx || !typedDepositValue || balance.lessThan(typedDepositValue) || farm.allocPoint == 0}
                onClick={async () => {
                  setPendingTx(true)
                  try {
                    // KMP decimals depend on asset, EMBER-LP is always 18
                    const tx = await deposit(farm?.id, depositValue.toBigNumber(liquidityToken?.decimals))

                    addTransaction(tx, {
                      summary: `${i18n._(t`Deposit`)} ${
                        farm.pair.token1
                          ? `${farm.pair.token0.symbol}/${farm.pair.token1.symbol}`
                          : farm.pair.token0.symbol
                      }`,
                    })
                  } catch (error) {
                    console.error(error)
                  }
                  setPendingTx(false)
                }}
              >
                {i18n._(t`Stake`)}
              </Button>
            )}
          </div>
          <div className="col-span-2 text-center md:col-span-1">
            {farm.depositFeeBP && !isMobile && (
              <div className="pr-4 mb-2 text-left cursor-pointer text-secondary" style={{ height: '24px' }} />
            )}
            {account && (
              <div>
                <div className="pr-4 mb-2 text-left cursor-pointer text-secondary">
                  {i18n._(t`Your Staked`)}: {formatNumber(amount?.toSignificant(6)) ?? 0} {farm.type}
                  {amount && farm.pool ? `(${formatPercent(Math.min(Number.parseFloat(amount?.toFixed()) / (farm.totalLp / 1e18) * 100, 100)).toString()} ` + i18n._(t`of pool`) + `)` : ''}
                </div>
                <div className="pr-4 mb-2 text-left cursor-pointer text-secondary">
                  {token0Amount.toFixed(token0Amount.currency.decimals > 2 ? 2 : undefined)} {token0Name} + {token1Amount.toFixed(token1Amount.currency.decimals > 2 ? 2 : undefined)} {token1Name} ({formatNumber(poolFraction * farm.tvl, true)})
                </div>
              </div>
            )}
            <div className="relative flex items-center w-full mb-4">
              <NumericalInput
                className="w-full px-4 py-4 pr-20 rounded bg-darker focus:ring focus:ring-light-purple"
                value={withdrawValue}
                onUserInput={setWithdrawValue}
              />
              {account && (
                <Button
                  variant="outlined"
                  color="light-green"
                  size="xs"
                  onClick={() => {
                    if (!amount.equalTo(ZERO)) {
                      setWithdrawValue(amount.toFixed(liquidityToken?.decimals))
                    }
                  }}
                  className="absolute border-0 right-4 focus:ring focus:ring-light-purple"
                >
                  {i18n._(t`MAX`)}
                </Button>
              )}
            </div>
            <Button
              className="w-full"
              size="sm"
              variant="outlined"
              color="gradient"
              disabled={pendingTx || !typedWithdrawValue || amount.lessThan(typedWithdrawValue)}
              onClick={async () => {
                setPendingTx(true)
                try {
                  // KMP decimals depend on asset, EMBER-LP is always 18
                  const tx = await withdraw(farm?.id, withdrawValue.toBigNumber(liquidityToken?.decimals))
                  addTransaction(tx, {
                    summary: `${i18n._(t`Withdraw`)} ${
                      farm.pair.token1
                        ? `${farm.pair.token0.symbol}/${farm.pair.token1.symbol}`
                        : farm.pair.token0.symbol
                    }`,
                  })
                } catch (error) {
                  console.error(error)
                }

                setPendingTx(false)
              }}
            >
              {i18n._(t`Unstake`)}
            </Button>
          </div>
        </div>
        {pendingEmber && pendingEmber.greaterThan(ZERO) && (
          <div className="px-4 pb-4">
            <Button
              color="gradient"
              className="w-full"
              variant={!!nextHarvestUntil && nextHarvestUntil > Date.now() ? 'outlined' : 'filled'}
              disabled={!!nextHarvestUntil && nextHarvestUntil > Date.now()}
              onClick={async () => {
                setPendingTx(true)
                try {
                  const tx = await harvest(farm.id)
                  addTransaction(tx, {
                    summary: `${i18n._(t`Harvest`)} ${
                      farm.pair.token1
                        ? `${farm.pair.token0.symbol}/${farm.pair.token1.symbol}`
                        : farm.pair.token0.symbol
                    }`,
                  })
                } catch (error) {
                  console.error(error)
                }
                setPendingTx(false)
              }}
            >
              {i18n._(t`Harvest ${formatNumber(pendingEmber.toFixed(18))} EMBER`)}
            </Button>
          </div>
        )}
      </Disclosure.Panel>
    </Transition>
  )
}

export default FarmListItem
