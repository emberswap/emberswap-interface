const Web3 = require('web3')
import distributorAbi from '../../constants/abis/ember-distributor.json'
import pairAbi from '../../constants/abis/uniswap-v2-pair.json'
import { POOLS } from '../../constants/farms'
import { ChainId } from '../../sdk'

var NETWORK_URL = 'https://smartbch.fountainhead.cash/mainnet'
var web3 = new Web3(NETWORK_URL)

export default async function handler(req, res) {
  const ret = await farms()
  res.status(200).json(ret)
}

let farmsResult = null

export async function farms() {
  if (!farmsResult) {
    let distributorContract = new web3.eth.Contract(distributorAbi, '0x8ecb32C33AB3f7ee3D6Ce9D4020bC53fecB36Be9')
    const poolLength = await distributorContract.methods.poolLength().call()

    const forHelper = []
    for (let index = 0; index < poolLength; index++) {
      forHelper.push(index)
    }

    const poolsInfo = []
    const poolsInfoPromises = []

    for (const poolIndex of forHelper) {
      poolsInfoPromises.push(distributorContract.methods.poolInfo(poolIndex).call())
    }

    const poolInfosResult = await Promise.all(poolsInfoPromises)
    poolInfosResult.forEach((poolInfo) => {
      poolsInfo.push({
        ...poolInfo,
      })
    })

    const ret = []
    const poolStaticInfo = POOLS[ChainId.SMARTBCH]

    for (const pool of poolsInfo) {
      const staticInfo = poolStaticInfo[web3.utils.toChecksumAddress(pool.lpToken)]

      if (!staticInfo.token1) {
        ret.push({
          address: staticInfo.token0.id,
          baseSymbol: staticInfo.token0.symbol.toLowerCase().replace('wbch', 'bch'),
          baseAmount: pool.totalLp / 10 ** staticInfo.token0?.decimals,
          single: true,
        })
      } else {
        let lpContract = new web3.eth.Contract(pairAbi, pool.lpToken)
        const promisesCall = [
          lpContract.methods.getReserves().call(),
          lpContract.methods.totalSupply().call(),
          lpContract.methods.token0().call(),
          lpContract.methods.token1().call(),
          lpContract.methods.balanceOf('0x8ecb32C33AB3f7ee3D6Ce9D4020bC53fecB36Be9').call(),
        ]

        const [reserves, totalSupply, token0, token1, distributorBalance] = await Promise.all(promisesCall)
        const distributorRatio = distributorBalance / totalSupply

        const token0info =
          web3.utils.toChecksumAddress(token0) == web3.utils.toChecksumAddress(staticInfo.token0.id)
            ? staticInfo.token0
            : staticInfo.token1
        const token1info =
          web3.utils.toChecksumAddress(token1) == web3.utils.toChecksumAddress(staticInfo.token1.id)
            ? staticInfo.token1
            : staticInfo.token0

        const { reserve0, reserve1 } = reserves
        const token0amount = Number(Number(Number(reserve0) / 10 ** token0info?.decimals).toString()) * distributorRatio
        const token1amount = Number(Number(Number(reserve1) / 10 ** token1info?.decimals).toString()) * distributorRatio

        ret.push({
          address: web3.utils.toChecksumAddress(pool.lpToken),
          baseSymbol:
            token0info.symbol == 'EMBER' || token1info.symbol == 'EMBER'
              ? 'ember'
              : token0info.symbol == 'BCH' || token1info.symbol == 'BCH'
              ? 'bch'
              : token0info.symbol == 'FLEXUSD' || token1info.symbol == 'FLEXUSD'
              ? 'flexusd'
              : '',
          baseAmount:
            token0info.symbol == 'EMBER' || token0info.symbol == 'BCH'
              ? token0amount
              : token1info.symbol == 'EMBER' || token1info.symbol == 'BCH'
              ? token1amount
              : token0info.symbol == 'FLEXUSD'
              ? token0amount
              : token1info.symbol == 'FLEXUSD'
              ? token1amount
              : 0,
          single: false,
        })
      }
    }
    farmsResult = ret;
    return ret;
  }
  if (!farmsResult){
    NETWORK_URL = 'https://moeing.tech:9545'
    web3 = new Web3(NETWORK_URL)
    let distributorContract = new web3.eth.Contract(distributorAbi, '0xFFbE92fDA81f853bcf00d3c7686d5DAd5A6600bB')
    const poolLength = await distributorContract.methods.poolLength().call()

    const forHelper = []
    for (let index = 0; index < poolLength; index++) {
      forHelper.push(index)
    }

    const poolsInfo = []
    const poolsInfoPromises = []

    for (const poolIndex of forHelper) {
      poolsInfoPromises.push(distributorContract.methods.poolInfo(poolIndex).call())
    }

    const poolInfosResult = await Promise.all(poolsInfoPromises)
    poolInfosResult.forEach((poolInfo) => {
      poolsInfo.push({
        ...poolInfo,
      })
    })

    const ret = []
    const poolStaticInfo = POOLS[ChainId.SMARTBCH]

    for (const pool of poolsInfo) {
      const staticInfo = poolStaticInfo[web3.utils.toChecksumAddress(pool.lpToken)]

      if (!staticInfo.token1) {
        ret.push({
          address: staticInfo.token0.id,
          baseSymbol: staticInfo.token0.symbol.toLowerCase().replace('wbch', 'bch'),
          baseAmount: pool.totalLp / 10 ** staticInfo.token0?.decimals,
          single: true,
        })
      } else {
        let lpContract = new web3.eth.Contract(pairAbi, pool.lpToken)
        const promisesCall = [
          lpContract.methods.getReserves().call(),
          lpContract.methods.totalSupply().call(),
          lpContract.methods.token0().call(),
          lpContract.methods.token1().call(),
          lpContract.methods.balanceOf('0xFFbE92fDA81f853bcf00d3c7686d5DAd5A6600bB').call(),
        ]

        const [reserves, totalSupply, token0, token1, distributorBalance] = await Promise.all(promisesCall)
        const distributorRatio = distributorBalance / totalSupply

        const token0info =
          web3.utils.toChecksumAddress(token0) == web3.utils.toChecksumAddress(staticInfo.token0.id)
            ? staticInfo.token0
            : staticInfo.token1
        const token1info =
          web3.utils.toChecksumAddress(token1) == web3.utils.toChecksumAddress(staticInfo.token1.id)
            ? staticInfo.token1
            : staticInfo.token0

        const { reserve0, reserve1 } = reserves
        const token0amount = Number(Number(Number(reserve0) / 10 ** token0info?.decimals).toString()) * distributorRatio
        const token1amount = Number(Number(Number(reserve1) / 10 ** token1info?.decimals).toString()) * distributorRatio

        ret.push({
          address: web3.utils.toChecksumAddress(pool.lpToken),
          baseSymbol:
            token0info.symbol == 'EMBER' || token1info.symbol == 'EMBER'
              ? 'ember'
              : token0info.symbol == 'BCH' || token1info.symbol == 'BCH'
              ? 'bch'
              : token0info.symbol == 'FLEXUSD' || token1info.symbol == 'FLEXUSD'
              ? 'flexusd'
              : '',
          baseAmount:
            token0info.symbol == 'EMBER' || token0info.symbol == 'BCH'
              ? token0amount
              : token1info.symbol == 'EMBER' || token1info.symbol == 'BCH'
              ? token1amount
              : token0info.symbol == 'FLEXUSD'
              ? token0amount
              : token1info.symbol == 'FLEXUSD'
              ? token1amount
              : 0,
          single: false,
        })
      }
    }
    farmsResult = ret;
    return ret;
  }
  else {
    return farmsResult;
  }
}
