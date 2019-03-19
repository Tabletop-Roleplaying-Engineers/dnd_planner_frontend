import React from 'react'
import { Button, Input, Select, Spin } from 'antd'
import { Box } from 'noui/Position'
import Form, { Field } from 'noui/Form'
import { Msg } from 'ui/Text'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { FETCH_FACTIONS_QUERY } from 'api'

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
    presence: { allowEmpty: false }
  }
}

class NewCharacterForm extends React.PureComponent {
  state = {
    image: null
  }

  render() {
    return (
      <Form
        onSubmit={this.props.onSubmit}
        validation={validationSchema}
      >
        {({ form }) => {
          return (
            <Box>
              <Field
                name="name"
              >
                <Input placeholder="Name"/>
              </Field>

              <Query query={FETCH_FACTIONS_QUERY}>
                {({ loading, error, data }) => {
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

              <Button
                disabled={form.hasErrors()}
                htmlType="submit"
              >
                Create
              </Button>
            </Box>
          )
        }
        }
      </Form>
    )
  }
}

export default NewCharacterForm
