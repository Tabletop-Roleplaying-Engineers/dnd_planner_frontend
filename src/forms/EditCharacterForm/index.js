import React, { useState, useEffect } from 'react'
import * as R from 'ramda'
import { Button, Input, Select, Spin, Alert } from 'antd'
import { useQuery } from '@apollo/react-hooks';
import { Box } from 'noui/Position'
import Form, { Field } from 'noui/Form'
import { Msg } from 'ui/Text'
import styled from 'styled-components'
import { FETCH_FACTIONS_QUERY } from 'api'
import ClassesSelector from '../../components/ClassesSelector'
import { convertClassesObjToString, convertClassesStringToObj } from '../../utils/common'

const Image = styled.img`
  max-height: 20vh;
  object-fit: contain;
`;

const StyledFactionLogo = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`

const CharacterName = styled(Msg)`
  padding-bottom: 20px;
`

const validationSchema = {
  name: {
    presence: true,
    length: {
      minimum: 3
    }
  },
  faction: {
    presence: {allowEmpty: false}
  },
  class: {
    presence: {allowEmpty: false}
  },
  avatar: {
    presence: true,
  },
}

const EditCharacterForm = ({ data, onSubmit }) => {
  const [avatar, setAvatar] = useState()
  const { loading, error, data: factionsQueryResult } = useQuery(FETCH_FACTIONS_QUERY);
  const isCreating = !data

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
      {({form}) => {
        return (
          <Box>
            {/* Name */}
            {isCreating && (
              <Field name="name" initialValue={data && data.name}>
                <Input placeholder="Name" data-testid="input-name" />
              </Field>
            )}
            {!isCreating && (
              <CharacterName fontSize="18px">{data && data.name}</CharacterName>
            )}

            {/* Faction */}
            <Field name="faction" initialValue={data && data.faction.id}>
              <Select placeholder="Faction" data-testid="select-faction">
                {
                  factions.map(f =>
                    <Select.Option key={f.name} value={f.id} data-testid={`select-option-faction-${f.name}`}>
                      <Box inline mr={15}>
                        <StyledFactionLogo src={f.logo} alt="faction_logo"/>
                      </Box>

                      <Msg>{f.name}</Msg>
                    </Select.Option>
                  )
                }
              </Select>
            </Field>

            {/* Class */}
            <ClassesSelector
              name="class"
              value={
                R.pipe(
                  R.split('&'),
                  R.map(R.split('=')),
                  R.fromPairs
                )(form.getFieldValue('class') || '')
              }
              onSelect={({ state }) => {
                form.setFieldsValue({
                  class: convertClassesObjToString(state.value)
                })
              }}
              initialValue={data && convertClassesStringToObj(data.class)}
            />

            {/* Avatar */}
            <Box>
              <Field name="avatar" initialValue={data && data.avatar}>
                <Input
                  placeholder="Avatar URL"
                  onChange={e => setAvatar(e.target.value.trim())}
                  data-testid="input-avatar"
                />
              </Field>

              {avatar && <Image src={avatar} />}
            </Box>

            {/* Submit */}
            <Box mt={20}>
              <Button
                style={{width: '100%'}}
                htmlType="submit"
                type="primary"
                shape="round"
                icon="plus"
                size="large"
                disabled={form.hasErrors()}
                data-testid="save-btn"
              >
                Save
              </Button>
            </Box>
          </Box>
        )
      }
      }
    </Form>
  )
}

export default EditCharacterForm
