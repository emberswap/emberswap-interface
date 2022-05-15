import { ChainId } from '../sdk'

export type TokenInfo = {
  id: string
  name: string
  symbol: string
  decimals?: number
}

type PairInfo = {
  id: number
  lpToken: string
  token0: TokenInfo
  token1?: TokenInfo
  name?: string
  symbol?: string
}

type AddressMap = {
  [chainId: number]: {
    [id: string]: PairInfo
  }
}

export const VAULTS: AddressMap = {
  [ChainId.SMARTBCH]: {
    '0': {
      id: 0,
      lpToken: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
      token0: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
    },
    '1': {
      id: 1,
      lpToken: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
      token0: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
    },
    '2': {
      id: 2,
      lpToken: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
      token0: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
    },
    '3': {
      id: 3,
      lpToken: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
      token0: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
    },
    '4': {
      id: 4,
      lpToken: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
      token0: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
    }
  },
  [ChainId.SMARTBCH_TESTNET]: {
    '':{
      id: 0,
      lpToken: '',
      token0: {
        id: '',
        name: '',
        symbol: '',
        decimals: 0,
      },
    }
  },
}
