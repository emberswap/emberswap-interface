import {
  dayDatasQuery,
  ethPriceQuery,
  factoryQuery,
  liquidityPositionsQuery,
  pairsQuery,
  tokenPairsQuery,
  tokenPriceQuery,
  tokenQuery,
  tokenSubsetQuery,
  tokensQuery,
  transactionsQuery,
  TOKEN_CHART,
} from '../queries'
import { ChainId } from '../../../sdk'
import { GRAPH_HOST } from '../constants'
import { request } from 'graphql-request'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export const EXCHANGE = {
  [ChainId.MAINNET]: 'sushiswap/exchange',
  [ChainId.XDAI]: 'sushiswap/xdai-exchange',
  [ChainId.MATIC]: 'sushiswap/matic-exchange',
  [ChainId.FANTOM]: 'sushiswap/fantom-exchange',
  [ChainId.BSC]: 'sushiswap/bsc-exchange',
  [ChainId.HARMONY]: 'sushiswap/harmony-exchange',
  [ChainId.OKEX]: 'sushiswap/okex-exchange',
  [ChainId.AVALANCHE]: 'sushiswap/avalanche-exchange',
  [ChainId.CELO]: 'sushiswap/celo-exchange',
  [ChainId.SMARTBCH]: 'emberswap/subgraphv2',
}


export const exchange = async (chainId = ChainId.SMARTBCH, query, variables) =>
  request(`${GRAPH_HOST[chainId]}/subgraphs/name/${EXCHANGE[chainId]}`, query, variables)

export const getPairs = async (chainId = ChainId.SMARTBCH, variables = undefined, query = pairsQuery) => {
  const { pairs } = await exchange(chainId, query, variables)
  return pairs
}

export const getTokenSubset = async (chainId = ChainId.SMARTBCH, variables) => {
  const { tokens } = await exchange(chainId, tokenSubsetQuery, variables)
  return tokens
}

export const getTokens = async (chainId = ChainId.SMARTBCH, query = tokensQuery, variables) => {
  const { tokens } = await exchange(chainId, query, variables)
  return tokens
}

export const getToken = async (chainId = ChainId.SMARTBCH, query = tokenQuery, variables) => {
  const { token } = await exchange(chainId, query, variables)
  return token
}

export const getTokenPrices = async (chainId = ChainId.SMARTBCH, variables) => {
  const { tokens } = await exchange(chainId, tokensQuery, variables)
  return tokens.map((token) => token?.derivedETH)
}

export const getTokenPrice = async (chainId = ChainId.SMARTBCH, query, variables) => {
  // console.log('getTokenPrice')
  const nativePrice = await getNativePrice(chainId)

  const { token } = await exchange(chainId, query, variables)
  return token?.derivedETH * nativePrice
}

export const getFactoryPrice = async (chainId = ChainId.SMARTBCH, query = factoryQuery, variables) => {
  const { factory } = await exchange(chainId, query, variables)
  return factory
}

export const getTokenData = async (chainId = ChainId.SMARTBCH, query, variables) => {
  // console.log('getTokenPrice')

  const  { tokenDayDatas }  = await exchange(chainId, query, variables)
  return tokenDayDatas
}


export const getNativePrice = async (chainId = ChainId.SMARTBCH, variables = undefined) => {
  // console.log('getEthPrice')
  const data = await getBundle(chainId, undefined, variables)
  return data?.bundles[0]?.ethPrice
}

export const getEthPrice = async (variables = undefined) => {
  return getNativePrice(ChainId.SMARTBCH, variables)
}

export const getCvxPrice = async () => {
  return getTokenPrice(ChainId.MAINNET, tokenPriceQuery, {
    id: '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b',
  })
}

export const getMaticPrice = async () => {
  return getTokenPrice(ChainId.MATIC, tokenPriceQuery, {
    id: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
  })
}

export const getAlcxPrice = async () => {
  return getTokenPrice(ChainId.MAINNET, tokenPriceQuery, {
    id: '0xdbdb4d16eda451d0503b854cf79d55697f90c8df',
  })
}

export const getEmberPrice = async () => {
  return getTokenPrice(ChainId.SMARTBCH, tokenPriceQuery, {
    id: '0x6babf5277849265b6738e75aec43aefdde0ce88d',
  })
}

export const getTokenStats = async (address, skip) => {
  return getTokenData(ChainId.SMARTBCH, TOKEN_CHART, {
    tokenAddr: address,
    skip: skip,
  })
}

export const gotTokenPrice = async (address) => {
  return getTokenPrice(ChainId.SMARTBCH, tokenPriceQuery, {
    id: address,
  })
}

export const getStakePrice = async () => {
  return getTokenPrice(ChainId.XDAI, tokenPriceQuery, {
    id: '0xb7d311e2eb55f2f68a9440da38e7989210b9a05e',
  })
}

export const getOnePrice = async () => {
  return getTokenPrice(ChainId.HARMONY, tokenPriceQuery, {
    id: '0xcf664087a5bb0237a0bad6742852ec6c8d69a27a',
  })
}

export const getBundle = async (
  chainId = ChainId.MAINNET,
  query = ethPriceQuery,
  variables = {
    id: 1,
  }
) => {
  return exchange(chainId, query, variables)
}

export const getLiquidityPositions = async (chainId = ChainId.SMARTBCH, variables) => {
  const { liquidityPositions } = await exchange(chainId, liquidityPositionsQuery, variables)
  return liquidityPositions
}

export const getDayData = async (chainId = ChainId.SMARTBCH, query = dayDatasQuery, variables = undefined) => {
  const { dayDatas } = await exchange(chainId, query, variables)
  return dayDatas
}

export const getFactory = async () => {
  return getFactoryPrice(ChainId.SMARTBCH, factoryQuery, {
    id: "0xE62983a68679834eD884B9673Fb6aF13db740fF0",
  })
}

export const getTransactions = async (chainId = ChainId.SMARTBCH, query = transactionsQuery, variables = undefined) => {
  const { swaps } = await exchange(chainId, query, variables)
  return swaps
}

export const getTokenPairs = async (chainId = ChainId.SMARTBCH, query = tokenPairsQuery, variables = undefined) => {
  const { pairs1, pairs2 } = await exchange(chainId, query, variables)
  return pairs1 || pairs2 ? [...(pairs1 ? pairs1 : []), ...(pairs2 ? pairs2 : [])] : undefined
}
