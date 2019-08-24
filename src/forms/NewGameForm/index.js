import React from 'react'
import { Button, Upload, Icon, Input, Select, DatePicker, TimePicker, Slider } from 'antd'
import { Box, Flex } from 'noui/Position'
import Form, { Field } from 'noui/Form'
import { Msg, Header } from 'ui/Text'
import styled from 'styled-components'
import { playersInGame } from 'config'
import * as R from 'ramda'

const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 300px;
`

const validationSchema = {
  title: {
    presence: true,
    length: {
      minimum: 6,
    },
  },
  range: {
    presence: {allowEmpty: false},
  },
  date: {
    presence: {allowEmpty: false},
  },
  time: {
    presence: {allowEmpty: false},
  },
  players: {
    presence: {allowEmpty: false},
  },
  description: {
    presence: {allowEmpty: false},
  },
}

class NewGameForm extends React.PureComponent {
  state = {
    image: null,
  }

  componentWillUnmount () {
    this.setState({image: null})
  }

  render () {
    const {image} = this.state

    return (
      <Form
        validation={validationSchema}
        onSubmit={({date, time, range, ...data}, form) => {
          const game = {
            image: this.state.image,
            startingDate: new Date(`${date.format('YYYY-MM-DD')} ${time.format('HH:mm')}`),
            lvlFrom: range[0],
            lvlTo: range[1],
            ...data,
          }
          this.props.onSubmit(game, form)
        }}>
        {({form}) =>
          <Box>
            <Box mb={20}>
              <Header>Add new Game</Header>
            </Box>

            <Flex column mb={20}>
              <Upload.Dragger
                beforeUpload={file => {
                  const fr = new FileReader()
                  fr.onload = () => this.setState({image: fr.result})
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

            <Flex column>
              <Box>
                <Field name="title">
                  <Input placeholder="Title"/>
                </Field>
              </Box>

              <Box>
                <Msg>Select min-max levels</Msg>

                <Field initialValue={[1, 4]} name="range">
                  <Slider
                    range
                    step={1}
                    min={1}
                    max={20}
                    marks={R.pipe(
                      R.repeat(R.__, 20),
                      R.addIndex(R.map)((v, idx) => ++idx),
                      R.map(n => [n, n]),
                      R.fromPairs,
                    )(null)
                    }
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

            <Button
              disabled={form.hasErrors()}
              htmlType="submit"
            >
              Submit
            </Button>
          </Box>
        }
      </Form>
    )
  }
}

export default NewGameForm
