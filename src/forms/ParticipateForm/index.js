import { Button, Select, Spin } from 'antd'
import * as R from 'ramda'
import React from 'react'
import isBefore from 'date-fns/isBefore'
import styled from 'styled-components'
import { Flex, Box } from 'noui/Position'
import Character from 'components/Character'
import { Header, Msg, Paragraph } from 'ui/Text'
import UserInfo from 'components/UserInfo'

const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 300px;
`

const Description = styled(Flex)`
  max-height: 200px;
  overflow-y: auto;
`

const StyledSelect = styled(Select)`
  width: 300px;

 & > .ant-select-selection--single {
   height: ${props => props.selected ? '90px' : 'auto'};
   padding-top: 3px;
 }
`

class ParticipateForm extends React.PureComponent {
  state = {
    selectedCharacter: null,
    participating: false,
  }

  render () {
    const {
      id,
      image,
      title,
      lvlFrom,
      lvlTo,
      description,
      user,
      characters = [],
      availableCharacters = [],
      players,
      status,
      onParticipate,
      startingDate,
    } = this.props
    const isPastGame = isBefore(new Date(startingDate), new Date())

    return (
      <Box key={id}>
        <Flex mb={20} center justifyContent="space-between">
          <Flex column>
            <Header>
              {title}
            </Header>

            <Msg>{lvlFrom} - {lvlTo}</Msg>
          </Flex>

          <Flex column alignItems="flex-end">
            <Msg>Dungeon Master</Msg>

            <UserInfo {...user} position="left"/>
          </Flex>
        </Flex>

        <StyledImage src={image}/>

        <Description column my={20}>
          {
            description
              .split('\n')
              .map(msg => <Paragraph key={msg}>{msg}</Paragraph>)
          }
        </Description>

        <Box>
          <Flex justifyContent="space-between">
            <Msg>Players:</Msg>

            <Msg>{characters.length} / {players}</Msg>
          </Flex>

          <Flex flexWrap="wrap" justifiContent="space-between">
            {
              characters.map((char) =>
                <Flex key={char.id} my={10} center>
                  <Character {...char} />
                </Flex>
              )
            }
          </Flex>

          {isPastGame && <Msg>Registration is closed</Msg>}
          {
            (!isPastGame && status === 'CAN_PARTICIPATE') &&
            <Spin spinning={this.state.participating}>
              <StyledSelect
                placeholder="Select hero"
                selected={this.state.selectedCharacter}
                onSelect={data => {
                  const char = JSON.parse(data)
                  this.setState({selectedCharacter: char})
                }}
              >
                {
                  availableCharacters.map(char =>
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
                  onClick={async () => {
                    this.setState({participating: true})
                    await onParticipate(this.state.selectedCharacter)
                    this.setState({participating: false})
                  }}
                >
                  Participate
                </Button>
              </Box>
            </Spin>
          }

        </Box>

      </Box>
    )
  }
}

export default ParticipateForm
