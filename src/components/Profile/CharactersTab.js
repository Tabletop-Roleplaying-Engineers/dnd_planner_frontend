import React, { useState, useCallback } from 'react'
import {
  Dropdown,
  Icon,
  Spin,
  notification,
  Alert,
  Drawer,
  Button,
  Form,
  Empty,
} from 'antd'
import { useQuery, useMutation } from '@apollo/react-hooks'
import styled from 'styled-components'
import { Flex, Box } from 'noui/Position'
import Card from 'ui/Card'
import { Label } from 'ui/Text'
import Character from 'components/Character'
import EditCharacterForm from 'forms/EditCharacterForm'
import { Mutation } from 'react-apollo'
import { createMenu } from 'ui/shared'
import { omit } from 'utils/common'
import { modalWidth } from 'config'
import {
  FETCH_CHARACTERS_QUERY,
  CREATE_CHARACTER_MUTATION,
  DELETE_CHARACTER_MUTATION,
  UPDATE_CHARACTER_MUTATION,
} from 'api'
import * as R from 'ramda'

const FormContainer = styled.div`
  padding-top: 16px;
`

const CardWrapper = styled(Flex)`
  flex-shrink: 0;
`

const ListWrapper = styled(Flex)`
  flex-wrap: wrap;
`

const CharacterMenu = ({ onEditClick, character }) => {
  return (
    <Mutation
      mutation={DELETE_CHARACTER_MUTATION}
      update={cache => {
        const { characters } = cache.readQuery({
          query: FETCH_CHARACTERS_QUERY,
        })
        cache.writeQuery({
          query: FETCH_CHARACTERS_QUERY,
          data: { characters: characters.filter(c => c.id !== character.id) },
        })
      }}
    >
      {(deleteCharacter, { loading }) => (
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
                  await deleteCharacter({ variables: { id: character.id } })
                },
                'data-testid': 'character-menu-delete',
              },
            ])}
            trigger={['click']}
          >
            <Icon type="ellipsis" data-testid="character-menu" />
          </Dropdown>
        </Box>
      )}
    </Mutation>
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

  return data.characters.map(character => (
    <CardWrapper width={['100%', '100%', '50%', '33%']} px="10px" column>
      <Card
        key={character.id}
        py={10}
        px={20}
        my={10}
        inline
        data-testid={`character-${character.name}`}
        width="100%"
      >
        <Character {...character} />

        <CharacterMenu onEditClick={onEditClick} character={character} />
      </Card>
    </CardWrapper>
  ))
}

export const CharactersTab = () => {
  const [editCharacterVisibility, setEditCharacterVisibility] = useState(false)
  const [charToEdit, setCharToEdit] = useState()
  const { loading, error, data, refetch } = useQuery(FETCH_CHARACTERS_QUERY)
  const [createCharacter, createCharacterResult] = useMutation(
    CREATE_CHARACTER_MUTATION,
  )
  const createLoading = createCharacterResult.loading
  const [updateCharacter, updateCharacterResult] = useMutation(
    UPDATE_CHARACTER_MUTATION,
  )
  const updateLoading = updateCharacterResult.loading
  const onEditClick = character => {
    setEditCharacterVisibility(true)
    setCharToEdit(character)
  }
  const onCharEditClose = character => {
    setEditCharacterVisibility(false)
    setCharToEdit(null)
  }
  const onFormSubmit = useCallback(
    async data => {
      try {
        if (data.id) {
          await updateCharacter({ variables: omit(['name'], data) })
        } else {
          await createCharacter({ variables: data })
        }
        notification.success({
          message: `Character successfully ${data.id ? 'updated' : 'added'}`,
        })
        refetch()
        setEditCharacterVisibility(false)
        setCharToEdit(null)
      } catch (error) {
        const message = error.graphQLErrors.map(err => err.message).join(' ,')
        notification.error({ message })
      }
    },
    [updateCharacter, createCharacter, refetch],
  )
  let EditForm
  if (charToEdit) {
    EditForm = Form.create({ mapPropsToFields: () => charToEdit })(
      EditCharacterForm,
    )
  } else {
    EditForm = EditCharacterForm
  }

  return (
    <Flex flexDirection={['row', 'row']} justifyContent="space-between">
      <Box column width="100%">
        <Label>Characters:</Label>

        <Box column width={['100%', '40%']}>
          <Button
            style={{ width: '100%' }}
            type="primary"
            shape="round"
            icon="plus"
            size="large"
            onClick={() => setEditCharacterVisibility(true)}
            data-testid="add-character-btn"
          >
            Add new Character
          </Button>
        </Box>

        <ListWrapper>
          <CharactersList
            data={data}
            onEditClick={onEditClick}
            loading={loading}
            error={error}
          />
        </ListWrapper>
      </Box>

      <Drawer
        width={modalWidth()}
        placement="left"
        visible={editCharacterVisibility}
        onClose={onCharEditClose}
        destroyOnClose
        closable
      >
        <Spin spinning={createLoading || updateLoading}>
          <FormContainer>
            <EditForm data={charToEdit} onSubmit={onFormSubmit} />
          </FormContainer>
        </Spin>
      </Drawer>
    </Flex>
  )
}
