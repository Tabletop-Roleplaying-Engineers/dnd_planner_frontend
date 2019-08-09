import React from 'react'
import * as R from 'ramda'
import { Button, Input, Select, Spin } from 'antd'
import { Box } from 'noui/Position'
import Form, { Field } from 'noui/Form'
import { Msg } from 'ui/Text'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { FETCH_FACTIONS_QUERY } from 'api'
import ClassesSelector from '../../components/ClassesSelector'

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
  }
}

class NewCharacterForm extends React.PureComponent {
  state = {
    avatar: ''
  }
  
  render () {
  
    return (
      <Form
        onSubmit={this.props.onSubmit}
        validation={validationSchema}
      >
        {({form}) => {
          return (
            <Box>
              <Field name="name">
                <Input placeholder="Name"/>
              </Field>
              
              <Query query={FETCH_FACTIONS_QUERY}>
                {({loading, error, data}) => {
                  if (loading) return <Spin/>
                  if (error) return <div>Error</div>
                  
                  return (
                    <Field name="faction">
                      <Select placeholder="Faction">
                        {
                          data.factions.map(f =>
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
                  )
                }}</Query>
              
              <ClassesSelector
                name="class"
                value={
                  R.pipe(
                    R.split('&'),
                    R.map(R.split('=')),
                    R.fromPairs
                  )(form.getFieldValue('class') || '')
                }
                onSelect={({value, level, state}) => {
                  form.setFieldsValue({
                    class: R.pipe(
                      R.toPairs(),
                      R.map(([val, key]) => `${val}=${key}`),
                      R.join('&')
                    )(state.value)
                  })
                }}
              />
              
              <Box>
                <Field name="avatar">
                  <Input placeholder="Avatar URL" onChange={e => {
                    const ul = e.target.value.trim()
                    this.setState(() => ({ avatar: ul }))
                  }}/>
                </Field>
                
                {
                  this.state.avatar &&
                  <Image src={this.state.avatar} />
                }
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
                  Add new Character
                </Button>
              </Box>
            </Box>
          )
        }
        }
      </Form>
    )
  }
}

export default NewCharacterForm
