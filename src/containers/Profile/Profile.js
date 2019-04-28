import { Button, Dropdown, Icon, Spin, notification, Tabs, Drawer } from 'antd'
import * as R from 'ramda'
import React, { useEffect, useState } from 'react'
import { Flex, Box } from 'noui/Position'
import Card from 'ui/Card'
import { Msg, Header, Label } from 'ui/Text'
import Character from 'components/Character'
import NewCharacterForm from 'forms/NewCharacterForm'
import { Mutation, Query, withApollo } from 'react-apollo'
import { createMenu } from 'ui/shared'
import {
  FETCH_CHARACTERS_QUERY,
  CREATE_CHARACTER_MUTATION,
  DELETE_CHARACTER_MUTATION,
  CHARACTERS_IN_GAME,
  LEAVE_GAME
} from 'api'
import GameView from 'components/GameView'

const Profile = ({client}) => {
  const [charactersInGame, set] = useState([])
  
  useEffect(() => {
    const fetch = async () => {
      const {data: {getCharactersInGame}} = await client.query({
        query: CHARACTERS_IN_GAME,
      })
      
      set(getCharactersInGame)
    }
    
    fetch()
  }, [])
  
  return (
    <Box height="90vh">
      <Box mb={40}>
        <Header>Profile</Header>
      </Box>
      
      <Tabs defaultActiveKey="games" type="card">
        <Tabs.TabPane tab="Games" key="games">
          <Query query={CHARACTERS_IN_GAME} pollInterval={1000}>
            {({loading, error, data: { getCharactersInGame = [] } }) => {
              if (error) return <div>Error</div>
              
              return (
                <Spin spinning={loading}>
                {
                  getCharactersInGame.map(character =>
                    <Card key={character.id} py={10} px={20} my={10}>
                      <Flex column>
                        <GameView {...character.game} />
                        
                        <Flex mt={20} justifyContent="space-between">
                          <Character {...character} />
                          
                          <Mutation
                            mutation={LEAVE_GAME}
                            variables={{characterId: character.id}}
                            update={(cache, {data: {leaveGame}}) => {
                              const {getCharactersInGame} = cache.readQuery({query: CHARACTERS_IN_GAME})
                              const newGames = R.reject(R.propEq('id', leaveGame.id), getCharactersInGame)
                              
                              cache.writeQuery({
                                query: CHARACTERS_IN_GAME,
                                data: {
                                  getCharactersInGame: newGames
                                }
                              })
                              
                              set(newGames)
                            }}
                          >
                            {(leaveGame, {loading}) => (
                              <Spin spinning={loading}>
                                <Button
                                  type="primary"
                                  size="large"
                                  onClick={leaveGame}
                                >
                                  Leave Game
                                </Button>
                              </Spin>
                            )}
                          </Mutation>
                        
                        </Flex>
                      </Flex>
                    </Card>)
                }
                </Spin>
              )
            }}
          </Query>
        
        </Tabs.TabPane>
        
        <Tabs.TabPane tab="Characters" key="characters">
          <Flex flexDirection={['row', 'row']} justifyContent="space-between">
            <Box column width={['100%', '40%']}>
              <Label>Characters: </Label>
              
              <Flex column>
                <Query query={FETCH_CHARACTERS_QUERY}>
                  {({loading, error, data}) => {
                    if (loading) return <Spin/>
                    if (error) return <div>Error</div>
                    
                    return data.characters.map(char =>
                      <Card key={char.id} py={10} px={20} my={10} inline>
                        <Character {...char} />
                        
                        <Mutation
                          mutation={DELETE_CHARACTER_MUTATION}
                          update={(cache, {data: {deleteCharacter}}) => {
                            const {characters} = cache.readQuery({query: FETCH_CHARACTERS_QUERY})
                            
                            cache.writeQuery({
                              query: FETCH_CHARACTERS_QUERY,
                              data: {characters: characters.filter(c => c.id !== deleteCharacter.id)}
                            })
                          }}
                        >
                          {(deleteCharacter, {loading}) => (
                            <Box
                              position="absolute"
                              top={0}
                              right={10}
                            >
                              <Dropdown
                                overlay={createMenu([
                                  {
                                    label: 'Edit',
                                    icon: 'edit',
                                    onClick: () => alert('edit')
                                  },
                                  {
                                    label: 'Delete',
                                    icon: 'delete',
                                    onClick: async () => {
                                      await deleteCharacter({variables: {id: char.id}})
                                    }
                                  }
                                ])}
                                trigger={['click']}
                              >
                                <Icon type="ellipsis"/>
                              </Dropdown>
                            </Box>
                          )}</Mutation>
                      </Card>
                    )
                  }}</Query>
              </Flex>
            </Box>
            
            <Box width={['100%', '40%']} pr={[0, '10%']}>
              <Mutation
                mutation={CREATE_CHARACTER_MUTATION}
                update={(cache, {data: {createCharacter}}) => {
                  const {characters} = cache.readQuery({query: FETCH_CHARACTERS_QUERY})
                  cache.writeQuery({
                    query: FETCH_CHARACTERS_QUERY,
                    data: {characters: characters.concat([createCharacter])}
                  })
                }}
              >
                {(createCharacter, {loading}) => (
                  <Spin spinning={loading}>
                    <NewCharacterForm
                      onSubmit={async data => {
                        try {
                          await createCharacter({variables: data})
                          notification.success({
                            message: 'Character successfully added'
                          })
                          this.setState({newCharacterVisibility: false})
                        } catch (error) {
                          notification.error({
                            message: `Error while saving data: ${error.message}`
                          })
                        }
                        
                      }}
                    />
                  </Spin>
                )}
              </Mutation>
            </Box>
          </Flex>
        </Tabs.TabPane>
        
        <Tabs.TabPane tab="User" key="user">
          <Flex column width={['100%', '45%']}>
            <Msg>Rostyslav Melnychuk</Msg>
            
            <Msg>phone number</Msg>
            
            <Button onClick={() => localStorage.removeItem('AUTH_DATA')}>Sign out</Button>
          </Flex>
        </Tabs.TabPane>
      </Tabs>
    </Box>
  )
}

export default withApollo(Profile)
