import React from 'react'
import { Button, Upload, Icon, Input, Select, DatePicker, TimePicker, Slider } from 'antd'
import { Box, Flex } from 'noui/Position'
import Form, { Field } from 'noui/Form'
import { Msg } from 'ui/Text'
import styled from 'styled-components'
import { playersInGame } from 'config'

const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 300px;
`

class NewGameForm extends React.PureComponent {
  state = {
    image: null
  }
  
  render () {
    const { image } = this.state
    
    return (
      <Form onSubmit={(data) => {
        debugger
      }}>
        {({ form }) =>
          <Box>
            
            <Button>Participate</Button>
          </Box>
        }
      </Form>
    )
  }
}

export default NewGameForm
