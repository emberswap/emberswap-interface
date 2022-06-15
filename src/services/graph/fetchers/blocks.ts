import { getUnixTime, startOfHour, startOfMinute, startOfSecond, subDays, subHours } from 'date-fns'

import { ChainId } from '../../../sdk'
import { GRAPH_HOST } from '../constants'
import { blocksQuery, blockQuery } from '../queries'
import { request } from 'graphql-request'

export const BLOCKS = {
  [ChainId.MAINNET]: 'blocklytics/ethereum-blocks',
  [ChainId.XDAI]: 'matthewlilley/xdai-blocks',
  [ChainId.MATIC]: 'matthewlilley/polygon-blocks',
  [ChainId.FANTOM]: 'matthewlilley/fantom-blocks',
  [ChainId.BSC]: 'matthewlilley/bsc-blocks',
  [ChainId.HARMONY]: 'sushiswap/harmony-blocks',
  [ChainId.AVALANCHE]: 'matthewlilley/avalanche-blocks',
  [ChainId.CELO]: 'sushiswap/celo-blocks',
  [ChainId.SMARTBCH]: 'blocklytics/ethereum-blocks',
}

export const fetcher = async (chainId = ChainId.SMARTBCH, query, variables) =>
  request(`${GRAPH_HOST[chainId]}/subgraphs/name/${BLOCKS[chainId]}`, query, variables)

export const getBlocks = async (chainId = ChainId.SMARTBCH, start, end) => {
  const { blocks } = await fetcher(chainId, blocksQuery, {
    start,
    end,
  })
  return blocks
}

export const getBlock = async (chainId = ChainId.SMARTBCH, timestamp: number) => {
  const  blocks  = await fetcher(
    chainId,
    blockQuery,
    timestamp
      ? {
          where: {
            timestampFrom: timestamp - 600,
            timestampTo: timestamp,
          },
        }
      : {}
  )

  return blocks?.data?.blocks?.[0]?.number
}

export const getOneDayBlock = async (chainId = ChainId.SMARTBCH) => {
  const date = startOfHour(subDays(Date.now(), 1))
  const start = Math.floor(Number(date) / 1000)
  const end = Math.floor(Number(date) / 1000) + 600
  const { blocks } = await fetcher(chainId, blocksQuery, { start, end })
  return blocks?.[0]?.number
}

export const getOneWeekBlock = async (chainId = ChainId.SMARTBCH) => {
  const date = startOfHour(subDays(Date.now(), 7))
  const start = Math.floor(Number(date) / 1000)
  const end = Math.floor(Number(date) / 1000) + 600
  const { blocks } = await fetcher(chainId, blocksQuery, { start, end })
  return blocks?.[0]?.number
}

export const getCustomDayBlock = async (chainId = ChainId.SMARTBCH, days: number) => {
  const date = startOfHour(subDays(Date.now(), days))
  const start = Math.floor(Number(date) / 1000)
  const end = Math.floor(Number(date) / 1000) + 600
  const { blocks } = await request(`https://thegraph.emberswap.org/subgraphs/name/${BLOCKS[chainId]}`, blocksQuery, {
    start,
    end,
  })
  return blocks?.[0]?.number
}

// Grabs the last 1000 (a sample statistical) blocks and averages
// the time difference between them
export const getAverageBlockTime = async (chainId = ChainId.SMARTBCH) => {
  const now = startOfHour(Date.now())
  const start = getUnixTime(subHours(now, 6))
  const end = getUnixTime(now)
  const blocks = await getBlocks(chainId, start, end)
  const averageBlockTime = blocks?.reduce(
    (previousValue, currentValue, currentIndex) => {
      if (previousValue.timestamp) {
        const difference = previousValue.timestamp - currentValue.timestamp

        previousValue.averageBlockTime = previousValue.averageBlockTime + difference
      }

      previousValue.timestamp = currentValue.timestamp

      if (currentIndex === blocks.length - 1) {
        return previousValue.averageBlockTime / blocks.length
      }

      return previousValue
    },
    { timestamp: null, averageBlockTime: 0 }
  )

  return averageBlockTime
}
