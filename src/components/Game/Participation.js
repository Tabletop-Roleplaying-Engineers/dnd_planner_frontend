import React, { useState, useContext } from 'react'
import { Button, Select, Spin } from 'antd'
import { useQuery } from '@apollo/react-hooks';
import * as R from 'ramda'
import isBefore from 'date-fns/isBefore'
import styled from 'styled-components'
import { Box } from 'noui/Position'
import Character from 'components/Character'
import { Msg } from 'ui/Text'
import { AVAILABLE_CHARACTERS } from 'api'
import { UserContext } from '../../context/userContext'

const StyledSelect = styled(Select)`
  width: 100%;

 & > .ant-select-selection--single {
   height: ${props => props.selected ? '90px' : 'auto'};
   padding-top: 3px;
 }
`

export const GameParticipation = (props) => {
  const {
    id,
    onParticipate,
    startingDate,
  } = props
  const isPastGame = isBefore(new Date(startingDate), new Date())
  const [participating, setParticipating] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const { user } = useContext(UserContext)
  const { data = {} } = useQuery(AVAILABLE_CHARACTERS, {
    variables: {
      gameId: id,
    },
    fetchPolicy: 'network-only',
  });
  const availableCharacters = data.validCharactersForGame || []

  if (isPastGame) {
    return (<Msg>Registration is closed</Msg>);
  }

  if (!user) {
    return (<Msg>Please login to be able to participate the game</Msg>)
  }

  return (
    <Box>
      <Spin spinning={participating}>
        <StyledSelect
          placeholder="Select hero"
          selected={selectedCharacter}
          onSelect={data => {
            const char = JSON.parse(data)
            setSelectedCharacter(char)
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
            disabled={R.isNil(selectedCharacter)}
            onClick={async () => {
              setParticipating(true)
              await onParticipate(selectedCharacter)
              setParticipating(false)
            }}
          >
            Participate
          </Button>
        </Box>
      </Spin>
    </Box>
  )
}
