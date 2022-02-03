import { useLockerContract, useTokenContract } from '../../hooks'
import { BigNumber } from '@ethersproject/bignumber'
import { Zero } from '@ethersproject/constants'
import { useCallback } from 'react'
import { useToken } from '../../hooks/Tokens'
import { getGasPrice } from '../../constants'

export default function useLocker() {
  const contract = useLockerContract()
  const tokenContract = useTokenContract()

  const lockTokens = useCallback(
    async (token: string, withdrawer: string, amount: BigNumber, unlockTimestamp: string) => {
      try {
        return await contract?.lockTokens(token, withdrawer, amount.toString(), unlockTimestamp, {
          value: '100000000000000000',
          gasPrice: getGasPrice(),
        })
      } catch (e) {
        console.error(e)
        return e
      }
    },
    [contract]
  )

  const withdrawTokens = useCallback(
    async (id: string) => {
      try {
        return await contract?.withdrawTokens(id, { gasPrice: getGasPrice(), })
      } catch (e) {
        console.error(e)
        return e
      }
    },
    [contract]
  )

  const getLockersByTokenAddress = useCallback(
    async (token: string) => {
      try {
        const lockersIds = await contract?.getDepositsByTokenAddress(token)
        const result = []
        if (lockersIds.length > 0) {
          for (const id of lockersIds) {
            const lockerInfo = await contract?.lockedToken(id.toString())
            result.push({ id, ...lockerInfo })
          }
        }
        return result
      } catch (e) {
        console.error(e)
        return e
      }
    },
    [contract, tokenContract]
  )

  return { lockTokens, getLockersByTokenAddress, withdrawTokens }
}
