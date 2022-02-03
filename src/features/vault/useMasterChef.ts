import { useActiveWeb3React, useEmberDistributorContract, useEmberVaultContract } from '../../hooks'

import { BigNumber } from '@ethersproject/bignumber'
import { Zero } from '@ethersproject/constants'
import { useCallback } from 'react'
import { getGasPrice } from '../../constants'

export default function useMasterChef() {

  const contract = useEmberVaultContract()

  // Deposit
  const deposit = useCallback(
    async (pid: number, amount: BigNumber) => {
      try {
        debugger;
        return await contract?.deposit(pid, amount.toString(), {
          gasPrice: getGasPrice(),
        });
      } catch (e) {
        console.error(e)
        return e
      }
    },
    [contract]
  )

  // Withdraw
  const withdraw = useCallback(
    async (pid: number, amount: BigNumber) => {
      try {
        return await contract?.withdraw(pid, amount, {
          gasPrice: getGasPrice(),
        });
      } catch (e) {
        console.error(e)
        return e
      }
    },
    [contract]
  )

  const harvest = useCallback(
    async (pid: number) => {
      try {
        return await contract?.deposit(pid, Zero, {
          gasPrice: getGasPrice(),
        });
      } catch (e) {
        console.error(e)
        return e
      }
    },
    [contract]
  )

  return { deposit, withdraw, harvest }
}
