import { CurrencyAmount, JSBI, MASTERCHEF_ADDRESS } from '../../sdk'
import { Chef } from './enum'
import { EMBER, MASTERCHEF_V2_ADDRESS, MINICHEF_ADDRESS } from '../../constants'
import { NEVER_RELOAD, useSingleCallResult, useSingleContractMultipleData } from '../../state/multicall/hooks'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  useEmberDistributorContract,
  useBNBPairContract,
  useEmberBCHContract,
  useEmberVaultContract,
  useBCHFlexUSDContract,
  useFireBCHContract,
} from '../../hooks'
import { ChainId } from '../../sdk'
import { Contract } from '@ethersproject/contracts'
import { Zero } from '@ethersproject/constants'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import zip from 'lodash/zip'
import { useToken } from '../../hooks/Tokens'
import { useVaultInfo, useVaults } from '../vault/hooks'
const { default: axios } = require('axios')

export function useChefContract(chef: Chef) {
  const emberDistributorContract = useEmberDistributorContract()
  const contracts = useMemo(
    () => ({
      [Chef.MASTERCHEF]: emberDistributorContract,
      [Chef.MASTERCHEF_V2]: emberDistributorContract,
      [Chef.MINICHEF]: emberDistributorContract,
    }),
    [emberDistributorContract]
  )
  return useMemo(() => {
    return contracts[chef]
  }, [contracts, chef])
}

export function useChefContracts(chefs: Chef[]) {
  const emberDistributorContract = useEmberDistributorContract()
  const contracts = useMemo(
    () => ({
      [Chef.MASTERCHEF]: emberDistributorContract,
      [Chef.MASTERCHEF_V2]: emberDistributorContract,
      [Chef.MINICHEF]: emberDistributorContract,
    }),
    [emberDistributorContract]
  )
  return chefs.map((chef) => contracts[chef])
}

export function useUserInfo(farm, token) {
  const { account } = useActiveWeb3React()

  const contract = useChefContract(0)

  const args = useMemo(() => {
    if (!account) {
      return
    }
    return [String(farm.id), String(account)]
  }, [farm, account])

  const result = useSingleCallResult(args ? contract : null, 'userInfo', args)?.result

  const value = result?.[0]
  const harvestValue = result?.[3]?.[0]

  const amount = value ? JSBI.BigInt(value.toString()) : undefined
  const nextHarvestUntil = harvestValue ? JSBI.BigInt(harvestValue.toString()) : undefined

  return {
    amount: amount ? CurrencyAmount.fromRawAmount(token, amount) : undefined,
    nextHarvestUntil: nextHarvestUntil ? JSBI.toNumber(nextHarvestUntil) * 1000 : undefined,
  }
}

export function usePendingEmber(farm) {
  const { account, chainId } = useActiveWeb3React()

  const contract = useChefContract(0)

  const args = useMemo(() => {
    if (!account) {
      return
    }
    return [String(farm.id), String(account)]
  }, [farm, account])

  const result = useSingleCallResult(args ? contract : null, 'pendingTokens', args)?.result || 0

  const value = result?.[3]?.[0]

  const amount = value ? JSBI.BigInt(value.toString()) : undefined

  return amount ? CurrencyAmount.fromRawAmount(EMBER[chainId], amount) : undefined
}

export function usePendingToken(farm, contract) {
  const { account } = useActiveWeb3React()

  const args = useMemo(() => {
    if (!account || !farm) {
      return
    }
    return [String(farm.pid), String(account)]
  }, [farm, account])

  const pendingTokens = useSingleContractMultipleData(
    args ? contract : null,
    'pendingTokens',
    args.map((arg) => [...arg, '0'])
  )

  return useMemo(() => pendingTokens, [pendingTokens])
}

