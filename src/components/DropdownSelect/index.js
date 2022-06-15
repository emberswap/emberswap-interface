import React, { useState } from 'react'
import styled from 'styled-components'

import Row, { RowBetween } from '../Row'
import { AutoColumn } from '../Column'
import { ChevronDown as Arrow } from 'react-feather'

const StyledIcon = styled.div`
  color: #000;
`
const Wrapper = styled.div`
  z-index: 20;
  position: relative;
  width: 100px;
  padding: 4px 10px;
  padding-right: 6px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ open }) => (open ? 'rgb(52 23 23)': 'white')};
  transition: background-color 0.3s ease-in;
  background-color: ${({ open }) => (open ? 'rgb(167 167 167)': 'transparent')};
  border: 1px solid ${({ open, color }) => (open ? color : 'rgba(0, 0, 0, 0.15);')};
  border-bottom-color: ${({ open }) => (open ? 'transparent !important;': 'rgba(0, 0, 0, 0.15)')};
  :hover {
    cursor: pointer;
  border-end-end-radius: ${({ open }) => (open ? '0px !important;': '')};
  border-end-start-radius: ${({ open }) => (open ? '0px !important;': '')};
  }
`

const Dropdown = styled.div`
  position: absolute;
  top: 52px;
  left: -1px;
  padding-top: 40px;
  min-width: calc(103%);
  width: calc(100%);
  background-color: rgb(167 167 167);
  border: 1px solid rgb(236, 112, 36);
  padding: 10px 10px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  color: black;
  transition: color 0.3s ease-in;
  border-start-end-radius: 0px;
  border-start-start-radius: 0px;
  border-top-color: transparent;

  :hover {
    cursor: pointer;
  }
`

const ArrowStyled = styled(Arrow)`
  height: 20px;
  width: 20px;
  margin-left: 6px;
`

const DropdownSelect = ({ options, active, setActive, color }) => {
  const [showDropdown, toggleDropdown] = useState(false)

  return (
    <Wrapper open={showDropdown} color={color}>
      <RowBetween onClick={() => toggleDropdown(!showDropdown)} justify="center">
        <a>{active}</a>
        <StyledIcon>
          <ArrowStyled />
        </StyledIcon>
      </RowBetween>
      {showDropdown && (
        <Dropdown>
          <AutoColumn gap="20px">
            {Object.keys(options).map((key, index) => {
              let option = options[key]
              return (
                option !== active && (
                  <Row
                    onClick={() => {
                      toggleDropdown(!showDropdown)
                      setActive(option)
                    }}
                    key={index}
                  >
                    <a fontSize={14}>{option}</a>
                  </Row>
                )
              )
            })}
          </AutoColumn>
        </Dropdown>
      )}
    </Wrapper>
  )
}

export default DropdownSelect
