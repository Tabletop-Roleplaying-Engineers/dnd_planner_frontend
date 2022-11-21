import React, { useState, useEffect, useCallback, ChangeEvent } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import * as R from 'ramda'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Input, Select, Spin, Alert, Form } from 'antd'
import { useQuery } from '@apollo/client'
import { Box } from 'noui/Position'
import { Msg } from 'ui/Text'
import { Editor } from 'ui/Editor'
import styled from 'styled-components'
import { FETCH_FACTIONS_QUERY } from 'api'
import ClassesSelector from '../../components/ClassesSelector'
import {
  convertClassesObjToString,
  convertClassesStringToObj,
} from '../../utils/common'
import { Character } from 'types/character'
import { Faction } from 'types/faction'
import { validateUrlToPointToAnImage } from 'utils/validations'

const Image = styled.img`
  max-height: 20vh;
  object-fit: contain;
`

const StyledFactionLogo = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`

const CharacterName = styled(Msg)`
  padding-bottom: 20px;
`

const NotesField = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 5px;
`

interface Props {
  data?: Character
  onSubmit: (data: Character) => void
}
const EditCharacterForm: React.FC<Props> = ({ data, onSubmit }) => {
  const intl = useIntl()
  const [avatar, setAvatar] = useState<string>()
  const {
    loading,
    error,
    data: factionsQueryResult,
  } = useQuery(FETCH_FACTIONS_QUERY)
  const isCreating = !data
  const onAvatarInputChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setAvatar(e.target.value.trim())
    },
    [],
  )

  useEffect(() => setAvatar(data && data.avatar), [data])

  if (loading) {
    return <Spin />
  }

  if (error) {
    return <Alert message={error.message} type="error" />
  }

  const { factions } = factionsQueryResult
  const parseClasses = (str: string) => {
    const split = R.pipe(R.split('&'), R.map(R.split('=')))(str) as unknown as [
      string,
      string,
    ][]

    return R.fromPairs(split)
  }
  const classes = parseClasses(data?.class || '')

  return (
    <Form onFinish={(values) => onSubmit({ id: data && data.id, ...values })}>
      <Box>
        {/* Name */}
        {isCreating && (
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'validation.name.required' }),
              },
              {
                min: 3,
                message: intl.formatMessage(
                  { id: 'validation.name.length' },
                  { number: 3 },
                ),
              },
            ]}
          >
            <Input
              placeholder={intl.formatMessage({ id: 'common.name' })}
              data-testid="input-name"
            />
          </Form.Item>
        )}
        {!isCreating && (
          <CharacterName fontSize="18px">{data && data.name}</CharacterName>
        )}

        {/* Faction */}
        <Form.Item
          name="faction"
          initialValue={data && data.faction.id}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'validation.faction.required',
              }),
            },
          ]}
        >
          <Select
            placeholder={intl.formatMessage({ id: 'common.faction' })}
            data-testid="select-faction"
          >
            {factions.map((f: Faction) => (
              <Select.Option
                key={f.name}
                value={f.id}
                data-testid={`select-option-faction-${f.name}`}
              >
                <Box inline mr={15}>
                  <StyledFactionLogo src={f.logo} alt="faction_logo" />
                </Box>

                <Msg>{f.name}</Msg>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Class */}
        <Form.Item shouldUpdate>
          {(form) => {
            return (
              <ClassesSelector
                initialValue={data && convertClassesStringToObj(data.class)}
                name="class"
                value={classes}
                onSelect={({ state }) => {
                  if (state.selectedClasses.length === 0) {
                    form.validateFields(['class'])
                  }
                  form.setFieldsValue({
                    class: convertClassesObjToString(state.value),
                  })
                }}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'validation.class.required',
                    }),
                  },
                ]}
              />
            )
          }}
        </Form.Item>

        {/* Avatar */}
        <Box my="20px">
          <Form.Item
            name="avatar"
            initialValue={data && data.avatar}
            rules={[
              {
                validator: (_, value) => {
                  return validateUrlToPointToAnImage(value, {
                    message: intl.formatMessage({
                      id: 'character.avatar.invalidUrl',
                    }),
                  })
                },
              },
            ]}
          >
            <Input
              placeholder={intl.formatMessage({ id: 'common.avatarUrl' })}
              onChange={onAvatarInputChanged}
              data-testid="input-avatar"
            />
          </Form.Item>

          {avatar && <Image src={avatar} />}
        </Box>

        {/* Notes */}
        <Form.Item shouldUpdate>
          {(form) => {
            return (
              <NotesField>
                <div style={{ height: 0 }}>
                  <Form.Item name="notes" initialValue={data?.notes || ''}>
                    <Input style={{ display: 'none' }} />
                  </Form.Item>
                </div>
                <Editor
                  value={data?.notes || ''}
                  placeholder={intl.formatMessage({
                    id: 'character.note.placeholder',
                  })}
                  onChange={(text: string) => {
                    form.setFieldsValue({
                      notes: text,
                    })
                  }}
                />
              </NotesField>
            )
          }}
        </Form.Item>

        {/* Submit */}
        <Box mt={20}>
          <Button
            style={{ width: '100%' }}
            htmlType="submit"
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
            size="large"
            data-testid="save-btn"
          >
            <FormattedMessage id="common.save" />
          </Button>
        </Box>
      </Box>
    </Form>
  )
}

export default EditCharacterForm
