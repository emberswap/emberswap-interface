import Button, { ButtonProps } from '../Button'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'

import { Activity } from 'react-feather'
import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useWalletModalToggle } from '../../state/application/hooks'
import { useRouter } from 'next/router'
import { SUPPORTED_NETWORKS } from '../../modals/ChainModal'
import { ChainId } from '../../sdk'
import cookie from 'cookie-cutter'
import { useActiveWeb3React } from '../../hooks'
import * as deviceInfo from 'react-device-detect'
import useInstructionModal from '../../modals/InstructionModal/useInstuctionModal'
import InstructionModal from '../../modals/InstructionModal'

const NetworkIcon = styled(Activity)`
  width: 16px;
  height: 16px;
`
const SwitchNetworkTo = async () => {
  // `library` context here is invalid, we use the direct communiaction with Metamask via window.ethereum
  const params = SUPPORTED_NETWORKS[ChainId.SMARTBCH]
  cookie.set('chainId', ChainId.SMARTBCH)

  const ethereum = window.ethereum as any;
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [ { chainId: params.chainId } ],
    });
  } catch (switchError: any) {
    console.log(switchError);
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [ params ],
        });
      } catch (addError) {
        console.log(addError);
        // handle adding network error
        throw addError;
      }
    } else {
      // handle other "switch" errors
      throw switchError;
    }
  }
}

export default function Web3Connect({ color = 'gray', size = 'sm', className = '', ...rest }: ButtonProps) {
  const { i18n } = useLingui()
  const toggleWalletModal = useWalletModalToggle()
  const { error } = useWeb3React()
  const { route } = useRouter();
  
  const { isInstructionModalOpen, setInstructionModalOpen, onInstructionModalDismiss } = useInstructionModal()

  const handleConnectBtnClick = useCallback(() => {
    if (!window.ethereum) {
      setInstructionModalOpen(true)
      if (!window.ethereum && deviceInfo.isMobile){
        setInstructionModalOpen(false)
        toggleWalletModal()
        return
      }
      return
    }

    toggleWalletModal()
  }, [setInstructionModalOpen, toggleWalletModal])

  const pluginSupportInfo = useMemo(() => {
    if (!deviceInfo.isDesktop) {
      return null
        }

    if (deviceInfo.isFirefox) {
      return { url: 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/' }
    }

    if (deviceInfo.isChrome) {
      return { url: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn' }
    }

    if (deviceInfo.isEdge) {
      return { url: 'https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm' }
    }
    return null
  }, [])

  return error ?  (
       <div> 
<Button
    variant="outlined"
    color="gradient"            
    onClick={SwitchNetworkTo}   
    className="flex items-center w-full text-sm justify-center px-4 py-2 text-black bg-opacity-80 hover:bg-opacity-100"
    size={size}
    {...rest}
  >
  <div className="mr-1">
    <NetworkIcon />
  </div>
    {i18n._(t`Switch to SmartBCH`)}
  </Button></div>
  ) : (
<>
      <Button
        id="connect-wallet"
        onClick={handleConnectBtnClick}
        variant="outlined"
        color={color}
        className={className}
        size={size}
        {...rest}
      >
        {i18n._(t`Connect to a wallet`)}
      </Button>
      <InstructionModal
        isOpen={isInstructionModalOpen}
        onDismiss={onInstructionModalDismiss}
        instruction={
          <div>
            {pluginSupportInfo ? (
              <>
                <p>
                  {i18n._(t`Your browser is supported, but first you need to install`)}
                  <a className="text-blue" href={pluginSupportInfo.url} rel="noreferrer" target="_blank">
                    {' '}
                    {t`MetaMask`}
                  </a>
                </p>
              </>
            ) : (
              <>
                {i18n._(t`Your browser is not supported, please install`)}{' '}
                <a className="text-blue" href="https://metamask.io/">
                  {i18n._(t`MetaMask`)}
                </a>
              </>
            )}
          </div>
        }
      />
    </>
  )
}
