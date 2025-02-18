import React from 'react'
import {
  faCog,
  faImage,
  faKey,
  faPen,
  faSignOutAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import useInfo from '@/lib/swr-hooks/useInfo'
import { isBlank } from '@/lib/utils/utils'
import useRouterRefresh from '../../hooks/useRefreshRoute'
import { Button, Nav, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import LanguageContext from './LanguageContext'
import LocalizedString from './LocalizedString'

function UserMenu () {
  const { user, isLoading, isError, mutate } = useInfo()
  const refresh = useRouterRefresh()

  const logout = () => {
    fetch('/api/auth/logout', { method: 'POST' }).then(() => {
      mutate()
      refresh()
    })
  }

  if (isLoading) {
    return null
  }

  if (isError || user === null || isBlank(user.username)) {
    return (
      <form method='POST' action='/api/auth/login/discord'>
        <Button variant='success' size='md' type='submit'>
          <FontAwesomeIcon className='me-2' icon={faDiscord} />
          Login
        </Button>
      </form>
    )
  }

  return (
    <LanguageContext.Helper.Consumer>
      {(lang) => (
        <Nav>
          <NavDropdown
            align='end'
            title={
              <span className='d-inline-flex align-items-center'>
                <span className='me-1'>{user.display_name}</span>&nbsp;
                <img
                  className='me-1 ms-auto'
                  style={{ width: 25, height: 25, borderRadius: '50%' }}
                  src={user.image}
                  alt='User Avatar'
                />
              </span>
            }
          >
            <Link href={`/user/${user.username}`} passHref legacyBehavior>
              <NavDropdown.Item>
                <FontAwesomeIcon className='me-2' icon={faUser} />
                <span><LocalizedString string='profile' /></span>
              </NavDropdown.Item>
            </Link>
            <Link href='/account' passHref legacyBehavior>
              <NavDropdown.Item>
                <FontAwesomeIcon className='me-2' icon={faKey} />
                <span><LocalizedString string='account' /></span>
              </NavDropdown.Item>
            </Link>
            {user.role === 'admin' && (
              <Link href='/admin' passHref legacyBehavior>
                <NavDropdown.Item>
                  <FontAwesomeIcon className='me-2' icon={faCog} />
                  <span>Administration</span>
                </NavDropdown.Item>
              </Link>
            )}
            <NavDropdown.Divider />
            <Link href='/edit' passHref legacyBehavior>
              <NavDropdown.Item>
                <FontAwesomeIcon className='me-2' icon={faPen} />
                <span><LocalizedString string='edit_tag' /></span>
              </NavDropdown.Item>
            </Link>
            <Link href='/mii' passHref legacyBehavior>
              <NavDropdown.Item>
                <FontAwesomeIcon className='me-2' icon={faImage} />
                <span><LocalizedString string='edit_mii' /></span>
              </NavDropdown.Item>
            </Link>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>
              <FontAwesomeIcon className='me-2' icon={faSignOutAlt} />
              <span><LocalizedString string='logout' /></span>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      )}
    </LanguageContext.Helper.Consumer>
  )
}

export default UserMenu
