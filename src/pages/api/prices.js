const Web3 = require('web3')
const { default: axios } = require('axios')
import IUniswapV2PairABI from '../../constants/abis/uniswap-v2-pair.json'
const NETWORK_URL = 'https://moeing.tech:9545'
const web3 = new Web3(NETWORK_URL)

export default async function handler(req, res) {
  let bchFLEXUSDContract = new web3.eth.Contract(IUniswapV2PairABI, '0x6bE8ec1e1398c7aaE1F075601A92643AFdfe3Abb')
  const bchFLEXUSDReserves = await bchFLEXUSDContract.methods.getReserves().call()

  const bchFLEXUSDPrice = (Number(bchFLEXUSDReserves.reserve1) / Number(bchFLEXUSDReserves.reserve0) ) / 1e18

  let emberBCHContract = new web3.eth.Contract(IUniswapV2PairABI, '0x11dcfD25bda4fb21Df3171493ed77Ec176d11983')
  const emberBCHReserves = await emberBCHContract.methods.getReserves().call()

  const emberBCHPrice = Number(emberBCHReserves.reserve1) / Number(emberBCHReserves.reserve0)

  let fireBCHContract = new web3.eth.Contract(IUniswapV2PairABI, '0x6ed8DcB768472207984f28811231010ac269C826')
  const fireBCHReserves = await fireBCHContract.methods.getReserves().call()

  const fireBCHPrice = Number(fireBCHReserves.reserve0) / Number(fireBCHReserves.reserve1)

  let ret = {}
  ret['bch'] = bchFLEXUSDPrice
  ret['ember'] = emberBCHPrice * bchFLEXUSDPrice
  ret['fire'] = fireBCHPrice * bchFLEXUSDPrice
  ret['flexusd'] = 1

  res.status(200).json(ret)
}
