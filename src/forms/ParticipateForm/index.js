import { Button, Select } from 'antd'
import * as R from 'ramda'
import React from 'react'
import { Flex, Box } from 'noui/Position'
import Character from 'components/Character'
import { Header, Msg } from 'ui/Text'
import styled from 'styled-components'

const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 300px;
`

const Description = styled(Box)`
  max-height: 200px;
  overflow-y: auto;
`

const StyledSelect = styled(Select)`
  width: 300px;
  
 & > .ant-select-selection--single {
   height: ${props => props.selected ? '70px' : 'auto'};
   padding-top: 3px;
 }
`

class ParticipateForm extends React.PureComponent {
  state = {
    selectedCharacter: null
  }
  
  render () {
    const { image, title, lvlFrom, lvlTo, description, characters = [], players } = this.props
    
    return (
      <Box>
        <Flex mb={20} center justifyContent="space-between">
          <Header>{title}</Header>
          
          {lvlFrom} - {lvlTo}
        </Flex>
        
        <StyledImage src={image}/>
        
        <Description my={20}>
          <Msg>{description}</Msg>
        </Description>
        
        <Box>
          <Flex justifyContent="space-between">
            <Msg>Players:</Msg>
            
            <Msg>{characters.length} / {players}</Msg>
          </Flex>
          
          <Flex flexWrap="wrap" justifiContent="space-between">
            {
              characters.map(char =>
                <Box key={char.id} my={10}>
                  <Character {...char} />
                </Box>
              )
            }
          </Flex>
          
          <StyledSelect
            placeholder="Select hero"
            selected={this.state.selectedCharacter}
            onSelect={data => {
              const char = JSON.parse(data)
              this.setState({ selectedCharacter: char })
            }}
          >
            {
              characters.map(char =>
                <StyledSelect.Option key={char.id} value={JSON.stringify(char)}>
                  <Character {...char} />
                </StyledSelect.Option>
              )
            }
          </StyledSelect>
          
          <Box mt={20}>
            <Button
              type="primary"
              size="large"
              disabled={R.isNil(this.state.selectedCharacter)}
              onClick={() => this.setState({ newCharacterVisibility: true })}
            >
              Participate
            </Button>
          </Box>
        
        </Box>
      
      </Box>
    )
  }
}

export default ParticipateForm
