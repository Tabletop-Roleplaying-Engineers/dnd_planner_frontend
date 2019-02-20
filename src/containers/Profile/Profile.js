import { Button, Drawer } from 'antd'
import React from 'react'
import { Flex, Box } from 'noui/Position'
import { factions } from 'config'
import Card from 'ui/Card'
import { Msg, Header, Label } from 'ui/Text'
import Character from 'components/Character'
import NewCharacterForm from 'forms/NewCharacterForm'

class Profile extends React.PureComponent {
  state = {
    characters: [
      {
        id:         0,
        name:       'Kethavel',
        faction:    factions[5],
        experience: 10400,
        renown:     14
      },
      {
        id:         1,
        name:       'Rosty Di Marr',
        faction:    factions[1],
        experience: 2000,
        renown:     4
      }
    ]
  }
  
  render () {
    return (
      <Box height="90vh">
        <Box mb={40}>
          <Header>Profile</Header>
        </Box>
        
        <Flex flexDirection={['column', 'row']} justifyContent="space-between">
          <Flex column width={['100%', '45%']}>
            <Msg>Rostyslav Melnychuk</Msg>
            
            <Msg>phone number</Msg>
            
            <Button>Sign out</Button>
          </Flex>
  
          <Box column width={['100%', '30%']} mr={[0, '15%']}>
            <Label>Characters: </Label>
            
            <Flex column>
              {
                this.state.characters.map(char =>
                  <Card key={char.id} py={10} px={20} my={10} inline>
                    <Character {...char} />
                  </Card>
                )
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
          <NewCharacterForm
            onSubmit={data => {
              
              const char = {
                id:         this.state.characters.length,
                name:       data.name,
                faction:    factions[0],
                experience: 0,
                renown:     0
              }
              
              this.setState({ characters: [char, ...this.state.characters]})
            }}
          />
        </Drawer>
      
      </Box>
    )
  }
}

export default Profile
