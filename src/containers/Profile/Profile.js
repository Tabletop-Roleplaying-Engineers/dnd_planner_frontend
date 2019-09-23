import React, { useContext } from 'react'
import { Tabs } from 'antd'
import { Box } from 'noui/Position'
import { Header } from 'ui/Text'
import { withApollo } from 'react-apollo'
import { GamesTab, CharactersTab, SettingsTab, UsersTab } from 'components/Profile'
import { UserContext } from '../../context/userContext'
import { ACTIONS } from '../../constants'

const Profile = ({ history }) => {
  const { user, setUser } = useContext(UserContext)
  if (!user) {
    history.replace('/')
    return null
  }
  const canManageRoles = user.actions.indexOf(ACTIONS.MANAGE_ROLES) >= 0

  if (!user) {
    return <div>You have to login to enter this page</div>
  }

  return (
    <Box height="90vh">
      <Box mb={40}>
        <Header>Profile</Header>
      </Box>

      <Tabs defaultActiveKey="characters" type="card">
        <Tabs.TabPane tab="Games" key="games">
          <GamesTab />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Characters" key="characters">
          <CharactersTab />
        </Tabs.TabPane>

        <Tabs.TabPane tab="User and Settings" key="settings">
          <SettingsTab user={user} onLogOutClick={() => {
            localStorage.removeItem('AUTH_DATA')
            setUser(null)
          }} />
        </Tabs.TabPane>

        {canManageRoles && (
          <Tabs.TabPane tab="Users" key="users">
            <UsersTab />
          </Tabs.TabPane>
        )}
      </Tabs>
    </Box>
  )
}

export default withApollo(Profile)
