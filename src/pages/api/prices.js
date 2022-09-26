const Web3 = require('web3')
const { default: axios } = require('axios')
import IUniswapV2PairABI from '../../constants/abis/uniswap-v2-pair.json'
var NETWORK_URL = 'https://global.uat.cash'
var web3 = new Web3(NETWORK_URL)

export default async function handler(req, res) {
  let bchFLEXUSDContract = await new web3.eth.Contract(IUniswapV2PairABI, '0xfAe17176ACc70D8B3D51EE6B1978889A0fb6bBd4')
  var bchFLEXUSDReserves = await bchFLEXUSDContract.methods.getReserves().call()

  var bchFLEXUSDPrice = await (Number(bchFLEXUSDReserves.reserve1) / Number(bchFLEXUSDReserves.reserve0) ) / 1e18

  let emberBCHContract = await new web3.eth.Contract(IUniswapV2PairABI, '0x52c656FaF57DCbDdDd47BCbA7b2ab79e4c232C28')
  var emberBCHReserves = await emberBCHContract.methods.getReserves().call()

  var emberBCHPrice = await Number(emberBCHReserves.reserve1) / Number(emberBCHReserves.reserve0)

  let fireBCHContract = await new web3.eth.Contract(IUniswapV2PairABI, '0x31361009c8b43Bc44721dc38699511122436b55B')
  var fireBCHReserves = await fireBCHContract.methods.getReserves().call()

  var fireBCHPrice = await Number(fireBCHReserves.reserve0) / Number(fireBCHReserves.reserve1)

  let ret = {}
  ret['bch'] = bchFLEXUSDPrice
  ret['ember'] = emberBCHPrice * bchFLEXUSDPrice
  ret['fire'] = fireBCHPrice * bchFLEXUSDPrice
  ret['flexusd'] = 1

  if (bchFLEXUSDPrice <= 0)
  {
    NETWORK_URL = 'https://moeing.tech:9545'
    web3 = new Web3(NETWORK_URL)
     bchFLEXUSDContract = await new web3.eth.Contract(IUniswapV2PairABI, '0x3EDe345eF7DfA6Ad58af1d375020b6C52100bdC3')
     bchFLEXUSDReserves = await bchFLEXUSDContract.methods.getReserves().call()
  
     bchFLEXUSDPrice = await (Number(bchFLEXUSDReserves.reserve1) / Number(bchFLEXUSDReserves.reserve0) ) / 1e18
  
     emberBCHContract = await new web3.eth.Contract(IUniswapV2PairABI, '0xa54324824FCfFc7BE979d0E0baBfD012c01b1BA9')
     emberBCHReserves = await emberBCHContract.methods.getReserves().call()
  
     emberBCHPrice = await Number(emberBCHReserves.reserve1) / Number(emberBCHReserves.reserve0)
  
     fireBCHContract = await new web3.eth.Contract(IUniswapV2PairABI, '0x3a71dC1Aa2C8C6FE3dCd76422Ecfc9cc798FF47E')
     fireBCHReserves = await fireBCHContract.methods.getReserves().call()
  
     fireBCHPrice = await Number(fireBCHReserves.reserve0) / Number(fireBCHReserves.reserve1)
  
    let ret = {}
    ret['bch'] = bchFLEXUSDPrice
    ret['ember'] = emberBCHPrice * bchFLEXUSDPrice
    ret['fire'] = fireBCHPrice * bchFLEXUSDPrice
    ret['flexusd'] = 1
  }
  res.status(200).json(ret)
}
