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
        id: '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04',
        name: 'BCH',
        symbol: 'BCH',
        decimals: 18,
      },
      token1: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0xbea5b2FDC61D74863148aa393EC8b4671C3e94d3': {
      id: 1,
      token0: {
        id: '0x225FCa2A940cd5B18DFb168cD9B7f921C63d7B6E',
        name: 'Incinerate',
        symbol: 'FIRE',
        decimals: 18,
      },
      token1: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
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
        name: 'flexUSD',
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
        id: '0x7b2B3C5308ab5b2a1d9a94d20D35CCDf61e05b72',
        name: 'flexUSD',
        symbol: 'FLEXUSD',
        decimals: 18,
      },
      token1: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
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
        name: 'flexUSD',
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
    '0xAa4D901dcda2098496e91b5F2b82F077D90E40B6': {
      id: 18,
      token0: {
        id: '0x35b3Ee79E1A7775cE0c11Bd8cd416630E07B0d6f',
        name: 'Bitcoin Cash Name Service',
        symbol: 'LNS',
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
    '0xa968d4831a1ea4150621361c9A02c0Ad81A024a5': {
      id: 19,
      token0: {
        id: '0x288B6Ca2eFCF39C9B68052B0088A0cB3f3D3B5f2',
        name: 'PandaToken',
        symbol: 'PDA',
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
    '0x79Ec4Cf024d7d52aDdA4DCeCA36EEa42DE05CB90': {
      id: 20,
      token0: {
        id: '0xE1E655BE6F50344e6dd708c27BD8D66492d6ecAf',
        name: 'LAW US Dollar',
        symbol: 'lawUSD',
        decimals: 18,
      },
      token1: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x788ED090e60dD02b1C6bfD20D54F4208f6ca424b': {
      id: 21,
      token0: {
        id: '0x265bD28d79400D55a1665707Fa14A72978FA6043',
        name: 'CashCats',
        symbol: '$CATS',
        decimals: 2,
      },
      token1: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0xC34CaE05720728483e7325832FabD06eC3f36437': {
      id: 22,
      token0: {
        id: '0x7642Df81b5BEAeEb331cc5A104bd13Ba68c34B91',
        name: 'Celery',
        symbol: 'CLY',
        decimals: 18,
      },
      token1: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x6eB725397639abaFD30571ec2620554F18509478': {
      id: 23,
      token0: {
        id: '0x4B85a666deC7C959e88b97814E46113601B07e57',
        name: 'GoCrypto',
        symbol: 'GoC',
        decimals: 18,
      },
      token1: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0xa3429462ca156f99401aC16BFF8B4aCff935d99e': {
      id: 24,
      token0: {
        id: '0x288B6Ca2eFCF39C9B68052B0088A0cB3f3D3B5f2',
        name: 'PandaToken',
        symbol: 'PDA',
        decimals: 18,
      },
      token1: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x016c22D9F538335BAf94De31e96D42A910A9d37E': {
      id: 25,
      token0: {
        id: '0x0b00366fBF7037E9d75E4A569ab27dAB84759302',
        name: 'LAW',
        symbol: 'LAW',
        decimals: 18,
      },
      token1: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0xbAf80f70d8D13b980E6774eEa9CCf9E9bD66432B': {
      id: 26,
      token0: {
        id: '0x6732E55Ac3ECa734F54C26Bd8DF4eED52Fb79a6E',
        name: 'Joystick.club',
        symbol: 'JOY',
        decimals: 18,
      },
      token1: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x875E15462DfF9Ad28fd712df674bf7316302cd9b': {
      id: 27,
      token0: {
        id: '0x35b3Ee79E1A7775cE0c11Bd8cd416630E07B0d6f',
        name: 'Bitcoin Cash Name Service',
        symbol: 'LNS',
        decimals: 18,
      },
      token1: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x181abB62Bbbfa20D2a2b7e3b50c22250698E2F7e': {
      id: 28,
      token0: {
        id: '0x98Dd7eC28FB43b3C4c770AE532417015fa939Dd3',
        name: 'FLEX Coin',
        symbol: 'FLEX',
        decimals: 18,
      },
      token1: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x024dce3f96E7fF9eb38B2d9b584801c56Fc24499': {
      id: 29,
      token0: {
        id: '0x9288df32951386A8254aEaF80a66B78cCaf75b82',
        name: 'Smart BUSD',
        symbol: 'sBUSD',
        decimals: 2,
      },
      token1: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x3b2E5a87f4A8175006EF012d625ce28dD86F96f0': {
      id: 30,
      token0: {
        id: '0xe11829a7d5d8806bb36e118461a1012588fafd89',
        name: 'SPICE',
        symbol: 'SPICE',
        decimals: 18,
      },
      token1: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x97dEAeB1A9A762d97Ac565cD3Ff7629CD6d55D09': {
      id: 31,
      token0: {
        id: '0xF05bD3d7709980f60CD5206BddFFA8553176dd29',
        name: 'SmartIndex',
        symbol: 'SIDX',
        decimals: 18,
      },
      token1: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0xa9b605087730D9d91C7Ff284a0F5C4B90a9E6297': {
      id: 32,
      token0: {
        id: '0x9192940099fDB2338B928DE2cad9Cd1525fEa881',
        name: 'BCHPad',
        symbol: 'BPAD',
        decimals: 18,
      },
      token1: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x28E0289B3693D6941Ce79C121214891c826c7916': {
      id: 33,
      token0: {
        id: '0x56381cB87C8990971f3e9d948939e1a95eA113a3',
        name: 'Goblins',
        symbol: 'GOB',
        decimals: 9,
      },
      token1: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x66e52CE528208ab87aF830831DddB3B53019FB18': {
      id: 34,
      token0: {
        id: '0x4ee06d0486ced674E75Ed9e521725580e8ffDA21',
        name: 'LAW Entropy',
        symbol: 'LAWETP',
        decimals: 18,
      },
      token1: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x3E11B8B814E8f87b4811E97C948dDAf6b5db2092': {
      id: 35,
      token0: {
        id: '0xBc9bD8DDe6C5a8e1CBE293356E02f5984693b195',
        name: 'BlockNG-Peg BCH Token',
        symbol: 'bcBCH',
        decimals: 18,
      },
      token1: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x3239C9d03690aF63Da758A36A4a14E6B36Dc091f': {
      id: 36,
      token0: {
        id: '0xBc2F884680c95A02cea099dA2F524b366d9028Ba',
        name: 'BlockNG-Peg USDT Token',
        symbol: 'bcUSDT',
        decimals: 18,
      },
      token1: {
        id: '0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
  },
  [ChainId.SMARTBCH_TESTNET]: {
    '0x790Fb0Cda5920cAe32afE598fDB3746F8d610f59':{
      id: 0,
      token0: {
        id: '0xa10da28C8D63473fD2bE8df9C37A628A188F43ea',
        name: 'Incinerate',
        symbol: 'FIRE',
        decimals: 18,
      },
      token1: {
        id: '0x217057A8B0bDEb160829c19243A2E03bfe95555a',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0xa54324824FCfFc7BE979d0E0baBfD012c01b1BA9':{
      id: 1,
      token0: {
        id: '0x17F4FCF5b6E0A95D4eE331c8529041896A073F9b',
        name: 'Wrapped BCH',
        symbol: 'WBCH',
        decimals: 18,
      },
      token1: {
        id: '0x217057A8B0bDEb160829c19243A2E03bfe95555a',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x69653965cc6466c21d3a7dD3BD536b732922C9C9':{
      id: 2,
      token0: {
        id: '0x7b2B3C5308ab5b2a1d9a94d20D35CCDf61e05b72',
        name: 'flexUSD',
        symbol: 'FLEXUSD',
        decimals: 18,
      },
      token1: {
        id: '0x217057A8B0bDEb160829c19243A2E03bfe95555a',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x127129A176C9BaB3f3bfe6040aaF2450d19958bB':{
      id: 3,
      token0: {
        id: '0xd0526C977374F2501173B6E80E8bC0197e70875F',
        name: 'flexUSD',
        symbol: 'FLEXUSD',
        decimals: 18,
      },
      token1: {
        id: '0x217057A8B0bDEb160829c19243A2E03bfe95555a',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
    '0x173B094709B232b45234e8e4b25d44ecb19fa717':{
      id: 4,
      token0: {
        id: '0xa10da28C8D63473fD2bE8df9C37A628A188F43ea',
        name: 'Incinerate',
        symbol: 'FIRE',
        decimals: 18,
      },
      token1: {
        id: '0x217057A8B0bDEb160829c19243A2E03bfe95555a',
        name: 'Ember',
        symbol: 'EMBER',
        decimals: 18,
      },
      name: 'Ember-LP',
      symbol: 'EMBER-LP',
    },
  },
}