export function useEmberPPositions(contract?: Contract | null) {
  const { account } = useActiveWeb3React()

  const numberOfPools = useSingleCallResult(contract ? contract : null, 'poolLength', undefined, NEVER_RELOAD)
    ?.result?.[0]

  const args = useMemo(() => {
    if (!account || !numberOfPools) {
      return
    }
    return [...Array(numberOfPools.toNumber()).keys()].map((pid) => [String(pid), String(account)])
  }, [numberOfPools, account])

  const pendingEmber = useSingleContractMultipleData(args ? contract : null, 'pendingTokens', args)

  const userInfo = useSingleContractMultipleData(args ? contract : null, 'userInfo', args)

  return useMemo(() => {
    return zip(pendingEmber, userInfo)
      .map((data, i) => ({
        id: args[i][0],
        pendingEmber: (data[0].result?.[3]?.[0]) || 0,
        amount: data[1].result?.[0] || 0,
      }))
      .filter(({ pendingEmber, amount }) => {
        return (pendingEmber) || (amount)
      })
  }, [args, pendingEmber, userInfo])
}
export function useEmberPositions(contract?: Contract | null) {
  const { account } = useActiveWeb3React()

  const numberOfPools = useSingleCallResult(contract ? contract : null, 'poolLength', undefined, NEVER_RELOAD)
    ?.result?.[0]

  const args = useMemo(() => {
    if (!account || !numberOfPools) {
      return
    }
    return [...Array(numberOfPools.toNumber()).keys()].map((pid) => [String(pid), String(account)])
  }, [numberOfPools, account])

  const pendingEmber = useSingleContractMultipleData(args ? contract : null, 'pendingTokens', args)

  const userInfo = useSingleContractMultipleData(args ? contract : null, 'userInfo', args)

  return useMemo(() => {
    if (!pendingEmber || !userInfo) {
      return []
    }
    return zip(pendingEmber, userInfo)
      .map((data, i) => ({
        id: args[i][0],
        pendingEmber: (data[0].result?.[3]?.[0]) || Zero,
        amount: data[1].result?.[0] || Zero,
      }))
      .filter(({ pendingEmber, amount }) => {
        return (pendingEmber && !pendingEmber.isZero()) || (amount && !amount.isZero())
      })
  }, [args, pendingEmber, userInfo])
}
export function usePositions() {
  return useEmberPositions(useEmberDistributorContract())
}

export function usePPositions() {
  return useEmberPPositions(useEmberDistributorContract())
}
export function useEmberFarms(contract?: Contract | null) {
  const { account } = useActiveWeb3React()

  const numberOfPools = useSingleCallResult(contract ? contract : null, 'poolLength', undefined, NEVER_RELOAD)
    ?.result?.[0]

  const args = useMemo(() => {
    if (!numberOfPools) {
      return
    }
    return [...Array(numberOfPools.toNumber()).keys()].map((pid) => [String(pid)])
  }, [numberOfPools])

  const poolInfo = useSingleContractMultipleData(args ? contract : null, 'poolInfo', args)

  return useMemo(() => {
    if (!poolInfo) {
      return []
    }
    return zip(poolInfo).map((data, i) => ({
      id: args[i][0],
      lpToken: data[0].result?.['lpToken'] || '',
      allocPoint: data[0].result?.['allocPoint'] || '',
      lastRewardBlock: data[0].result?.['lastRewardTimestamp'] || '',
      accEmberPerShare: data[0].result?.['accEmberPerShare'] || '',
      depositFeeBP: data[0].result?.['depositFeeBP'] || '',
      harvestInterval: data[0].result?.['harvestInterval'] || '',
      totalLp: data[0].result?.['totalLp'] || '',
    }))
  }, [args, poolInfo])
}

const useAsync = (asyncFunction, immediate = true) => {
  const [value, setValue] = useState(null)

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    return asyncFunction().then((response) => {
      let [prices] = response
      setValue({ data: { ...prices?.data } })
    })
  }, [asyncFunction])
  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    const intervalId = setInterval(() => {
      execute()
    }, 60000)

    if (immediate) {
      execute()
    }

    return () => {
      clearInterval(intervalId) //This is important
    }
  }, [execute, immediate])

  return useMemo(() => {
    return value
  }, [value])
}

export function usePriceApi() {
  return Promise.all([axios.get('/api/prices')])
}

