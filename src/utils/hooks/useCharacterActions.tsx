import React, { useCallback, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Drawer, Form, Modal, notification, Spin } from 'antd'
import { Box } from 'noui/Position'
import styled from 'styled-components'
import { Character } from 'types/character'
import EditCharacterForm from 'forms/EditCharacterForm'
import { modalWidth } from 'config'
import {
  CREATE_CHARACTER_MUTATION,
  DELETE_CHARACTER_MUTATION,
  FETCH_CHARACTERS_QUERY,
  UPDATE_CHARACTER_MUTATION,
} from 'api'
import { noop, omit } from 'utils/common'
import { FormattedMessage } from 'react-intl'

// TODO: translate

interface Props {
  onEditClose?: () => void
  onDeleteClose?: () => void
  onDeleteSuccess?: (data: Character) => void
}
const defaultProps: Props = {}
export function useCharacterActions(props: Props = defaultProps) {
  const {
    onEditClose = noop,
    onDeleteClose = noop,
    onDeleteSuccess = noop,
  } = props
  const [characterToEdit, setCharacterToEdit] = useState<Character | null>(null)
  const [characterToDelete, setCharacterToDelete] = useState<Character | null>(
    null,
  )
  const [createCharacter, createCharacterResult] = useMutation(
    CREATE_CHARACTER_MUTATION,
  )
  const createLoading = createCharacterResult.loading
  const [updateCharacter, updateCharacterResult] = useMutation(
    UPDATE_CHARACTER_MUTATION,
  )
  const updateLoading = updateCharacterResult.loading

  const onFormSubmit = useCallback(
    async (data) => {
      try {
        if (data.id) {
          await updateCharacter({ variables: omit(['name'], data) })
        } else {
          await createCharacter({ variables: data })
        }
        notification.success({
          message: `Character successfully ${data.id ? 'updated' : 'added'}`,
        })
        setCharacterToEdit(null)
        onEditClose()
      } catch (error) {
        const message = error.graphQLErrors
          .map((err: any) => err.message)
          .join(' ,')
        notification.error({ message })
      }
    },
    [onEditClose, updateCharacter, createCharacter],
  )
  const editCloseHandler = useCallback(() => {
    setCharacterToEdit(null)
    onEditClose()
  }, [onEditClose])
  const [deleteCharacter] = useMutation(DELETE_CHARACTER_MUTATION, {
    update(cache) {
      const cached = cache.readQuery<{ characters: Character[] }>({
        query: FETCH_CHARACTERS_QUERY,
      })
      if (!cached || !characterToDelete) {
        return
      }
      const { characters } = cached
      cache.writeQuery({
        query: FETCH_CHARACTERS_QUERY,
        data: {
          characters: characters.filter((c) => c.id !== characterToDelete.id),
        },
      })
    },
  })
  const onDeleteCharacter = async (data: Character) => {
    try {
      setCharacterToDelete(null)
      await deleteCharacter({ variables: { id: data.id } })

      notification.success({
        message: `Character successfully deleted`,
      })
      onDeleteSuccess(data)
    } catch (error) {
      const message = error.graphQLErrors
        .map((err: any) => err.message)
        .join(' ,')
      notification.error({ message })
    }
  }
  const deleteCloseHandler = useCallback(() => {
    setCharacterToDelete(null)
    onDeleteClose()
  }, [onDeleteClose])

  const editDialog = useCharacterEditDrawer({
    character: characterToEdit,
    onClose: editCloseHandler,
    loading: createLoading || updateLoading,
    onSubmit: onFormSubmit,
  })

  const deleteDialog = useCharacterDeletion({
    character: characterToDelete,
    onClose: deleteCloseHandler,
    onSubmit: onDeleteCharacter,
  })

  return {
    editCharacter: (data: Character) => setCharacterToEdit(data),
    deleteCharacter: (data: Character) => setCharacterToDelete(data),
    editDialog,
    deleteDialog,
  }
}

const FormContainer = styled.div`
  padding-top: 16px;
`

interface EditProps {
  character: Character | null
  loading: boolean
  onClose: () => void
  onSubmit: (data: Character) => void
}
export function useCharacterEditDrawer({
  character,
  onClose,
  loading,
  onSubmit,
}: EditProps) {
  let EditForm
  if (character) {
    EditForm = Form.create({ mapPropsToFields: () => character })(
      EditCharacterForm,
    )
  } else {
    EditForm = EditCharacterForm
  }

  return (
    <Box>
      <Drawer
        width={modalWidth()}
        placement="left"
        visible={!!character}
        onClose={onClose}
        destroyOnClose
        closable
      >
        <Spin spinning={loading}>
          <FormContainer>
            <EditForm data={character as any} onSubmit={onSubmit} />
          </FormContainer>
        </Spin>
      </Drawer>
    </Box>
  )
}

interface DeleteProps {
  character: Character | null
  onClose: () => void
  onSubmit: (data: Character) => void
}
export function useCharacterDeletion({
  character,
  onSubmit,
  onClose,
}: DeleteProps) {
  const onSubmitHandler = useCallback(() => character && onSubmit(character), [
    character,
    onSubmit,
  ])

  return (
    <Modal
      title={<FormattedMessage id="character.delete" />}
      visible={!!character}
      onOk={onSubmitHandler}
      onCancel={onClose}
    >
      <p>
        <FormattedMessage
          id="character.deleteMessage"
          values={{ name: character?.name || '' }}
        />
      </p>
    </Modal>
  )
}
