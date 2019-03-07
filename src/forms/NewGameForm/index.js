import React from 'react'
import { Button, Upload, Icon, Input, Select, DatePicker, TimePicker, Slider } from 'antd'
import { Box, Flex } from 'noui/Position'
import Form, { Field } from 'noui/Form'
import { Msg, Header } from 'ui/Text'
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
      <Form onSubmit={({ date, time, ...data }) => {
        const game = {
          image: this.state.image,
          startingDate: date.format('YYYY-MM-DD'),
          startingTime: time.format('HH:mm'),
          ...data
        }
        this.props.onSubmit(game)
      }}>
        {({ form }) =>
          <Box>
            <Box mb={20}>
              <Header>Add new Game</Header>
            </Box>
            
            <Flex column mb={20}>
              <Upload.Dragger
                beforeUpload={file => {
                  const fr = new FileReader()
                  fr.onload = () => this.setState({ image: fr.result })
                  fr.readAsDataURL(file)
                  
                  return false
                }}
              >
                {
                  image
                    ? <StyledImage src={image}/>
                    : <React.Fragment>
                      <Msg className="ant-upload-drag-icon">
                        <Icon type="inbox"/>
                      </Msg>
                      <Msg className="ant-upload-text">Click or drag file to this area to upload</Msg>
                    </React.Fragment>
                }
              </Upload.Dragger>
            </Flex>
            
            <Flex justifyContent="space-between">
              <Box width="55%">
                <Field name="title">
                  <Input placeholder="Title"/>
                </Field>
              </Box>
  
              <Box width="40%">
                <Field initialValue={[1, 4]} name="range">
                  <Slider
                    range
                    step={1}
                    min={1}
                    max={8}
                    marks={{
                      1: '1',
                      4: '4',
                      5: '5',
                      8: '8'
                    }}
                  />
                </Field>
              </Box>
            </Flex>
            
            <Flex justifyContent="space-between">
              <Field name="date">
                <DatePicker/>
              </Field>
              
              <Field name="time">
                <TimePicker format="HH:mm" minuteStep={10}/>
              </Field>
              
              <Box width="30%">
                <Field name="players">
                  <Select placeholder="Players count">
                    {
                      playersInGame.map(p => <Select.Option key={p} value={p}>{p}</Select.Option>)
                    }
                  </Select>
                </Field>
              </Box>
            </Flex>
            
            <Field name="description">
              <Input.TextArea rows={6} placeholder="Description"/>
            </Field>
            
            <Button htmlType="submit">Submit</Button>
          </Box>
        }
      </Form>
    )
  }
}

export default NewGameForm
