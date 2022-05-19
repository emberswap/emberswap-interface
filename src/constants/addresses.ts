import { ChainId } from '../sdk'

type AddressMap = { [chainId: number]: string }

export const TIMELOCK_ADDRESS = '0x1a9C8182C09F50C8318d769245beA52c32BE35BC'
export const FAUCET_ADDRESS = '0x5aec27384DbE84d46C29A20DFeFF09493711CD15'

export const LOCKER_ADDRESS: AddressMap = {
  [ChainId.ROPSTEN]: '',
  [ChainId.BSC]: '',
  [ChainId.MOONRIVER]: '0xA9Ead5d7C9D0B59A2900824A125F3913009fD638',
  [ChainId.SMARTBCH]: '0xd9647E506Da0865f9a4E70fBD0aDA55b2B89E5b1',
  [ChainId.SMARTBCH_TESTNET]: '0x0714b92E09f198e53B632EbC46c78BDABE1DAd1c',
}

export const EMBER_DISTRIBUTOR_ADDRESS: AddressMap = {
  [ChainId.ROPSTEN]: '',
  [ChainId.BSC]: '',
  [ChainId.MOONRIVER]: '0xf03b75831397D4695a6b9dDdEEA0E578faa30907',
  [ChainId.SMARTBCH]: '0x8ecb32C33AB3f7ee3D6Ce9D4020bC53fecB36Be9',
  [ChainId.SMARTBCH_TESTNET]: '0xFFbE92fDA81f853bcf00d3c7686d5DAd5A6600bB',
}

export const EMBER_VAULT_ADDRESS: AddressMap = {
  [ChainId.MOONRIVER]: '0x7e6E03822D0077F3C417D33caeAc900Fc2645679',
  [ChainId.SMARTBCH]: '0xFFbE92fDA81f853bcf00d3c7686d5DAd5A6600bB',
  [ChainId.SMARTBCH_TESTNET]: '0xe5aFde6eD9E2aa69B1D7247E406399CBf26d7578',
}

export const EMBER_BCH_PAIR: AddressMap = {
  [ChainId.ROPSTEN]: '',
  [ChainId.BSC]: '',
  [ChainId.MOONRIVER]: '0x7eDA899b3522683636746a2f3a7814e6fFca75e1',
  [ChainId.SMARTBCH]: '0x52c656FaF57DCbDdDd47BCbA7b2ab79e4c232C28',
  [ChainId.SMARTBCH_TESTNET]: '0xa54324824FCfFc7BE979d0E0baBfD012c01b1BA9',
}

export const BCH_FLEXUSD_PAIR: AddressMap = {
  [ChainId.ROPSTEN]: '',
  [ChainId.BSC]: '',
  [ChainId.MOONRIVER]: '0xe537f70a8b62204832B8Ba91940B77d3f79AEb81',
  [ChainId.SMARTBCH]: '0xfAe17176ACc70D8B3D51EE6B1978889A0fb6bBd4',
  [ChainId.SMARTBCH_TESTNET]: '0x3EDe345eF7DfA6Ad58af1d375020b6C52100bdC3',
}

export const FIRE_BCH_PAIR: AddressMap = {
  [ChainId.ROPSTEN]: '',
  [ChainId.BSC]: '',
  [ChainId.MOONRIVER]: '0x0acDB54E610dAbC82b8FA454b21AD425ae460DF9',
  [ChainId.SMARTBCH]: '0x31361009c8b43Bc44721dc38699511122436b55B',
  [ChainId.SMARTBCH_TESTNET]: '0x3a71dC1Aa2C8C6FE3dCd76422Ecfc9cc798FF47E',
}

export const BNB_USD_PAIR: AddressMap = {
  [ChainId.ROPSTEN]: '',
  [ChainId.BSC]: '',
  [ChainId.MOONRIVER]: '',
  [ChainId.SMARTBCH]: '',
  [ChainId.SMARTBCH_TESTNET]: '',
}

export const ARCHER_ROUTER_ADDRESS: AddressMap = {
  [ChainId.MAINNET]: '0x9917C083FF9FbD29Df1367FBF7F2388A9a202431',
}

export const MINICHEF_ADDRESS: AddressMap = {
  [ChainId.MATIC]: '0x0769fd68dFb93167989C6f7254cd0D766Fb2841F',
  [ChainId.XDAI]: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
  [ChainId.HARMONY]: '0x67dA5f2FfaDDfF067AB9d5F025F8810634d84287',
}

export const MASTERCHEF_V2_ADDRESS: AddressMap = {
  [ChainId.MAINNET]: '0xEF0881eC094552b2e128Cf945EF17a6752B4Ec5d',
}

export const ZAPPER_ADDRESS: AddressMap = {
  [ChainId.MAINNET]: '0xcff6eF0B9916682B37D80c19cFF8949bc1886bC2',
  [ChainId.ROPSTEN]: '0xcff6eF0B9916682B37D80c19cFF8949bc1886bC2',
  [ChainId.SMARTBCH]: '0xcff6eF0B9916682B37D80c19cFF8949bc1886bC2',
  [ChainId.SMARTBCH_TESTNET]: '0xcff6eF0B9916682B37D80c19cFF8949bc1886bC2',
}

