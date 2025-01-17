import {
  masterChefV1PairAddressesQuery,
  masterChefV1SushiPerBlockQuery,
  masterChefV1TotalAllocPointQuery,
  masterChefV2PairAddressesQuery,
  miniChefPairAddressesQuery,
  miniChefPoolsQuery,
  poolsQuery,
  poolsV2Query,
} from '../queries'
import { getTokenSubset } from './exchange'
import { ChainId } from '../../../sdk'
import { GRAPH_HOST } from '../constants'
import { request } from 'graphql-request'

export const MINICHEF = {
  [ChainId.MATIC]: 'sushiswap/matic-minichef',
  [ChainId.XDAI]: 'matthewlilley/xdai-minichef',
  [ChainId.HARMONY]: 'sushiswap/harmony-minichef',
}

export const miniChef = async (query, chainId = ChainId.SMARTBCH) =>
  request(`${GRAPH_HOST[chainId]}/subgraphs/name/${MINICHEF[chainId]}`, query)

  export const MASTERCHEF_V2 = {
    [ChainId.SMARTBCH]: 'emberswap/master-chefv2',
  }
  
  export const masterChefV2 = async (query, chainId = ChainId.SMARTBCH, variables = undefined) =>
    request(`${GRAPH_HOST[chainId]}/subgraphs/name/${MASTERCHEF_V2[chainId]}`, query, variables)
  
  export const MASTERCHEF_V1 = {
    [ChainId.SMARTBCH]: 'emberswap/master-chef',
  }
  
  export const masterChefV1 = async (query, chainId = ChainId.SMARTBCH, variables = undefined) =>
    request(`${GRAPH_HOST[chainId]}/subgraphs/name/${MASTERCHEF_V1[chainId]}`, query, variables)
  
  export const getMasterChefV1TotalAllocPoint = async () => {
    const {
      masterChef: { totalAllocPoint },
    } = await masterChefV1(masterChefV1TotalAllocPointQuery)
    return totalAllocPoint
  }
  
  export const getMasterChefV1SushiPerBlock = async () => {
    const {
      masterChef: { emberPerBlock },
    } = await masterChefV1(masterChefV1SushiPerBlockQuery)
    return emberPerBlock / 1e18
  }
  
  export const getMasterChefV1Farms = async (variables = undefined) => {
    const { pools } = await masterChefV1(poolsQuery, undefined, variables)
    return pools
  }
  
  export const getMasterChefV1PairAddreses = async () => {
    const { pools } = await masterChefV1(masterChefV1PairAddressesQuery)
    return pools
  }
  
  export const getMasterChefV2Farms = async (variables = undefined) => {
    const { pools } = await masterChefV2(poolsV2Query, undefined, variables)
  
    const tokens = await getTokenSubset(ChainId.SMARTBCH, {
      tokenAddresses: Array.from(pools.map((pool) => pool.rewarder.rewardToken)),
    })
  
    return pools.map((pool) => ({
      ...pool,
      rewardToken: {
        ...tokens.find((token) => token.id === pool.rewarder.rewardToken),
      },
    }))
  }

  export const getMasterChefV2PairAddreses = async () => {
    const { pools } = await masterChefV2(masterChefV2PairAddressesQuery)
    return pools
  }  

export const getMiniChefFarms = async (chainId = ChainId.SMARTBCH) => {
  const { pools } = await miniChef(miniChefPoolsQuery, chainId)
  return pools
}

export const getMiniChefPairAddreses = async (chainId = ChainId.SMARTBCH) => {
  console.debug('getMiniChefPairAddreses')
  const { pools } = await miniChef(miniChefPairAddressesQuery, chainId)
  return pools
}
