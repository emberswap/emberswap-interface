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
    '0x52c656FaF57DCbDdDd47BCbA7b2ab79e4c232C28': {
      id: 0,
      token0: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      token1: {
        id: '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04',
        name: 'BCH',
        symbol: 'BCH',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0xbea5b2FDC61D74863148aa393EC8b4671C3e94d3': {
      id: 1,
      token0: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      token1: {
        id: '0x225FCa2A940cd5B18DFb168cD9B7f921C63d7B6E',
        name: 'Incinerate',
        symbol: 'FIRE',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x31361009c8b43Bc44721dc38699511122436b55B': {
      id: 2,
      token0: {
        id: '0x225FCa2A940cd5B18DFb168cD9B7f921C63d7B6E',
        name: 'Incinerate',
        symbol: 'FIRE',
        decimals: 18,
      },
      token1: {
        id: '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04',
        name: 'BCH',
        symbol: 'BCH',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0xfAe17176ACc70D8B3D51EE6B1978889A0fb6bBd4': {
      id: 3,
      token0: {
        id: '0x7b2B3C5308ab5b2a1d9a94d20D35CCDf61e05b72',
        name: 'FlexUSD',
        symbol: 'FLEXUSD',
        decimals: 18,
      },
      token1: {
        id: '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04',
        name: 'BCH',
        symbol: 'BCH',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x236021398357550dC287D863FF7d326Af1dbC191': {
      id: 4,
      token0: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      token1: {
        id: '0x7b2B3C5308ab5b2a1d9a94d20D35CCDf61e05b72',
        name: 'FlexUSD',
        symbol: 'FLEXUSD',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x947127b144560BcF448B5Be9551d446A4a25793d': {
      id: 5,
      token0: {
        id: '0xE1E655BE6F50344e6dd708c27BD8D66492d6ecAf',
        name: 'LAW US Dollar',
        symbol: 'lawUSD',
        decimals: 18,
      },
      token1: {
        id: '0x7b2B3C5308ab5b2a1d9a94d20D35CCDf61e05b72',
        name: 'FlexUSD',
        symbol: 'FLEXUSD',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x35df4a3A96649b6BB9188d2a269eC75cEB5F5132': {
      id: 6,
      token0: {
        id: '0xE1E655BE6F50344e6dd708c27BD8D66492d6ecAf',
        name: 'LAW US Dollar',
        symbol: 'lawUSD',
        decimals: 18,
      },
      token1: {
        id: '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04',
        name: 'BCH',
        symbol: 'BCH',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0xDa99c2BF9328f77d57AF094A1a6B5Aa4F2Fa0c4d': {
      id: 7,
      token0: {
        id: '0x265bD28d79400D55a1665707Fa14A72978FA6043',
        name: 'CashCats',
        symbol: '$CATS',
        decimals: 2,
      },
      token1: {
        id: '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04',
        name: 'BCH',
        symbol: 'BCH',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x4A4Eb56480BEA797dF8C1F1b27E8AEa754de1e5D': {
      id: 8,
      token0: {
        id: '0x7642Df81b5BEAeEb331cc5A104bd13Ba68c34B91',
        name: 'Celery',
        symbol: 'CLY',
        decimals: 18,
      },
      token1: {
        id: '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04',
        name: 'BCH',
        symbol: 'BCH',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0xe28661783E4993cF5347da8ada1090486BC3ae37': {
      id: 9,
      token0: {
        id: '0x4B85a666deC7C959e88b97814E46113601B07e57',
        name: 'GoCrypto',
        symbol: 'GoC',
        decimals: 18,
      },
      token1: {
        id: '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04',
        name: 'BCH',
        symbol: 'BCH',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0xAc9215e9635CeEFDB508575E3A0926C185CEe667': {
      id: 10,
      token0: {
        id: '0x9192940099fDB2338B928DE2cad9Cd1525fEa881',
        name: 'BCHPad',
        symbol: 'BPAD',
        decimals: 18,
      },
      token1: {
        id: '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04',
        name: 'BCH',
        symbol: 'BCH',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x6aB798bF278Ae1DC1D0427A90A7Ce037D73e2A72': {
      id: 11,
      token0: {
        id: '0x0b00366fBF7037E9d75E4A569ab27dAB84759302',
        name: 'LAW',
        symbol: 'LAW',
        decimals: 18,
      },
      token1: {
        id: '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04',
        name: 'BCH',
        symbol: 'BCH',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x0246111BcC93D76Cd8483033a835adDAaaea19E9': {
      id: 12,
      token0: {
        id: '0x3d13DaFcCA3a188DB340c81414239Bc2be312Ec9',
        name: 'AxieBCH',
        symbol: 'AXIEBCH',
        decimals: 18,
      },
      token1: {
        id: '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04',
        name: 'BCH',
        symbol: 'BCH',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0xcb05D97253D9730d5cDbC24cB477964bb87a2C4f': {
      id: 13,
      token0: {
        id: '0xca0235058985fcc1839e9e37c10900a73c126708',
        name: 'DAO',
        symbol: 'DAO',
        decimals: 18,
      },
      token1: {
        id: '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04',
        name: 'BCH',
        symbol: 'BCH',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x1C8291Ed27D736A8642c019421840bc7C3081EC7': {
      id: 14,
      token0: {
        id: '0x98Dd7eC28FB43b3C4c770AE532417015fa939Dd3',
        name: 'FLEX Coin',
        symbol: 'FLEX',
        decimals: 18,
      },
      token1: {
        id: '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04',
        name: 'BCH',
        symbol: 'BCH',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x8E6C07bF179a50d266BD9980703da3fFdF36F7b5': {
      id: 15,
      token0: {
        id: '0x9288df32951386A8254aEaF80a66B78cCaf75b82',
        name: 'Smart BUSD',
        symbol: 'sBUSD',
        decimals: 2,
      },
      token1: {
        id: '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04',
        name: 'BCH',
        symbol: 'BCH',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x06Bb1466D3146D2A0c01c866F5371444b655E26e': {
      id: 16,
      token0: {
        id: '0x6732E55Ac3ECa734F54C26Bd8DF4eED52Fb79a6E',
        name: 'Joystick.club',
        symbol: 'JOY',
        decimals: 18,
      },
      token1: {
        id: '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04',
        name: 'BCH',
        symbol: 'BCH',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x2006661B99Eaee057604f30B83bBDfCa6908bA3c': {
      id: 17,
      token0: {
        id: '0xe11829a7d5d8806bb36e118461a1012588fafd89',
        name: 'SPICE',
        symbol: 'SPICE',
        decimals: 18,
      },
      token1: {
        id: '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04',
        name: 'BCH',
        symbol: 'BCH',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
  },
}
