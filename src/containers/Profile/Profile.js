import React, { useState, useContext } from 'react'
import { Tabs, Drawer } from 'antd'
import { Box } from 'noui/Position'
import { Header } from 'ui/Text'
import NewCharacterForm from 'forms/NewCharacterForm'
import { withApollo } from 'react-apollo'
import { GamesTab, CharactersTab, SettingsTab, UsersTab } from 'components/Profile'
import { UserContext } from '../../context/userContext'
import { ACTIONS } from '../../constants'

const Profile = () => {
  const [newCharacterVisibility, setNewCharacterVisibility] = useState(false)
  const { user, setUser } = useContext(UserContext)
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
          <CharactersTab onEditClick={setNewCharacterVisibility} />
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

      <Drawer
        width={640}
        placement="left"
        closable={false}
        visible={newCharacterVisibility}
        onClose={() => setNewCharacterVisibility(false)}
      >
        <NewCharacterForm
          onSubmit={data => {
            console.log(data)

            debugger
          }}
        />
      </Drawer>
    </Box>
  )
}

export default withApollo(Profile)
