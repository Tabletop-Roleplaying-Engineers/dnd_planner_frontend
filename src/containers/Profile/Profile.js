import React, { useContext, useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { Tabs, Alert } from 'antd'
import { Box } from 'noui/Position'
import {
  GamesTab,
  CharactersTab,
  SettingsTab,
  UsersTab,
  HostedGamesTab,
} from 'components/Profile'
import { UserContext } from '../../context/userContext'
import { ACTIONS } from '../../constants'

const Profile = ({ history }) => {
  const { user, setUser } = useContext(UserContext)
  const setOnBehalfToken = useCallback((token) => {
    const originalToken = localStorage.getItem('AUTH_DATA')
    localStorage.setItem('AUTH_DATA_ORIGINAL', originalToken)
    localStorage.setItem('AUTH_DATA', token)
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }, [])
  const originalToken = localStorage.getItem('AUTH_DATA_ORIGINAL')
  const logoutBehalf = useCallback(() => {
    localStorage.setItem('AUTH_DATA', originalToken)
    localStorage.removeItem('AUTH_DATA_ORIGINAL')
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }, [originalToken])
  if (!user) {
    history.replace('/')

    return null
  }
  const canManageRoles = user.actions.indexOf(ACTIONS.MANAGE_ROLES) >= 0

  if (!user) {
    return (
      <Alert message="You have to login to enter this page" type="warning" />
    )
  }

  return (
    <Box height="90vh" pt="24px">
      <Tabs defaultActiveKey="games" type="card">
        <Tabs.TabPane
          tab={<FormattedMessage id="profile.myGames" />}
          key="games"
        >
          <GamesTab />
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={<FormattedMessage id="profile.gameHost" />}
          key="host"
        >
          <HostedGamesTab />
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={<FormattedMessage id="profile.characters" />}
          key="characters"
        >
          <CharactersTab />
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={<FormattedMessage id="profile.userAndSettings" />}
          key="settings"
        >
          <SettingsTab
            user={user}
            onLogOutClick={() => {
              localStorage.removeItem('AUTH_DATA')
              setUser(null)
            }}
            logoutBehalf={logoutBehalf}
            isOnBehalf={!!originalToken}
          />
        </Tabs.TabPane>

        {canManageRoles && (
          <Tabs.TabPane
            tab={<FormattedMessage id="profile.users" />}
            key="users"
          >
            <UsersTab setOnBehalfToken={setOnBehalfToken} />
          </Tabs.TabPane>
        )}
      </Tabs>
    </Box>
  )
}

export default Profile
