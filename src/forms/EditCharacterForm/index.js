import React, { useState, useEffect, useCallback, useMemo } from 'react'
import * as R from 'ramda'
import { Button, Input, Select, Spin, Alert } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import { Box } from 'noui/Position'
import Form, { Field } from 'noui/Form'
import { Msg } from 'ui/Text'
import styled from 'styled-components'
import { FETCH_FACTIONS_QUERY } from 'api'
import ClassesSelector from '../../components/ClassesSelector'
import {
  convertClassesObjToString,
  convertClassesStringToObj,
} from '../../utils/common'
import { FormattedMessage, useIntl } from 'react-intl'

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

const useValidation = () => {
  const intl = useIntl()

  return useMemo(() => ({
    name: {
      presence: {
        message: intl.formatMessage({ id: 'validation.name.required' }),
      },
      length: {
        message: intl.formatMessage(
          { id: 'validation.name.length' },
          { number: 3 },
        ),
        minimum: 3,
      },
    },
    faction: {
      presence: {
        allowEmpty: false,
        message: intl.formatMessage({ id: 'validation.faction.required' }),
      },
    },
    class: {
      presence: {
        allowEmpty: false,
        message: intl.formatMessage({ id: 'validation.class.required' }),
      },
    },
    avatar: {
      presence: {
        message: intl.formatMessage({ id: 'validation.avatar.required' }),
      },
      linkToImage: {
        message: intl.formatMessage({ id: 'character.avatar.invalidUrl' }),
      },
    },
  }))
}

const EditCharacterForm = ({ data, onSubmit }) => {
  const intl = useIntl()
  const [avatar, setAvatar] = useState()
  const validationSchema = useValidation()
  const { loading, error, data: factionsQueryResult } = useQuery(
    FETCH_FACTIONS_QUERY,
  )
  const isCreating = !data
  const onAvatarInputChanged = useCallback(e => {
    setAvatar(e.target.value.trim())
  }, [])

  useEffect(() => setAvatar(data && data.avatar), [])

  if (loading) {
    return <Spin />
  }

  if (error) {
    return <Alert message={error.message} type="error" />
  }

  const { factions } = factionsQueryResult

  return (
    <Form
      onSubmit={values => onSubmit({ id: data && data.id, ...values })}
      validation={validationSchema}
    >
      {({ form }) => {
        return (
          <Box>
            {/* Name */}
            {isCreating && (
              <Field name="name" initialValue={data && data.name}>
                <Input
                  placeholder={intl.formatMessage({ id: 'common.name' })}
                  data-testid="input-name"
                />
              </Field>
            )}
            {!isCreating && (
              <CharacterName fontSize="18px">{data && data.name}</CharacterName>
            )}

            {/* Faction */}
            <Field name="faction" initialValue={data && data.faction.id}>
              <Select
                placeholder={intl.formatMessage({ id: 'common.faction' })}
                data-testid="select-faction"
              >
                {factions.map(f => (
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
            </Field>

            {/* Class */}
            <ClassesSelector
              name="class"
              value={R.pipe(
                R.split('&'),
                R.map(R.split('=')),
                R.fromPairs,
              )(form.getFieldValue('class') || '')}
              onSelect={({ state }) => {
                form.setFieldsValue({
                  class: convertClassesObjToString(state.value),
                })
              }}
              initialValue={data && convertClassesStringToObj(data.class)}
            />

            {/* Avatar */}
            <Box>
              <Field name="avatar" initialValue={data && data.avatar}>
                <Input
                  placeholder={intl.formatMessage({ id: 'common.avatarUrl' })}
                  onChange={onAvatarInputChanged}
                  data-testid="input-avatar"
                />
              </Field>

              {avatar && <Image src={avatar} />}
            </Box>

            {/* Submit */}
            <Box mt={20}>
              <Button
                style={{ width: '100%' }}
                htmlType="submit"
                type="primary"
                shape="round"
                icon="plus"
                size="large"
                disabled={form.hasErrors() || form.isFieldsValidating()}
                data-testid="save-btn"
              >
                <FormattedMessage id="common.save" />
              </Button>
            </Box>
          </Box>
        )
      }}
    </Form>
  )
}

export default EditCharacterForm
