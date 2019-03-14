import React from 'react'
import { Button, Input, Select } from 'antd'
import { Box } from 'noui/Position'
import Form, { Field } from 'noui/Form'
import { factions } from 'config'
import { Msg } from 'ui/Text'
import styled from 'styled-components'

const StyledFactionLogo = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`

const validationSchema = {
  name: {
    presence: true,
    length: {
      minimum: 6,
    },
  },
}

class NewCharacterForm extends React.PureComponent {
  state = {
    image: null,
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

              <Field name="faction">
                <Select placeholder="Faction">
                  {
                    factions.map(f =>
                      <Select.Option key={f.name} value={f.name}>
                        <Box inline mr={15}>
                          <StyledFactionLogo src={f.logo} alt="faction_logo"/>
                        </Box>

                        <Msg>{f.name}</Msg>
                      </Select.Option>,
                    )
                  }
                </Select>
              </Field>


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
