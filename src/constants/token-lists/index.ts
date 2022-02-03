const BA_LIST = 'https://raw.githubusercontent.com/The-Blockchain-Association/sec-notice-list/master/ba-sec-list.json'

// used to mark unsupported tokens, these are hosted lists of unsupported tokens
/**
 * @TODO add list from blockchain association
 */
export const UNSUPPORTED_LIST_URLS: string[] = ['https://yearn.science/static/tokenlist.json']

const YEARN_LIST = 'https://yearn.science/static/tokenlist.json'
const NFTX_LIST_V1 = 'https://nftx.ethereumdb.com/v1/tokenlist/'
const NFTX_LIST_V2 = 'https://nftx.ethereumdb.com/v2/tokenlist/'
const SYNTHETIX_LIST = 'synths.snx.eth'
const OPYN_LIST = 'https://raw.githubusercontent.com/opynfinance/opyn-tokenlist/master/opyn-v1.tokenlist.json'
const AAVE_LIST = 'tokenlist.aave.eth'
const CMC_ALL_LIST = 'defi.cmc.eth'
const CMC_STABLECOIN = 'stablecoin.cmc.eth'
const COINGECKO_LIST = 'https://tokens.coingecko.com/uniswap/all.json'
const MARKETCAP_LIST = 'https://raw.githubusercontent.com/emberswap/SmartBCH-Token-List/main/tokens.json'
const COMMUNITY_LIST = 'https://raw.githubusercontent.com/emberswap/emberswap-tokenlist/main/community.tokenlist.json'
const EMBERSWAP_LIST = 'https://raw.githubusercontent.com/emberswap/emberswap-tokenlist/main/emberswap.tokenlist.json'
export const OPTIMISM_LIST = 'https://static.optimism.io/optimism.tokenlist.json'
const ROLL_LIST = 'https://app.tryroll.com/tokens.json'
const SET_LIST = 'https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/set.tokenlist.json'
const UMA_LIST = 'https://umaproject.org/uma.tokenlist.json'
const WRAPPED_LIST = 'wrapped.tokensoft.eth'

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  COMMUNITY_LIST,
  MARKETCAP_LIST,
  // CMC_STABLECOIN,
  // WRAPPED_LIST,
  // YEARN_LIST,
  // UMA_LIST,
  // SYNTHETIX_LIST,
  // NFTX_LIST_V1,
  // NFTX_LIST_V2,
  // SET_LIST,
  // ROLL_LIST,
  // COINGECKO_LIST,
  
  // OPYN_LIST,
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [EMBERSWAP_LIST, COMMUNITY_LIST,...UNSUPPORTED_LIST_URLS]