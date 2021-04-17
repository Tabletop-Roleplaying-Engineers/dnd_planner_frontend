import React, { useState, useCallback } from 'react'
import { Dropdown, Icon, Spin, Alert, Button, Empty, Modal } from 'antd'
import { useQuery, useMutation } from '@apollo/react-hooks'
import styled from 'styled-components'
import { Flex, Box } from 'noui/Position'
import { Label } from 'ui/Text'
import Character from 'components/Character'
import { createMenu } from 'ui/shared'
import { FETCH_CHARACTERS_QUERY, DELETE_CHARACTER_MUTATION } from 'api'
import * as R from 'ramda'
import { useCharacterActions } from 'utils/hooks/useCharacterActions'

const CardWrapper = styled(Flex)`
  flex-shrink: 0;
`

const ListWrapper = styled(Flex)`
  flex-wrap: wrap;
`

const CharacterMenu = ({ onEditClick, character }) => {
  const [
    deleteCharacterConfirmation,
    setDeleteCharacterConfirmation,
  ] = useState(false)
  const [characterToDeleteId, setCharacterToDeleteId] = useState(null)
  const onDeleteCharacter = async () => {
    setDeleteCharacterConfirmation(false)
    setCharacterToDeleteId(null)
    await deleteCharacter({ variables: { id: characterToDeleteId } })
  }
  const [deleteCharacter] = useMutation(DELETE_CHARACTER_MUTATION, {
    update(cache) {
      const { characters } = cache.readQuery({
        query: FETCH_CHARACTERS_QUERY,
      })
      cache.writeQuery({
        query: FETCH_CHARACTERS_QUERY,
        data: { characters: characters.filter((c) => c.id !== character.id) },
      })
    },
  })

  return (
    <Box position="absolute" top={0} right={10}>
      <Dropdown
        overlay={createMenu([
          {
            label: 'Edit',
            icon: 'edit',
            onClick: () => onEditClick(character),
            'data-testid': 'character-menu-edit',
          },
          {
            label: 'Delete',
            icon: 'delete',
            onClick: async () => {
              setDeleteCharacterConfirmation(true)
              setCharacterToDeleteId(character.id)
            },
            'data-testid': 'character-menu-delete',
          },
        ])}
        trigger={['click']}
      >
        <Icon type="ellipsis" data-testid="character-menu" />
      </Dropdown>
      {/* Delete character confirmation dialog */}
      <Modal
        title="Delete character"
        visible={deleteCharacterConfirmation}
        onOk={() => onDeleteCharacter()}
        onCancel={() => {
          setDeleteCharacterConfirmation(false)
          setCharacterToDeleteId(null)
        }}
      >
        <p>Are you sure that you want to delete {character.name}?</p>
      </Modal>
    </Box>
  )
}

const CharactersList = ({ data, onEditClick, loading, error }) => {
  if (loading) {
    return <Spin />
  }
  if (error) {
    return <Alert message={error.message} type="error" />
  }

  if (!loading && R.isEmpty(data.characters))
    return (
      <Empty description="You have no characters yet. Create one to play!" />
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

        <CharacterMenu onEditClick={onEditClick} character={character} />
      </Box>
    </CardWrapper>
  ))
}

export const CharactersTab = () => {
  const { loading, error, data, refetch } = useQuery(FETCH_CHARACTERS_QUERY)
  const onEditSuccess = useCallback(() => refetch(), [refetch])
  const { editDialog, editCharacter, createCharacter } = useCharacterActions({
    onEditSuccess,
  })

  return (
    <Flex flexDirection={['row', 'row']} justifyContent="space-between">
      <Box column width="100%">
        <Label>Characters:</Label>

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
            Add new Character
          </Button>
        </Box>

        <ListWrapper>
          <CharactersList
            data={data}
            onEditClick={editCharacter}
            loading={loading}
            error={error}
          />
        </ListWrapper>
      </Box>

      {editDialog}
    </Flex>
  )
}
