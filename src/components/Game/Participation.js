import React, { useState, useContext, useEffect } from 'react'
import { Button, Select, Spin, Alert } from 'antd'
import { useLazyQuery } from '@apollo/react-hooks'
import * as R from 'ramda'
import isBefore from 'date-fns/isBefore'
import styled from 'styled-components'
import { Box } from 'noui/Position'
import Character from 'components/Character'
import { AVAILABLE_CHARACTERS } from 'api'
import { UserContext } from '../../context/userContext'

const StyledSelect = styled(Select)`
  width: 100%;

  & > .ant-select-selection--single {
    height: ${props => (props.selected ? '90px' : 'auto')};
    padding-top: 3px;
  }
`

export const GameParticipation = props => {
  const {
    id,
    onParticipate,
    startingDate,
    user: gameMaster,
    characters,
  } = props
  const isPastGame = isBefore(new Date(startingDate), new Date())
  const [participating, setParticipating] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const { user } = useContext(UserContext)
  const [loadAvailableCharacters, { data = {} }] = useLazyQuery(
    AVAILABLE_CHARACTERS,
    {
      variables: {
        gameId: id,
      },
      fetchPolicy: 'network-only',
    },
  )
  const availableCharacters = data.validCharactersForGame || []

  useEffect(() => {
    if (user) {
      loadAvailableCharacters()
    }
  }, [user])

  if (isPastGame) {
    return <Alert message="Registration is closed" type="warning" />
  }

  if (!user) {
    return (
      <Alert
        message="Please login to be able to participate the game"
        type="warning"
      />
    )
  }

  if (gameMaster.id === user.id) {
    return (<Alert message="You can't participate your own game" type="warning" />)
  }

  if (characters.some(character => character.user.id === user.id)) {
    return (<Alert message="You already participating this game" type="warning" />)
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
          {availableCharacters.map(char => (
            <StyledSelect.Option key={char.id} value={JSON.stringify(char)}>
              <Character {...char} />
            </StyledSelect.Option>
          ))}
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
