const Web3 = require('web3')
const { default: axios } = require('axios')
import IUniswapV2PairABI from '../../constants/abis/uniswap-v2-pair.json'
const NETWORK_URL = 'https://smartbch.greyh.at'
const web3 = new Web3(NETWORK_URL)

export default async function handler(req, res) {
  let bchFLEXUSDContract = new web3.eth.Contract(IUniswapV2PairABI, '0xfAe17176ACc70D8B3D51EE6B1978889A0fb6bBd4')
  const bchFLEXUSDReserves = await bchFLEXUSDContract.methods.getReserves().call()

  const bchFLEXUSDPrice = (Number(bchFLEXUSDReserves.reserve1) / Number(bchFLEXUSDReserves.reserve0) ) / 1e18

  let emberBCHContract = new web3.eth.Contract(IUniswapV2PairABI, '0x52c656FaF57DCbDdDd47BCbA7b2ab79e4c232C28')
  const emberBCHReserves = await emberBCHContract.methods.getReserves().call()

  const emberBCHPrice = Number(emberBCHReserves.reserve1) / Number(emberBCHReserves.reserve0)

  let fireBCHContract = new web3.eth.Contract(IUniswapV2PairABI, '0x31361009c8b43Bc44721dc38699511122436b55B')
  const fireBCHReserves = await fireBCHContract.methods.getReserves().call()

  const fireBCHPrice = Number(fireBCHReserves.reserve0) / Number(fireBCHReserves.reserve1)

  let ret = {}
  ret['bch'] = bchFLEXUSDPrice
  ret['ember'] = emberBCHPrice * bchFLEXUSDPrice
  ret['fire'] = fireBCHPrice * bchFLEXUSDPrice
  ret['flexusd'] = 1

  res.status(200).json(ret)
}