// TODO: specify merkle distributor for mainnet
export const MERKLE_DISTRIBUTOR_ADDRESS: AddressMap = {
  [ChainId.MAINNET]: '0xcBE6B83e77cdc011Cc18F6f0Df8444E5783ed982',
  [ChainId.ROPSTEN]: '0x84d1f7202e0e7dac211617017ca72a2cb5e2b955',
}

export const MULTICALL2_ADDRESS: AddressMap = {
  [ChainId.MAINNET]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.ROPSTEN]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.RINKEBY]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.GÖRLI]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.KOVAN]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.ARBITRUM]: '0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB',
  [ChainId.ARBITRUM_TESTNET]: '0xa501c031958F579dB7676fF1CE78AD305794d579',
  [ChainId.CELO]: '0x9aac9048fC8139667D6a2597B902865bfdc225d3',
  [ChainId.FANTOM]: '0x22D4cF72C45F8198CfbF4B568dBdB5A85e8DC0B5',
  [ChainId.FANTOM_TESTNET]: '',
  [ChainId.MATIC]: '0x02817C1e3543c2d908a590F5dB6bc97f933dB4BD',
  [ChainId.MATIC_TESTNET]: '',
  [ChainId.XDAI]: '0x67dA5f2FfaDDfF067AB9d5F025F8810634d84287',
  [ChainId.BSC]: '0xa9193376D09C7f31283C54e56D013fCF370Cd9D9',
  [ChainId.BSC_TESTNET]: '0xA6949B8FBa9DF546b9c66F98CFCa960A96E3b68e',
  [ChainId.MOONBEAM_TESTNET]: '',
  [ChainId.MOONRIVER]: '0x43D002a2B468F048028Ea9C2D3eD4705a94e68Ae',
  [ChainId.SMARTBCH]: '0x20F9f219743556c06D2205F92548278CEd14A38B',
  [ChainId.SMARTBCH_TESTNET]: '0x10334769312D07dadF40bDd2217EFCae80E77910',
  [ChainId.AVALANCHE]: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
  [ChainId.AVALANCHE_TESTNET]: '',
  [ChainId.HECO]: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
  [ChainId.HECO_TESTNET]: '',
  [ChainId.HARMONY]: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
  [ChainId.HARMONY_TESTNET]: '',
  [ChainId.OKEX]: '0xF4d73326C13a4Fc5FD7A064217e12780e9Bd62c3',
  [ChainId.OKEX_TESTNET]: '',
}

export const WETH9: AddressMap = {
  [ChainId.MAINNET]: '',
  [ChainId.ROPSTEN]: '',
  [ChainId.RINKEBY]: '',
  [ChainId.GÖRLI]: '',
  [ChainId.KOVAN]: '',
  [ChainId.ARBITRUM]: '',
  [ChainId.ARBITRUM_TESTNET]: '',
  [ChainId.CELO]: '',
  [ChainId.FANTOM]: '',
  [ChainId.FANTOM_TESTNET]: '',
  [ChainId.MATIC]: '',
  [ChainId.MATIC_TESTNET]: '',
  [ChainId.XDAI]: '',
  [ChainId.BSC]: '',
  [ChainId.BSC_TESTNET]: '',
  [ChainId.MOONBEAM_TESTNET]: '',
  [ChainId.MOONRIVER]: '0x98878B06940aE243284CA214f92Bb71a2b032B8A',
  [ChainId.SMARTBCH]: '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04',
  [ChainId.SMARTBCH_TESTNET]: '0x17F4FCF5b6E0A95D4eE331c8529041896A073F9b',
  [ChainId.AVALANCHE]: '',
  [ChainId.AVALANCHE_TESTNET]: '',
  [ChainId.HECO]: '',
  [ChainId.HECO_TESTNET]: '',
  [ChainId.HARMONY]: '',
  [ChainId.HARMONY_TESTNET]: '',
  [ChainId.OKEX]: '',
  [ChainId.OKEX_TESTNET]: '',
}

export const WNATIVE: AddressMap = {
  [ChainId.MAINNET]: '',
  [ChainId.ROPSTEN]: '',
  [ChainId.RINKEBY]: '',
  [ChainId.GÖRLI]: '',
  [ChainId.KOVAN]: '',
  [ChainId.ARBITRUM]: '',
  [ChainId.ARBITRUM_TESTNET]: '',
  [ChainId.CELO]: '',
  [ChainId.FANTOM]: '',
  [ChainId.FANTOM_TESTNET]: '',
  [ChainId.MATIC]: '',
  [ChainId.MATIC_TESTNET]: '',
  [ChainId.XDAI]: '',
  [ChainId.BSC]: '',
  [ChainId.BSC_TESTNET]: '',
  [ChainId.MOONBEAM_TESTNET]: '',
  [ChainId.MOONRIVER]: '0x98878B06940aE243284CA214f92Bb71a2b032B8A',
  [ChainId.SMARTBCH]: '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04',
  [ChainId.SMARTBCH_TESTNET]: '0x17F4FCF5b6E0A95D4eE331c8529041896A073F9b',
  [ChainId.AVALANCHE]: '',
  [ChainId.AVALANCHE_TESTNET]: '',
  [ChainId.HECO]: '',
  [ChainId.HECO_TESTNET]: '',
  [ChainId.HARMONY]: '',
  [ChainId.HARMONY_TESTNET]: '',
  [ChainId.OKEX]: '',
  [ChainId.OKEX_TESTNET]: '',
}
