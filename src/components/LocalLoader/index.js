import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import Image from '../Image'
import { useMedia } from 'react-use'

const pulse = keyframes`
  0% { transform: scale(1); }
  60% { transform: scale(1.1); }
  100% { transform: scale(1); }
`

const Wrapper = styled.div`
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  ${(props) =>
    props.fill && !props.height
      ? css`
          height: 100vh;
        `
      : css`
          height: 180px;
        `}
`

const AnimatedImg = styled.div`
  animation: ${pulse} 800ms linear infinite;
  & > * {
    width: 72px;
  }
`

const LocalLoader = ({ fill }) => {
  
  const below1080 = useMedia('(max-width: 1080px)')
  const below600 = useMedia('(max-width: 600px)')
  const Size = below1080 ? "50px" : "100px" 

  return (
    <Wrapper fill={fill}>
      <AnimatedImg>
        <Image src={'/ember.svg'} alt="loading-icon" width={Size} height={Size} />
      </AnimatedImg>
    </Wrapper>
  )
}

export default LocalLoader