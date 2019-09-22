import React, { useState } from 'react'
import { Dropdown, Icon, Spin, notification, Alert, Drawer, Button, Form } from 'antd'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Flex, Box } from 'noui/Position'
import Card from 'ui/Card'
import { Label } from 'ui/Text'
import Character from 'components/Character'
import EditCharacterForm from 'forms/EditCharacterForm'
import { Mutation } from 'react-apollo'
import { createMenu } from 'ui/shared'
import {
  FETCH_CHARACTERS_QUERY,
  CREATE_CHARACTER_MUTATION,
  DELETE_CHARACTER_MUTATION,
  UPDATE_CHARACTER_MUTATION,
} from 'api'

const CharacterMenu = ({ onEditClick, character }) => {
  return (
    <Mutation
      mutation={DELETE_CHARACTER_MUTATION}
      update={(cache, { data: { deleteCharacter } }) => {
        const { characters } = cache.readQuery({ query: FETCH_CHARACTERS_QUERY })

        cache.writeQuery({
          query: FETCH_CHARACTERS_QUERY,
          data: { characters: characters.filter(c => c.id !== deleteCharacter.id) }
        })
      }}
    >
      {(deleteCharacter, { loading }) => (
        <Box
          position="absolute"
          top={0}
          right={10}
        >
          <Dropdown
            overlay={createMenu([
              {
                label: 'Edit',
                icon: 'edit',
                onClick: () => onEditClick(character)
              },
              {
                label: 'Delete',
                icon: 'delete',
                onClick: async () => {
                  await deleteCharacter({ variables: { id: character.id } })
                }
              }
            ])}
            trigger={['click']}
          >
            <Icon type="ellipsis" />
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

  return data.characters.map(character =>
    <Card key={character.id} py={10} px={20} my={10} inline>
      <Character {...character} />

      <CharacterMenu onEditClick={onEditClick} character={character} />
    </Card>
  )
}

export const CharactersTab = () => {
  const [editCharacterVisibility, setEditCharacterVisibility] = useState(false)
  const [charToEdit, setCharToEdit] = useState()
  const { loading, error, data, refetch } = useQuery(FETCH_CHARACTERS_QUERY);
  const [createCharacter, createCharacterResult] = useMutation(CREATE_CHARACTER_MUTATION);
  const createLoading = createCharacterResult.loading
  const [updateCharacter, updateCharacterResult] = useMutation(UPDATE_CHARACTER_MUTATION);
  const updateLoading = updateCharacterResult.loading
  const onEditClick = (character) => {
    setEditCharacterVisibility(true)
    setCharToEdit(character)
  }
  const onCharEditClose = (character) => {
    setEditCharacterVisibility(false)
    setCharToEdit(null)
  }
  let EditForm
  if (charToEdit) {
    EditForm = Form.create({ mapPropsToFields: () => charToEdit})(EditCharacterForm);
  } else {
    EditForm = EditCharacterForm;
  }

  return (
    <Flex flexDirection={['row', 'row']} justifyContent="space-between">
      <Box column width={['100%', '40%']}>
        <Label>Characters:</Label>

        <Flex column>
          <Button
            style={{ width: '100%' }}
            type="primary"
            shape="round"
            icon="plus"
            size="large"
            onClick={() => setEditCharacterVisibility(true)}
          >
            Add new Character
          </Button>

          <CharactersList
            data={data}
            onEditClick={onEditClick}
            loading={loading}
            error={error}
          />
        </Flex>
      </Box>

      <Drawer
        width={640}
        placement="left"
        closable={false}
        visible={editCharacterVisibility}
        onClose={onCharEditClose}
      >
        <Spin spinning={createLoading || updateLoading}>
          <EditForm
            data={charToEdit}
            onSubmit={async data => {
              try {
                if (data.id) {
                  await updateCharacter({ variables: data })
                } else {
                  await createCharacter({ variables: data })
                }
                notification.success({
                  message: `Character successfully ${data.id ? 'updated' : 'added'}`
                })
                refetch()
                setEditCharacterVisibility(false)
              } catch (error) {
                notification.error({
                  message: `Error while saving data: ${error.message}`
                })
              }

            }}
          />
        </Spin>
      </Drawer>
    </Flex>
  )
}
