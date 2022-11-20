import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import * as R from 'ramda'
import moment from 'moment'
import { InboxOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Upload,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Slider,
  Checkbox,
  Row,
  Col,
  Tag,
  Form,
} from 'antd'
import { Box, Flex } from 'noui/Position'
import { Msg, Header } from 'ui/Text'
import styled from 'styled-components'
import { playersInGame } from 'config'
import 'moment/locale/uk'
import { UsersSelect } from 'components/UsersSelect/UsersSelect'
import { useIntl, FormattedMessage } from 'react-intl'
import dayjs from 'dayjs'
// Needs to show ant.design `DatePicked` with UA formatting
moment.locale('uk')

const GameForm = (props) => {
  const intl = useIntl()
  const {
    onSubmit,
    initialValues = { tags: [] },
    showSharing,
    users = [],
    withMasterField,
    user,
  } = props
  const isEdit = !!initialValues.id
  const usersWithLocals = useMemo(() => {
    const clone = [...users]
    if (initialValues.user) {
      const exist = !!clone.find((u) => u.id === initialValues.user.id)
      if (!exist) {
        clone.push(initialValues.user)
      }
    }
    if (user) {
      const exist = !!clone.find((u) => u.id === user.id)
      if (!exist) {
        clone.push(user)
      }
    }

    return clone
  }, [users, initialValues, user])
  const initialMaster =
    (initialValues.user && initialValues.user.id) || (user && user.id)

  const [tags, setTags] = useState(initialValues.tags)
  const [newTag, setNewTag] = useState('')
  const [showTagInput, setShowTagInput] = useState()
  const inputTag = useRef(null)

  const initialDate = useMemo(() => {
    return (
      initialValues &&
      initialValues.startingDate &&
      dayjs(initialValues.startingDate)
    )
  }, [initialValues])

  const [image, setImage] = useState(initialValues ? initialValues.image : null)
  const [fileList, setFileList] = useState([])
  const [userId, setUserId] = useState()

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
  }, [newTag, tags])

  return (
    <Form
      onFinish={({ date, time, range, ...data }, form) => {
        const dateToSave = date.minute(time.minute()).hour(time.hour())
        const game = {
          id: initialValues.id,
          ...data,
          image: image,
          startingDate: dateToSave,
          lvlFrom: range[0],
          lvlTo: range[1],
          tags,
          userId,
        }
        onSubmit(game, form)
      }}
      data-testid="game-form"
    >
      <Box>
        <Box mb={20}>
          {isEdit ? (
            <Header>
              <FormattedMessage id="gameForm.editNewGame" />
            </Header>
          ) : (
            <Header>
              <FormattedMessage id="gameForm.addNewGame" />
            </Header>
          )}
        </Box>

        {/* Master */}
        {withMasterField && (
          <Box mb={20}>
            <UsersSelect
              users={usersWithLocals}
              onChange={(value) => setUserId(value && value.id)}
              initial={initialMaster}
            />
          </Box>
        )}

        {/* Image */}
        <Flex column mb={20} data-testid="image-field-wrapper">
          <Form.Item
            name="image"
            initialValue={image}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'validation.image.required',
                }),
              },
            ]}
          >
            <Upload.Dragger
              accept="image/*"
              beforeUpload={(file) => {
                const fr = new FileReader()
                fr.onload = () => setImage(fr.result)
                fr.readAsDataURL(file)
                setFileList([file])

                return false
              }}
              onRemove={() => {
                setFileList([])
                setImage(null)
                // form.setFieldsValue({
                //   image: null,
                // })
              }}
              fileList={fileList}
              data-testid="image-field"
            >
              {image ? (
                <StyledImage src={image} />
              ) : (
                <>
                  <Msg className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </Msg>
                  <Msg className="ant-upload-text">
                    <FormattedMessage id="gameForm.image.upload" />
                  </Msg>
                </>
              )}
            </Upload.Dragger>
          </Form.Item>
        </Flex>

        {/* Title */}
        <Flex column>
          <Box>
            <Form.Item
              initialValue={initialValues && initialValues.title}
              name="title"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'validation.title.required',
                  }),
                },
                {
                  min: 6,
                  message: intl.formatMessage(
                    { id: 'validation.title.length' },
                    { number: 6 },
                  ),
                },
              ]}
            >
              <Input
                placeholder={intl.formatMessage({ id: 'common.game.title' })}
                data-testid="title-field"
              />
            </Form.Item>
          </Box>

          {/* Levels */}
          <Box>
            <Msg>
              <FormattedMessage id="gameForm.levels.title" />
            </Msg>

            <Form.Item
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
                  R.map((n) => [n, n]),
                  R.fromPairs,
                )(null)}
              />
            </Form.Item>
          </Box>
        </Flex>

        <Row gutter={10}>
          {/* Date */}
          <Col xs={24} md={8}>
            <Form.Item
              name="date"
              initialValue={initialDate}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'validation.date.required',
                  }),
                },
              ]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          {/* Time */}
          <Col xs={24} md={8}>
            <Form.Item
              name="time"
              initialValue={initialDate}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'validation.time.required',
                  }),
                },
              ]}
            >
              <TimePicker
                format="HH:mm"
                minuteStep={10}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>

          {/* Players */}
          <Col xs={24} md={8}>
            <Form.Item
              name="players"
              initialValue={initialValues && initialValues.players}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'validation.players.required',
                  }),
                },
              ]}
            >
              <Select
                placeholder={intl.formatMessage({
                  id: 'gameForm.players.title',
                })}
                data-testid="select-players"
              >
                {playersInGame.map((p) => (
                  <Select.Option
                    key={p}
                    value={p}
                    data-testid={`select-option-players-${p}`}
                  >
                    {p}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Description */}
        <Form.Item
          name="description"
          initialValue={initialValues && initialValues.description}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'validation.description.required',
              }),
            },
          ]}
        >
          <Input.TextArea
            rows={6}
            placeholder={intl.formatMessage({
              id: 'gameForm.description.title',
            })}
            data-testid="description-field"
          />
        </Form.Item>

        <Row>
          <Col span={12}>
            <Form.Item
              name="share"
              valuePropName="checked"
              initialValue={false}
            >
              <Checkbox disabled={!showSharing}>
                <FormattedMessage id="gameForm.share" />
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            {tags.map((tag, idx) => (
              <Tag
                key={tag}
                closable
                onClose={(e) => {
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
                onChange={(e) => setNewTag(e.target.value)}
                onBlur={handleNewTagConfirm}
                onPressEnter={handleNewTagConfirm}
              />
            )}

            {!showTagInput && (
              <Tag
                style={{ background: '#fff', borderStyle: 'dashed' }}
                onClick={handleNewTagClick}
              >
                <PlusOutlined /> <FormattedMessage id="gameForm.newTag" />
              </Tag>
            )}
          </Col>
        </Row>

        <Box mt={15}>
          <Button htmlType="submit" data-testid="submit-btn">
            <FormattedMessage id="common.submit" />
          </Button>
        </Box>
      </Box>
    </Form>
  )
}

export default GameForm

const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 300px;
`
