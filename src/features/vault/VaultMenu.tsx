import Badge from '../../components/Badge'
import { ChainId } from '../../sdk'
import NavLink from '../../components/NavLink'
import React from 'react'
import { useActiveWeb3React } from '../../hooks'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import Search from '../../components/Search'

const MenuItem = ({ href, title }) => {
  const { i18n } = useLingui()
  return (
    <NavLink
      exact
      href={href}
      activeClassName="font-bold bg-transparent border rounded text-high-emphesis border-transparent border-gradient-r-purple-dark-900"
    >
      <a className="flex items-center justify-between px-6 py-6  text-base font-bold border border-transparent rounded cursor-pointer bg-dark-800">
        {title}
      </a>
    </NavLink>
  )
}
const Menu = ({ positionsLength, onSearch, term  }) => {
  const { account, chainId } = useActiveWeb3React()
  const { i18n } = useLingui() 

  return (
    <div className={`grid grid-cols-12`}>
      <div className="col-span-12 flex flex-col space-y-4">
        <MenuItem href="/vaults?filter=all" title={i18n._(t`All Vaults`)} />
        {account && <MenuItem href={`/vaults?filter=my`} title={i18n._(t`My Vaults`)} />}
        {account && <MenuItem href={`/vaults?filter=past`} title={i18n._(t`Past Vaults`)} />}
        {/* <MenuItem href="/farm?filter=ember" title="EMBER Farms" />
        <MenuItem href="/farm?filter=bch" title="BCH Farms" />
        <MenuItem href="/farm?filter=stables" title="Stables Farms" />
        <MenuItem href="/farm?filter=single" title="Single Asset" /> */}
      </div>
    </div>
  )
}

export default Menu