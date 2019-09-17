import React from 'react'
import { Dropdown, Icon, Spin, notification } from 'antd'
import { Flex, Box } from 'noui/Position'
import Card from 'ui/Card'
import { Label } from 'ui/Text'
import Character from 'components/Character'
import NewCharacterForm from 'forms/NewCharacterForm'
import { Mutation, Query } from 'react-apollo'
import { createMenu } from 'ui/shared'
import {
  FETCH_CHARACTERS_QUERY,
  CREATE_CHARACTER_MUTATION,
  DELETE_CHARACTER_MUTATION,
} from 'api'

export const CharactersTab = (props) => {
  const { onEditClick } = props

  return (
    <Flex flexDirection={['row', 'row']} justifyContent="space-between">
      <Box column width={['100%', '40%']}>
        <Label>Characters: </Label>

        <Flex column>
          <Query query={FETCH_CHARACTERS_QUERY}>
            {({loading, error, data: { characters = [] }}) => {
              if (loading) return <Spin/>
              if (error) return <div>Error</div>

              return characters.map(char =>
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
                              onClick: () => onEditClick(true)
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
  )
}
