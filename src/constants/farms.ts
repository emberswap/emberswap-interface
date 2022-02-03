import { ChainId } from '../sdk'

export type TokenInfo = {
  id: string
  name: string
  symbol: string
  decimals?: number
}

type PairInfo = {
  id: number
  token0: TokenInfo
  token1?: TokenInfo
  name?: string
  symbol?: string
}

type AddressMap = {
  [chainId: number]: {
    [address: string]: PairInfo
  }
}

export const POOLS: AddressMap = {
  [ChainId.SMARTBCH]: {
    '0x11dcfD25bda4fb21Df3171493ed77Ec176d11983': {
      id: 0,
      token0: {
        id: '0x0b2C58719a2073640BfC390D703eA832057D2543',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      token1: {
        id: '0x17F4FCF5b6E0A95D4eE331c8529041896A073F9b',
        name: 'BCH',
        symbol: 'BCH',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0xE4E40D77b0a90498029203aA044C9832DADf95A1': {
      id: 1,
      token0: {
        id: '0x0b2C58719a2073640BfC390D703eA832057D2543',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      token1: {
        id: '0xDF7bA1eCfE1851D634a2DE0cd7AB1aA6dEC86269',
        name: 'Incinerate',
        symbol: 'FIRE',
        decimals: 18,
      }, 
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x6ed8DcB768472207984f28811231010ac269C826': {
      id: 2,
      token0: {
        id: '0xDF7bA1eCfE1851D634a2DE0cd7AB1aA6dEC86269',
        name: 'Incinerate',
        symbol: 'FIRE',
        decimals: 18,
      },
      token1: {
        id: '0x17F4FCF5b6E0A95D4eE331c8529041896A073F9b',
        name: 'BCH',
        symbol: 'BCH',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x6bE8ec1e1398c7aaE1F075601A92643AFdfe3Abb': {
      id: 3,
      token0: {
        id: '0x638eE360741A331FCdA33D0083068f86FAe741Ed',
        name: 'FlexUSD',
        symbol: 'FLEXUSD',
        decimals: 18,
      },
      token1: {
        id: '0x17F4FCF5b6E0A95D4eE331c8529041896A073F9b',
        name: 'BCH',
        symbol: 'BCH',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x8889E3Ea121Cd42ECc3190Ca3967bb62c117aeCb': {
      id: 4,
      token0: {
        id: '0x0b2C58719a2073640BfC390D703eA832057D2543',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      token1: {
        id: '0x638eE360741A331FCdA33D0083068f86FAe741Ed',
        name: 'FlexUSD',
        symbol: 'FLEXUSD',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x6E22fFcc5ABF1e7d67E271f1a39A8f321D97DA6d': {
      id: 5,
      token0: {
        id: '0x18d2Cd266416E1fBe49aa32DDBA510c5Ddee8882',
        name: 'LAW US Dollar',
        symbol: 'lawUSD',
        decimals: 18,
      },
      token1: {
        id: '0x638eE360741A331FCdA33D0083068f86FAe741Ed',
        name: 'FlexUSD',
        symbol: 'FLEXUSD',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
  },
}
