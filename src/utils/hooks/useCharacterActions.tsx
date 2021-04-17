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
import { FormattedMessage, useIntl } from 'react-intl'

interface Props {
  onEditClose?: () => void
  onEditSuccess?: (data: Character) => void
  onDeleteClose?: () => void
  onDeleteSuccess?: (data: Character) => void
}
const defaultProps: Props = {}
export function useCharacterActions(props: Props = defaultProps) {
  const {
    onEditClose = noop,
    onEditSuccess = noop,
    onDeleteClose = noop,
    onDeleteSuccess = noop,
  } = props
  const intl = useIntl()
  const [characterToEdit, setCharacterToEdit] = useState<
    Character | undefined
  >()
  const [characterDrawerVisible, setCharacterDrawerVisible] = useState(false)
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
          message: intl.formatMessage({
            id: data.id ? 'character.edit.success' : 'character.create.success',
          }),
        })
        setCharacterToEdit(undefined)
        setCharacterDrawerVisible(false)
        onEditSuccess(data)
        onEditClose()
      } catch (error) {
        const message = error.graphQLErrors
          .map((err: any) => err.message)
          .join(' ,')
        notification.error({ message })
      }
    },
    [intl, onEditClose, onEditSuccess, updateCharacter, createCharacter],
  )
  const editCloseHandler = useCallback(() => {
    setCharacterToEdit(undefined)
    setCharacterDrawerVisible(false)
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
        message: intl.formatMessage({
          id: 'character.delete.success',
        }),
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

  const editDialog = useCharacterDrawer({
    character: characterToEdit,
    onClose: editCloseHandler,
    loading: createLoading || updateLoading,
    onSubmit: onFormSubmit,
    isVisible: characterDrawerVisible,
  })

  const deleteDialog = useCharacterDeletion({
    character: characterToDelete,
    onClose: deleteCloseHandler,
    onSubmit: onDeleteCharacter,
  })

  return {
    editCharacter: (data: Character) => {
      setCharacterToEdit(data)
      setCharacterDrawerVisible(true)
    },
    createCharacter: () => setCharacterDrawerVisible(true),
    deleteCharacter: (data: Character) => setCharacterToDelete(data),
    editDialog,
    deleteDialog,
  }
}

const FormContainer = styled.div`
  padding-top: 16px;
`

interface EditProps {
  character?: Character
  loading: boolean
  isVisible: boolean
  onClose: () => void
  onSubmit: (data: Character) => void
}
export function useCharacterDrawer({
  character,
  onClose,
  loading,
  onSubmit,
  isVisible,
}: EditProps) {
  const [cancelEditingConfirmation, setCancelEditingConfirmation] = useState(
    false,
  )
  const onCancel = useCallback(() => {
    onClose()
    setCancelEditingConfirmation(false)
  }, [onClose])
  const isEdit = !!character

  let CharacterForm
  if (character) {
    // Edit
    CharacterForm = Form.create({ mapPropsToFields: () => character })(
      EditCharacterForm,
    )
  } else {
    // Create
    CharacterForm = EditCharacterForm
  }

  return (
    <Box>
      <Drawer
        width={modalWidth()}
        placement="left"
        visible={isVisible}
        onClose={() => setCancelEditingConfirmation(true)}
        destroyOnClose
        closable
      >
        <Spin spinning={loading}>
          <FormContainer>
            <CharacterForm data={character} onSubmit={onSubmit} />
          </FormContainer>
        </Spin>
      </Drawer>

      {/* Cancel editing confirmation dialog */}
      <Modal
        title={
          <FormattedMessage
            id={isEdit ? 'common.cancelEditing' : 'common.cancelCreating'}
          />
        }
        visible={cancelEditingConfirmation}
        okText={<FormattedMessage id="common.cancel" />}
        onOk={() => onCancel()}
        cancelText={<FormattedMessage id="common.proceed" />}
        onCancel={() => setCancelEditingConfirmation(false)}
      >
        <p>
          <FormattedMessage
            id={
              isEdit
                ? 'common.cancelEditingMessage'
                : 'common.cancelCreatingMessage'
            }
          />
        </p>
      </Modal>
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
