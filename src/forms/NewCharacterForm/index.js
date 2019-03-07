import React from 'react'
import { Button, Input } from 'antd'
import { Box } from 'noui/Position'
import Form, { Field } from 'noui/Form'

class NewCharacterForm extends React.PureComponent {
  state = {
    image: null
  }
  
  render () {
    return (
      <Form onSubmit={this.props.onSubmit}>
        {({ form }) =>
          <Box>
            <Field name="name">
              <Input placeholder="Name"/>
            </Field>
            
            <Button htmlType="submit">Create</Button>
          </Box>
        }
      </Form>
    )
  }
}

export default NewCharacterForm
