import React, { useState, useCallback } from 'react'
import * as R from 'ramda'
import { useQuery } from '@apollo/react-hooks'
import {
  Button,
  Upload,
  Icon,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Slider,
  Checkbox,
  Row,
  Col,
  Spin,
} from 'antd'
import { Box, Flex } from 'noui/Position'
import Form, { Field } from 'noui/Form'
import { Msg, Header } from 'ui/Text'
import styled from 'styled-components'
import { playersInGame } from 'config'
import { TAGS_QUERY } from 'api'
import { TAGS2TEXT } from '../../constants'

const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 300px;
`

const validationSchema = {
  image: {
    presence: true,
  },
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

const NewGameForm = (props) => {
  const { onSubmit, initialValue } = props
  const { loading, data = {} } = useQuery(TAGS_QUERY);
  const { tags = [] } = data
  const [image, setImage] = useState(null)
  const [fileList, setFileList] = useState([])
  const [selectedTags, setSelectedTags] = useState(new Set())
  const tagClick = useCallback((tag) => {
    if (selectedTags.has(tag.id)) {
      selectedTags.delete(tag.id)
    } else {
      selectedTags.add(tag.id)
    }

    setSelectedTags(new Set(selectedTags))
  }, [selectedTags])

  if (loading) {
    return <Spin />
  }

  return (
    <Form
      validation={validationSchema}
      onSubmit={({date, time, range, ...data}, form) => {
        const game = {
          ...data,
          image: image,
          startingDate: new Date(`${date.format('YYYY-MM-DD')} ${time.format('HH:mm')}`),
          lvlFrom: range[0],
          lvlTo: range[1],
          tags: [...selectedTags.values()],
        }
        onSubmit(game, form)
      }}>
      {({form}) =>
        <Box>
          <Box mb={20}>
            <Header>Add new Game</Header>
          </Box>

          {/* Image */}
          <Flex column mb={20}>
            <Field name="image">
              <Upload.Dragger
                accept="image/*"
                beforeUpload={file => {
                  const fr = new FileReader()
                  fr.onload = () => setImage(fr.result)
                  fr.readAsDataURL(file)
                  setFileList([file])

                  return false
                }}
                onRemove={(e) => {
                  setFileList([])
                  setImage(null)
                  form.setFieldsValue({
                    image: null
                  })
                }}
                fileList={fileList}
              >
                {
                  image
                    ? <StyledImage src={image}/>
                    : (
                      <>
                        <Msg className="ant-upload-drag-icon">
                          <Icon type="inbox"/>
                        </Msg>
                        <Msg className="ant-upload-text">Click or drag file to this area to upload</Msg>
                      </>
                    )
                }
              </Upload.Dragger>
            </Field>
          </Flex>

          {/* Title */}
          <Flex column>
            <Box>
              <Field name="title">
                <Input placeholder="Title"/>
              </Field>
            </Box>

            {/* Levels */}
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
            {/* Date */}
            <Field name="date" initialValue={initialValue && initialValue.date}>
              <DatePicker/>
            </Field>

            {/* Time */}
            <Field name="time">
              <TimePicker format="HH:mm" minuteStep={10}/>
            </Field>

            {/* Players */}
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

          {/* Description */}
          <Field name="description">
            <Input.TextArea rows={6} placeholder="Description"/>
          </Field>

          <Row>
            <Col span={12}>
              <Field name="telegramPost" initialValue={false}>
                <Checkbox >Post in Telegram</Checkbox>
              </Field>
            </Col>
            <Col span={12}>
              <Field name="facebookPost" initialValue={false}>
                <Checkbox >Post in Facebook</Checkbox>
              </Field>
            </Col>
          </Row>
          <Row>
            {tags.map(tag => (
              <Col span={12} key={tag.id}>
                <Checkbox checked={selectedTags.has(tag.id)} onChange={() => tagClick(tag)}>{TAGS2TEXT[tag.name]}</Checkbox>
              </Col>
            ))}
          </Row>

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

export default NewGameForm
