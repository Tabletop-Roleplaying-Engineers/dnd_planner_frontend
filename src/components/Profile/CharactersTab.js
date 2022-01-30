import React, { useCallback } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import * as R from 'ramda'
import { Dropdown, Icon, Spin, Alert, Button, Empty } from 'antd'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import { Flex, Box } from 'noui/Position'
import Character from 'components/Character'
import { createMenu } from 'ui/shared'
import { FETCH_CHARACTERS_QUERY } from 'api'
import { useCharacterActions } from 'utils/hooks/useCharacterActions'

const CardWrapper = styled(Flex)`
  flex-shrink: 0;
`

const ListWrapper = styled(Flex)`
  flex-wrap: wrap;
`

const CharacterMenu = ({ onEditClick, character, onDeleteClick }) => {
  const intl = useIntl()

  return (
    <Box position="absolute" top={0} right={10}>
      <Dropdown
        overlay={createMenu([
          {
            label: intl.formatMessage({ id: 'common.edit' }),
            icon: 'edit',
            onClick: () => onEditClick(character),
            'data-testid': 'character-menu-edit',
          },
          {
            label: intl.formatMessage({ id: 'common.delete' }),
            icon: 'delete',
            onClick: async () => {
              onDeleteClick(character)
            },
            'data-testid': 'character-menu-delete',
          },
        ])}
        trigger={['click']}
      >
        <Icon type="ellipsis" data-testid="character-menu" />
      </Dropdown>
    </Box>
  )
}

const CharactersList = ({
  data,
  onEditClick,
  loading,
  error,
  deleteCharacter,
}) => {
  if (loading) {
    return <Spin />
  }
  if (error) {
    return <Alert message={error.message} type="error" />
  }

  if (!loading && R.isEmpty(data.characters))
    return (
      <Flex justifyContent="center" width="100%">
        <Empty
          description={
            <FormattedMessage id="characters.emptyList.placeholder" />
          }
        />
      </Flex>
    )

  return data.characters.map((character) => (
    <CardWrapper
      width={['100%', '100%', '50%', '33%']}
      px="10px"
      column
      key={character.id}
    >
      <Box
        my={10}
        inline
        data-testid={`character-${character.name}`}
        width="100%"
        position="relative"
      >
        <Character withBorder {...character} />

        <CharacterMenu
          onEditClick={onEditClick}
          onDeleteClick={deleteCharacter}
          character={character}
        />
      </Box>
    </CardWrapper>
  ))
}

export const CharactersTab = () => {
  const { loading, error, data, refetch } = useQuery(FETCH_CHARACTERS_QUERY)
  const onEditSuccess = useCallback(() => refetch(), [refetch])
  const {
    editDialog,
    editCharacter,
    createCharacter,
    deleteDialog,
    deleteCharacter,
  } = useCharacterActions({
    onEditSuccess,
  })

  return (
    <Flex flexDirection={['row', 'row']} justifyContent="space-between">
      <Box column width="100%">
        <Box column width={['100%', '40%']}>
          <Button
            style={{ width: '100%', margin: '20px 0' }}
            type="primary"
            shape="round"
            icon="plus"
            size="large"
            onClick={createCharacter}
            data-testid="add-character-btn"
          >
            <FormattedMessage id="characters.addButton.label" />
          </Button>
        </Box>

        <ListWrapper>
          <CharactersList
            data={data}
            onEditClick={editCharacter}
            loading={loading}
            error={error}
            deleteCharacter={deleteCharacter}
          />
        </ListWrapper>
      </Box>

      {/* Edit */}
      {editDialog}

      {/* Delete */}
      {deleteDialog}
    </Flex>
  )
}
