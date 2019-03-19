import { Button, Drawer, Spin } from 'antd'
import React from 'react'
import { Flex, Box } from 'noui/Position'
import Card from 'ui/Card'
import { Msg, Header, Label } from 'ui/Text'
import Character from 'components/Character'
import NewCharacterForm from 'forms/NewCharacterForm'
import { Mutation, Query } from 'react-apollo'
import { FETCH_CHARACTERS_QUERY, CREATE_CHARACTER_MUTATION } from 'api'

class Profile extends React.PureComponent {
  state = {
    characters: []
  }

  render() {
    return (
      <Box height="90vh">
        <Box mb={40}>
          <Header>Profile</Header>
        </Box>

        <Flex flexDirection={[ 'column', 'row' ]} justifyContent="space-between">
          <Flex column width={[ '100%', '45%' ]}>
            <Msg>Rostyslav Melnychuk</Msg>

            <Msg>phone number</Msg>

            <Button>Sign out</Button>
          </Flex>

          <Box column width={[ '100%', '30%' ]} mr={[ 0, '15%' ]}>
            <Label>Characters: </Label>

            <Flex column>
              <Query query={FETCH_CHARACTERS_QUERY}>
                {({ loading, error, data }) => {
                  if (loading) return <Spin/>
                  if (error) return <div>Error</div>

                  return data.characters.map(char =>
                    <Card key={char.id} py={10} px={20} my={10} inline>
                      <Character {...char} />
                    </Card>
                  )
                }}</Query>
              {

              }
            </Flex>

            <Box mt={20}>
              <Button
                type="primary"
                shape="round"
                icon="plus"
                size="large"
                onClick={() => this.setState({ newCharacterVisibility: true })}
              >
                Add new Character
              </Button>
            </Box>

          </Box>
        </Flex>


        <Drawer
          width={640}
          placement="left"
          closable={false}
          visible={this.state.newCharacterVisibility}
          onClose={() => this.setState({ newCharacterVisibility: false })}
        >
          <Mutation
            mutation={CREATE_CHARACTER_MUTATION}
            update={(cache, { data: { createCharacter } }) => {
              const { characters } = cache.readQuery({ query: FETCH_CHARACTERS_QUERY })
              cache.writeQuery({
                query: FETCH_CHARACTERS_QUERY,
                data: { characters: characters.concat([ createCharacter ]) }
              })
            }}
          >
            {(createCharacter, { loading }) => (
              <Spin spinning={loading}>
                <NewCharacterForm
                  onSubmit={data => {
                    createCharacter({ variables: data })
                  }}
                />
              </Spin>
            )}
          </Mutation>

        </Drawer>
      </Box>
    )
  }
}

export default Profile