export function usePrice(pairContract?: Contract | null, pairDecimals?: number | null, invert: boolean = false) {
  const { account, chainId } = useActiveWeb3React()

  const result = useSingleCallResult(pairContract ? pairContract : null, 'getReserves', undefined, NEVER_RELOAD)?.result

  const _reserve1 = invert ? result?.['reserve0'] : result?.['reserve1']
  const _reserve0 = invert ? result?.['reserve1'] : result?.['reserve0']

  const price = _reserve1 ? (Number(_reserve1) / Number(_reserve0)) * (pairDecimals ? 10 ** pairDecimals : 1) : 0

  return price
}

export function useTokenInfo(tokenContract?: Contract | null) {
  const { account, chainId } = useActiveWeb3React()
  const vaults = useVaults()

  const _totalSupply = useSingleCallResult(tokenContract ? tokenContract : null, 'totalSupply', undefined, NEVER_RELOAD)
    ?.result?.[0]

  const _burnt = useSingleCallResult(
    tokenContract ? tokenContract : null,
    'balanceOf',
    ['0x000000000000000000000000000000000000dEaD'],
    NEVER_RELOAD
  )?.result?.[0]

  let lockedInVaults = JSBI.BigInt(0)

  vaults
    .filter((r) => r.lockupDuration >= 0)
    .forEach((r) => {
      lockedInVaults = JSBI.add(lockedInVaults, JSBI.BigInt(r.totalLp.toString()))
    })

  const totalSupply = _totalSupply ? JSBI.BigInt(_totalSupply.toString()) : JSBI.BigInt(0)
  const burnt = _burnt ? JSBI.BigInt(_burnt.toString()) : JSBI.BigInt(0)

  const circulatingSupply = JSBI.subtract(JSBI.subtract(totalSupply, burnt), lockedInVaults)

  const token = useToken(tokenContract.address)

  return useMemo(() => {
    if (!token) {
      return {
        totalSupply: '0',
        burnt: '0',
        circulatingSupply: '0',
        lockedInVaults: '0',
      }
    }

    return {
      totalSupply: CurrencyAmount.fromRawAmount(token, totalSupply).toFixed(0),
      burnt: CurrencyAmount.fromRawAmount(token, burnt).toFixed(0),
      vaults: CurrencyAmount.fromRawAmount(token, lockedInVaults).toFixed(0),
      circulatingSupply: CurrencyAmount.fromRawAmount(token, circulatingSupply).toFixed(0),
    }
  }, [totalSupply, burnt, circulatingSupply, token, lockedInVaults])
}

export function useFarms() {
  return useEmberFarms(useEmberDistributorContract())
}

export function usePricesApi() {
  const bchPrice = useBCHPrice()
  const emberPrice = useEmberPrice()
  const firePrice = useFirePrice()

  return useMemo(() => {
    return {
      bch: bchPrice,
      ember: emberPrice * bchPrice,
      fire: firePrice * bchPrice,
      flexusd: 1,
    }
  }, [bchPrice, firePrice, emberPrice])
}

export function useFarmsApi() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useAsync(usePriceApi, true)
}

export function useBCHPrice() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return usePrice(useBCHFlexUSDContract())
}

export function useEmberPrice() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return usePrice(useEmberBCHContract(), 0, true)
}

export function useFirePrice() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return usePrice(useFireBCHContract(), 0, false)
}

export function useBNBPrice() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return usePrice(useBNBPairContract())
}

export function useEmberDistributorInfo(contract) {
  const emberPerSec = (useSingleCallResult(contract ? contract : null, 'emberPerSec', undefined, NEVER_RELOAD)
    ?.result?.[0] * 5.5)*0.75

  const totalAllocPoint = useSingleCallResult(contract ? contract : null, 'totalAllocPoint', undefined, NEVER_RELOAD)
    ?.result?.[0]

  return useMemo(() => ({ emberPerSec, totalAllocPoint }), [emberPerSec, totalAllocPoint])
}

export function useDistributorInfo() {
  return useEmberDistributorInfo(useEmberDistributorContract())
}
