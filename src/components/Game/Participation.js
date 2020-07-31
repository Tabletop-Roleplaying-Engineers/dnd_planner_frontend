import React, { useState, useContext, useEffect } from 'react'
import { Button, Select, Spin, Alert } from 'antd'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import * as R from 'ramda'
import isBefore from 'date-fns/isBefore'
import styled from 'styled-components'
import { Box } from 'noui/Position'
import Character from 'components/Character'
import { AVAILABLE_CHARACTERS, LEAVE_GAME } from 'api'
import { UserContext } from '../../context/userContext'
import { FormattedMessage, useIntl } from 'react-intl'

const StyledSelect = styled(Select)`
  width: 100%;

  & > .ant-select-selection--single {
    height: ${props => (props.selected ? '90px' : 'auto')};
    padding-top: 3px;
  }
`

export const GameParticipation = props => {
  const { onParticipate, game, onLeave } = props
  const intl = useIntl()
  const { id, startingDate, user: gameMaster, characters } = game
  const isPastGame = isBefore(new Date(startingDate), new Date())
  const [loading, setLoading] = useState(false)
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
  const [leaveGame] = useMutation(LEAVE_GAME)
  const availableCharacters = data.validCharactersForGame || []

  useEffect(() => {
    if (user) {
      loadAvailableCharacters()
    }
  }, [user])

  if (isPastGame) {
    return (
      <Alert
        message={intl.formatMessage({
          id: 'participation.registrationIsClosed',
        })}
        type="warning"
      />
    )
  }

  if (!user) {
    return (
      <Alert
        message={intl.formatMessage({
          id: 'participation.loginToRegister',
        })}
        type="warning"
      />
    )
  }

  if (gameMaster.id === user.id) {
    return (
      <Alert
        message={intl.formatMessage({
          id: 'participation.ownGameError',
        })}
        type="warning"
      />
    )
  }

  const currentUsersCharacter = characters.find(
    character => character.user.id === user.id,
  )
  if (currentUsersCharacter) {
    return (
      <Box>
        <Alert
          message={intl.formatMessage(
            {
              id: 'participation.participationMassage',
            },
            { name: currentUsersCharacter.name },
          )}
          type="warning"
        />
        <Box mt="10px">
          <Spin spinning={loading}>
            <Button
              type="primary"
              size="large"
              onClick={async () => {
                setLoading(true)
                await leaveGame({
                  variables: {
                    gameId: id,
                    characterId: currentUsersCharacter.id,
                  },
                })
                await onLeave()
                setSelectedCharacter(null)
                setLoading(false)
              }}
            >
              <FormattedMessage id="participation.leave" />
            </Button>
          </Spin>
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      <Spin spinning={loading}>
        <StyledSelect
          placeholder={intl.formatMessage({
            id: 'participation.selectHeroBtn',
          })}
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
              setLoading(true)
              await onParticipate(selectedCharacter)
              setLoading(false)
            }}
          >
            <FormattedMessage id="participation.participateBtn" />
          </Button>
        </Box>
      </Spin>
    </Box>
  )
}
