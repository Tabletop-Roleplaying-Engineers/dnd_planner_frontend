import React, { useState } from 'react'
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
  avatar: {
    presence: true,
  },
}

const EditCharacterForm = ({ data, onSubmit }) => {
  const [avatar, setAvatar] = useState()
  const { loading, error, data: factionsQueryResult } = useQuery(FETCH_FACTIONS_QUERY);
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
            <Field name="name" initialValue={data && data.name}>
              <Input placeholder="Name"/>
            </Field>

            <Field name="faction" initialValue={data && data.faction.id}>
              <Select placeholder="Faction">
                {
                  factions.map(f =>
                    <Select.Option key={f.name} value={f.id}>
                      <Box inline mr={15}>
                        <StyledFactionLogo src={f.logo} alt="faction_logo"/>
                      </Box>

                      <Msg>{f.name}</Msg>
                    </Select.Option>
                  )
                }
              </Select>
            </Field>

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

            <Box>
              <Field name="avatar" initialValue={data && data.avatar}>
                <Input placeholder="Avatar URL" onChange={e => setAvatar(e.target.value.trim())}/>
              </Field>

              {avatar && <Image src={avatar} />}
            </Box>

            <Box mt={20}>
              <Button
                style={{width: '100%'}}
                htmlType="submit"
                type="primary"
                shape="round"
                icon="plus"
                size="large"
                disabled={form.hasErrors()}
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
