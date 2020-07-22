import React, { useState, useCallback, useRef, useEffect } from 'react'
import * as R from 'ramda'
import moment from 'moment'
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
  Tag,
  ConfigProvider,
} from 'antd'
import { Box, Flex } from 'noui/Position'
import Form, { Field } from 'noui/Form'
import { Msg, Header } from 'ui/Text'
import styled from 'styled-components'
import { playersInGame } from 'config'
import uk_UA from 'antd/lib/locale-provider/uk_UA'
import 'moment/locale/uk'

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
    presence: { allowEmpty: false },
  },
  date: {
    presence: { allowEmpty: false },
  },
  time: {
    presence: { allowEmpty: false },
  },
  players: {
    presence: { allowEmpty: false },
  },
  description: {
    presence: { allowEmpty: false },
  },
}

// Needs to show ant.design `DatePicked` with UA formatting
moment.locale('uk')

const GameForm = props => {
  const { onSubmit, initialValues = { tags: [] }, showSharing } = props
  console.log('=-= initialValues', initialValues)
  const isEdit = !!initialValues.id

  const [tags, setTags] = useState(initialValues.tags)
  const [newTag, setNewTag] = useState('')
  const [showTagInput, setShowTagInput] = useState()
  const inputTag = useRef(null)

  const [image, setImage] = useState(initialValues ? initialValues.image : null)
  const [fileList, setFileList] = useState([])

  const handleNewTagClick = useCallback(() => {
    setShowTagInput(true)
  }, [])

  useEffect(() => {
    if (inputTag.current) inputTag.current.focus()
  }, [showTagInput])

  const handleNewTagConfirm = useCallback(() => {
    if (newTag) setTags([...tags, newTag])
    setNewTag('')
    setShowTagInput(false)
  }, [newTag])

  return (
    <Form
      validation={validationSchema}
      onSubmit={({ date, time, range, ...data }, form) => {
        const game = {
          id: initialValues.id,
          ...data,
          image: image,
          startingDate: new Date(
            `${date.format('YYYY-MM-DD')} ${time.format('HH:mm')}`,
          ),
          lvlFrom: range[0],
          lvlTo: range[1],
          tags,
        }
        onSubmit(game, form)
      }}
    >
      {({ form }) => (
        <Box>
          <Box mb={20}>
            {isEdit ? (
              <Header>Edit Game</Header>
            ) : (
              <Header>Add new Game</Header>
            )}
          </Box>

          {/* Image */}
          <Flex column mb={20}>
            <Field name="image" initialValue={image}>
              <Upload.Dragger
                accept="image/*"
                beforeUpload={file => {
                  const fr = new FileReader()
                  fr.onload = () => setImage(fr.result)
                  fr.readAsDataURL(file)
                  setFileList([file])

                  return false
                }}
                onRemove={e => {
                  setFileList([])
                  setImage(null)
                  form.setFieldsValue({
                    image: null,
                  })
                }}
                fileList={fileList}
              >
                {image ? (
                  <StyledImage src={image} />
                ) : (
                  <>
                    <Msg className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </Msg>
                    <Msg className="ant-upload-text">
                      Click or drag file to this area to upload
                    </Msg>
                  </>
                )}
              </Upload.Dragger>
            </Field>
          </Flex>

          {/* Title */}
          <Flex column>
            <Box>
              <Field
                initialValue={initialValues && initialValues.title}
                name="title"
              >
                <Input placeholder="Title" />
              </Field>
            </Box>

            {/* Levels */}
            <Box>
              <Msg>Select min-max levels</Msg>

              <Field
                initialValue={
                  initialValues && initialValues.lvlFrom && initialValues.lvlTo
                    ? [initialValues.lvlFrom, initialValues.lvlTo]
                    : [1, 4]
                }
                name="range"
              >
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
                  )(null)}
                />
              </Field>
            </Box>
          </Flex>

          <Flex justifyContent="space-between">
            {/* Date */}
            <ConfigProvider locale={uk_UA}>
              <Field
                name="date"
                initialValue={
                  initialValues &&
                  initialValues.startingDate &&
                  moment(initialValues.startingDate)
                }
              >
                <DatePicker />
              </Field>
            </ConfigProvider>

            {/* Time */}
            <ConfigProvider locale={uk_UA}>
              <Field
                name="time"
                initialValue={
                  initialValues &&
                  initialValues.startingDate &&
                  moment(initialValues.startingDate)
                }
              >
                <TimePicker format="HH:mm" minuteStep={10} />
              </Field>
            </ConfigProvider>

            {/* Players */}
            <Box width="30%">
              <Field
                name="players"
                initialValue={initialValues && initialValues.players}
              >
                <Select placeholder="Players count">
                  {playersInGame.map(p => (
                    <Select.Option key={p} value={p}>
                      {p}
                    </Select.Option>
                  ))}
                </Select>
              </Field>
            </Box>
          </Flex>

          {/* Description */}
          <Field
            name="description"
            initialValue={initialValues && initialValues.description}
          >
            <Input.TextArea rows={6} placeholder="Description" />
          </Field>

          <Row>
            <Col span={12}>
              <Field name="telegramPost" initialValue={false}>
                <Checkbox disabled={!showSharing}>Post in Telegram</Checkbox>
              </Field>
            </Col>
            <Col span={12}>
              <Field name="facebookPost" initialValue={false}>
                <Checkbox disabled={!showSharing}>Post in Facebook</Checkbox>
              </Field>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              {tags.map((tag, idx) => (
                <Tag
                  key={tag}
                  closable
                  onClose={e => {
                    e.preventDefault()
                    setTags(R.remove(idx, 1, tags))
                  }}
                >
                  {tag}
                </Tag>
              ))}

              {showTagInput && (
                <Input
                  ref={inputTag}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={newTag}
                  onChange={e => setNewTag(e.target.value)}
                  onBlur={handleNewTagConfirm}
                  onPressEnter={handleNewTagConfirm}
                />
              )}

              {!showTagInput && (
                <Tag
                  style={{ background: '#fff', borderStyle: 'dashed' }}
                  onClick={handleNewTagClick}
                >
                  <Icon type="plus" /> New Tag
                </Tag>
              )}
            </Col>
          </Row>

          <Box mt={15}>
            <Button disabled={form.hasErrors()} htmlType="submit">
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </Form>
  )
}

export default GameForm
